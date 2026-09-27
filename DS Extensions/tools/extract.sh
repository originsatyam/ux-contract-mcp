#!/usr/bin/env bash
# extract.sh — re-runnable extraction for the design-system rules corpus.
#
# Why this exists: every rule in this folder should be reproducible without an AI in the
# loop. Run it, diff the output, and you can tell whether a guideline changed underneath you.
#
# WHAT THIS SCRIPT CAN REACH DIRECTLY (plain HTTP):
#   hig      Apple Human Interface Guidelines
#   wcag     W3C WCAG 2.2 Understanding documents
#   figma    Figma file structure, via REST (requires FIGMA_TOKEN in the environment)
#
# WHAT IT CANNOT REACH (documented in REFERENCE below, needs the Firecrawl connector):
#   m3       m3.material.io  — JavaScript-only; plain HTTP returns "This website requires JavaScript"
#   uber     base.uber.com   — CMS-delivered; plain HTTP returns an empty shell
#   Those are extracted by asking the connector to scrape the URL with a query prompt.
#   The exact URLs and prompts used are recorded in REFERENCE so the work is repeatable.
#
# Credentials: FIGMA_TOKEN is read from the environment ONLY and is never written to disk.
#   FIGMA_TOKEN=xxx ./extract.sh figma
#
# Usage:
#   ./extract.sh hig              # all HIG pages in the list
#   ./extract.sh hig alerts buttons
#   ./extract.sh wcag             # all WCAG criteria in the list
#   ./extract.sh wcag contrast-minimum
#   ./extract.sh figma            # page + section map for the three corpus files
#   ./extract.sh all              # hig + wcag + (figma if token present)
#
# Output goes to stdout. Redirect to keep it:
#   ./extract.sh all > ../extracts-$(date +%F).txt

set -uo pipefail

need() { command -v "$1" >/dev/null 2>&1 || { echo "missing dependency: $1" >&2; exit 2; }; }
need curl
need node

# ---------------------------------------------------------------- reference (not runnable)

REFERENCE() {
cat <<'EOF'
FIRE(CRAWL)-ONLY SOURCES — exact URL + prompt used, for repeatability
============================================================================
Material 3            scrape  formats:["query"]  onlyMainContent:true
  https://m3.material.io/components/dialogs/guidelines
     prompt: Quote the rules for when to use a basic dialog vs a full-screen dialog,
             how many actions a dialog may have, and accessibility requirements.
  https://m3.material.io/foundations/layout/breakpoints
     prompt: For every breakpoint tier quote the exact dp range.
  https://m3.material.io/foundations/layout/breakpoints/expanded
     prompt: Quote the margin and gutter for this tier.
  https://m3.material.io/foundations/layout/grids-spacing
  https://m3.material.io/foundations/interaction/states
     prompt: Quote the interaction states and the state layer opacity for each.
  https://m3.material.io/styles/spacing/tokens
     prompt: Quote the spacing scale token names.
  https://m3.material.io/components/fab-menu/accessibility
     prompt: Quote the target size, focus order, keyboard and labelling rules.

Uber Base             scrape  formats:["query"]  onlyMainContent:true
  https://base.uber.com/6d2425e9f/p/598458-dimensions
     prompt: Quote the spacing scale, baseline grid and density guidance.
  https://base.uber.com/6d2425e9f/v/0/p/77fcaf-timing
     prompt: Quote durations in ms and easing cubic-bezier curves.

  FAILED / UNVERIFIED — do not assume coverage:
  https://base.uber.com/6d2425e9f/p/116184-motion      (no usable content returned)
  https://base.uber.com/6d2425e9f/p/033e0d-sheet       (no usable content returned)

Figma structure       REST, read-only
  GET https://api.figma.com/v1/files/<KEY>?depth=1                 -> pages + role
  GET https://api.figma.com/v1/files/<KEY>/nodes?ids=<ID>&depth=N   -> node tree
  Corpus keys:
    sGwh6gbtPpTkHilbJ3YR1w  iOS 18 and iPadOS 18 (Community)
    i882phg1RSXuXMHnQ0bZrq  Material 3 Design Kit (Community)
    BmT0dBndlDWQljvd43irn3  Base Gallery (Community)
  NOTE: all three report role:"owner" — they are copies in the user's account, not
  upstream originals. See provenance-ledger.md.

KNOWN MISSES — recorded so they are not silently re-assumed
  developer.apple.com/.../human-interface-guidelines/navigation-bars  -> HTTP 404
  m3.material.io via plain HTTP or Wayback                            -> SPA shell only
EOF
}

# ---------------------------------------------------------------- Apple HIG

HIG_PAGES=(
  alerts action-sheets sheets popovers buttons text-fields
  lists-and-tables tab-bars segmented-controls toolbars
)

