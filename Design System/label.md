You are building label components for form inputs.

Use [text](design-tokens.md) for all spacing, colors, and typography values.

## Label Specifications

### Base Specifications
- Font size: 14px
- Font weight: 500 (medium)
- Line height: 1.5
- Text color: neutral-700 (#374151)
- Display: block
- Margin bottom: 8px (gap to associated input)

### Required Indicator
- Content: asterisk symbol (*)
- Position: immediately after label text (no space before)
- Color: red-600 (#DC2626)
- Font size: 14px (matches label)
- Font weight: 500 (matches label)
- Spacing after asterisk: 0px (tight to label text)

### Optional Indicator (alternative to required)
- Content: "(optional)" text
- Position: after label text
- Color: neutral-600 (#4B5563)
- Font size: 12px (smaller than label)
- Font weight: 400 (regular, lighter than label)
- Spacing before: 4px

### Tooltip Icon (for additional context)
- Position: immediately after label text or required/optional indicator
- Icon: question mark circle or info icon
- Size: 14px × 14px
- Color: neutral-400 (default), neutral-600 (hover)
- Spacing before: 4px
- Cursor: pointer
- Tooltip appears on hover/click with explanation text

### Character Counter (for inputs with maxlength)
- Position: right-aligned on same line as label
- Font size: 12px
- Color: neutral-600 (default), red-600 (over limit)
- Font weight: 400
- Content format: "0 / 100" or "125 / 500 characters"
- Updates in real-time as user types

### HTML Structure

**Basic label:**
```html
<label for="input-id">Label text</label>