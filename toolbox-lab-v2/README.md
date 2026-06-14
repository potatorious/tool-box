# Toolbox Lab V2

Static utility-site prototype built with plain HTML, CSS, and JavaScript.

The focus is practical browser-side tools: quick inputs, immediate results, clear wording, and minimal interface overhead.

## Tools

| Tool | Path | Summary |
| --- | --- | --- |
| Percent calculator | `tools/percent-calculator/` | Calculates percentage value, ratio, change rate, reverse total, and percentage increase/decrease. |
| Character counter | `tools/character-counter/` | Counts characters with and without whitespace, UTF-8 bytes, paragraphs, and lines. |
| Shoe size converter | `tools/shoe-size-converter/` | Converts adult shoe sizes across KR, US, UK, EU, JP, and foot length references. |
| BMI calculator | `tools/bmi-calculator/` | Calculates BMI and shows the result on a category scale. |
| Age calculator | `tools/age-calculator/` | Calculates international age, Korean counted age, year age, exact duration, birthday information, zodiac, birthstone, milestones, age names, and school-year references. |

## Local Preview

From this directory:

```bash
python -m http.server 4174
```

Open:

```text
http://localhost:4174/
```

## File Structure

```text
toolbox-lab-v2/
  index.html
  styles.css
  styles/
    theme.css
    base.css
    components.css
    tools.css
  tools/
    age-calculator/
      index.html
      app.js
    bmi-calculator/
      index.html
      app.js
    character-counter/
      index.html
      app.js
    percent-calculator/
      index.html
      app.js
    shoe-size-converter/
      index.html
      app.js
```

## Design Principles

- Keep each tool usable without sign-in, API keys, or backend services.
- Prefer direct input and immediate output.
- Keep supporting explanations short and close to the result.
- Avoid heavy visual styling until the tool behavior is stable.
- Keep each tool isolated so future tools can be added without changing existing logic.

## Development Notes

- Shared CSS entry point: `styles.css`
- Theme variables: `styles/theme.css`
- Base layout and element styles: `styles/base.css`
- Reusable components: `styles/components.css`
- Tool-specific styles: `styles/tools.css`
- JavaScript is intentionally tool-local; each `app.js` controls only its own page.