hig_page() {
  local page="$1"
  local url="https://developer.apple.com/tutorials/data/design/human-interface-guidelines/${page}.json"
  local code
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 25 "$url")
  if [ "$code" != "200" ]; then
    echo "#### $page  -> HTTP $code  (NOT EXTRACTED)"
    echo
    return
  fi
  echo "#### $page  -> HTTP 200"
  curl -s --max-time 30 "$url" | node -e '
    let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{
      try{
        const j=JSON.parse(s);const out=[];const seen=new Set();
        const add=t=>{const k=String(t).replace(/\s+/g," ").trim();
          if(k.length<28||seen.has(k))return;seen.add(k);out.push(k);};
        (function w(o,d){ if(d>14||!o)return;
          if(Array.isArray(o))return o.forEach(x=>w(x,d+1));
          if(typeof o==="object"){
            if(typeof o.text==="string")add(o.text);
            if(typeof o.title==="string")add("§ "+o.title);
            Object.values(o).forEach(x=>w(x,d+1));
          }})(j,0);
        console.log(out.map(x=>"  - "+(x.length>220?x.slice(0,220)+"…":x)).join("\n"));
        console.log("  ("+out.length+" guidance strings)");
      }catch(e){console.log("  PARSE FAIL: "+e.message)}
    });'
  echo
}

# ---------------------------------------------------------------- WCAG 2.2

WCAG_CRITERIA=(
  contrast-minimum non-text-contrast text-spacing focus-not-obscured-minimum
  target-size-minimum info-and-relationships identify-input-purpose
  focus-visible error-identification labels-or-instructions error-suggestion
)

wcag_page() {
  local sc="$1"
  local url="https://www.w3.org/WAI/WCAG22/Understanding/${sc}.html"
  echo "#### $sc"
  curl -s --max-time 25 "$url" \
  | node -e '
    let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{
      const t=s.replace(/<script[\s\S]*?<\/script>/gi," ")
               .replace(/<style[\s\S]*?<\/style>/gi," ")
               .replace(/<[^>]+>/g," ")
               .replace(/&#39;|&rsquo;|&#x27;/g,"\x27")
               .replace(/&quot;/g,"\"")
               .replace(/&amp;/g,"&")
               .replace(/&nbsp;/g," ")
               .replace(/\s+/g," ").trim();
      const i=t.indexOf("Success Criterion (SC)");
      const body=i>=0?t.slice(i,i+900):t.slice(0,900);
      console.log("  "+body);
    });'
  echo
}

# ---------------------------------------------------------------- Figma structure

FIGMA_FILES=(
  "sGwh6gbtPpTkHilbJ3YR1w:iOS 18 and iPadOS 18"
  "i882phg1RSXuXMHnQ0bZrq:Material 3 Design Kit"
  "BmT0dBndlDWQljvd43irn3:Base Gallery"
)

figma_map() {
  if [ -z "${FIGMA_TOKEN:-}" ]; then
    echo "FIGMA_TOKEN not set — skipping Figma extraction."
    echo "Run as: FIGMA_TOKEN=xxxxx ./extract.sh figma"
    return
  fi
  for entry in "${FIGMA_FILES[@]}"; do
    key="${entry%%:*}"; label="${entry#*:}"
    echo "#### $label  ($key)"
    curl -s --max-time 45 -H "X-Figma-Token: $FIGMA_TOKEN" \
      "https://api.figma.com/v1/files/${key}?depth=1" \
    | node -e '
      let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{
        try{const j=JSON.parse(s);
          if(j.err){console.log("  ERR: "+j.err);return;}
          console.log("  role        : "+j.role);
          console.log("  lastModified: "+j.lastModified);
          console.log("  pages ("+((j.document.children||[]).length)+"):");
          (j.document.children||[]).forEach(p=>console.log("    "+p.id+"  "+p.name));
        }catch(e){console.log("  PARSE FAIL: "+e.message)}});'
    echo
  done
}

# ---------------------------------------------------------------- dispatch

usage() { sed -n '2,32p' "$0"; }

case "${1:-}" in
  hig)   shift; pages=("$@"); [ ${#pages[@]} -eq 0 ] && pages=("${HIG_PAGES[@]}")
         for p in "${pages[@]}"; do hig_page "$p"; done ;;
  wcag)  shift; scs=("$@"); [ ${#scs[@]} -eq 0 ] && scs=("${WCAG_CRITERIA[@]}")
         for c in "${scs[@]}"; do wcag_page "$c"; done ;;
  figma) figma_map ;;
  ref)   REFERENCE ;;
  all)   echo "=== APPLE HIG ===";  for p in "${HIG_PAGES[@]}"; do hig_page "$p"; done
         echo "=== WCAG 2.2 ===";   for c in "${WCAG_CRITERIA[@]}"; do wcag_page "$c"; done
         echo "=== FIGMA ===";      figma_map
         echo "=== FIRE(CRAWL)-ONLY SOURCES ==="; REFERENCE ;;
  *)     usage ;;
esac
