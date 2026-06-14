# Tool Box

A collection of small, browser-based utility tools.

The project is organized as a set of static experiments. Each experiment can be opened locally without a backend, external database, or build step.

## Projects

| Project | Status | Description |
| --- | --- | --- |
| `toolbox-lab-v1` | Archived experiment | Early utility-site prototype with baseline pages and AdSense-readiness structure. |
| `toolbox-lab-v2` | Active | Static multi-tool prototype focused on practical calculators and simple browser-side utilities. |

## Current Tools

`toolbox-lab-v2` currently includes:

- Percent calculator
- Character counter
- Shoe size converter
- BMI calculator
- Age calculator

## Local Preview

Run a static server from the project directory:

```bash
cd toolbox-lab-v2
python -m http.server 4174
```

Then open:

```text
http://localhost:4174/
```

## Technical Notes

- No framework or bundler is required.
- Tools are implemented with plain HTML, CSS, and JavaScript.
- Each tool lives in its own folder under `toolbox-lab-v2/tools/`.
- Shared styles are split under `toolbox-lab-v2/styles/` and imported through `toolbox-lab-v2/styles.css`.

## Repository Structure

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
    bmi-calculator/
    character-counter/
    percent-calculator/
    shoe-size-converter/
```
