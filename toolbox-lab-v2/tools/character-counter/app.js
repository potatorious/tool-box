const $ = (id) => document.getElementById(id);

const elements = {
  textInput: $("text-input"),
  limitType: $("limit-type"),
  limitValue: $("limit-value"),
  clearButton: $("clear-text"),
  copyButton: $("copy-text"),
  copyStatus: $("copy-status"),
  counters: {
    withSpaces: $("count-with-spaces"),
    bytesWithSpaces: $("bytes-with-spaces"),
    withoutSpaces: $("count-without-spaces"),
    bytesWithoutSpaces: $("bytes-without-spaces"),
    lines: $("line-count"),
    paragraphs: $("paragraph-count"),
  },
};

function formatNumber(value) {
  return value.toLocaleString("ko-KR");
}

function countLines(text) {
  return text.length === 0 ? 0 : text.split(/\r\n|\r|\n/).length;
}

function countParagraphs(text) {
  const trimmed = text.trim();
  return trimmed.length === 0 ? 0 : trimmed.split(/\n\s*\n/).filter(Boolean).length;
}

function getTextStats(text) {
  const withoutSpaces = text.replace(/\s/g, "");

  return {
    withSpaces: text.length,
    bytesWithSpaces: new TextEncoder().encode(text).length,
    withoutSpaces: withoutSpaces.length,
    bytesWithoutSpaces: new TextEncoder().encode(withoutSpaces).length,
    lines: countLines(text),
    paragraphs: countParagraphs(text),
  };
}

function getLimitValue() {
  const value = Number(elements.limitValue.value);
  return Number.isInteger(value) && value > 0 ? value : null;
}

function getLimitWeight(char, limitType) {
  const isSpace = /\s/.test(char);

  if ((limitType === "withoutSpaces" || limitType === "bytesWithoutSpaces") && isSpace) {
    return 0;
  }

  if (limitType === "bytesWithSpaces" || limitType === "bytesWithoutSpaces") {
    return new TextEncoder().encode(char).length;
  }

  return char.length;
}

function getLimitedText(text, limitType, limitValue) {
  if (limitType === "none" || !limitValue) {
    return text;
  }

  let result = "";
  let count = 0;

  for (const char of text) {
    const weight = getLimitWeight(char, limitType);

    if (count + weight > limitValue) {
      continue;
    }

    result += char;
    count += weight;
  }

  return result;
}

function enforceLimit() {
  const limitValue = getLimitValue();
  const limitedText = getLimitedText(elements.textInput.value, elements.limitType.value, limitValue);

  if (limitedText !== elements.textInput.value) {
    elements.textInput.value = limitedText;
  }
}

function syncLimitValueState() {
  const isDisabled = elements.limitType.value === "none";
  elements.limitValue.disabled = isDisabled;

  if (isDisabled) {
    elements.limitValue.value = "";
  }
}

function render() {
  const stats = getTextStats(elements.textInput.value);
  const counters = elements.counters;

  counters.withSpaces.textContent = formatNumber(stats.withSpaces);
  counters.bytesWithSpaces.textContent = formatNumber(stats.bytesWithSpaces);
  counters.withoutSpaces.textContent = formatNumber(stats.withoutSpaces);
  counters.bytesWithoutSpaces.textContent = formatNumber(stats.bytesWithoutSpaces);
  counters.lines.textContent = formatNumber(stats.lines);
  counters.paragraphs.textContent = formatNumber(stats.paragraphs);
  elements.copyStatus.textContent = "";
}

async function copyText() {
  const text = elements.textInput.value;

  if (text.length === 0) {
    elements.copyStatus.textContent = "";
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    elements.copyStatus.textContent = "";
  } catch {
    elements.copyStatus.textContent = "복사 권한이 없어 직접 선택해 복사해 주세요.";
  }
}

function clearText() {
  elements.textInput.value = "";
  elements.textInput.focus();
  render();
}

function applyLimitAndRender() {
  syncLimitValueState();
  enforceLimit();
  render();
}

function bindEvents() {
  elements.textInput.addEventListener("input", applyLimitAndRender);
  elements.limitType.addEventListener("change", applyLimitAndRender);
  elements.limitValue.addEventListener("input", applyLimitAndRender);
  elements.limitValue.addEventListener("change", applyLimitAndRender);
  elements.clearButton.addEventListener("click", clearText);
  elements.copyButton.addEventListener("click", copyText);
}

bindEvents();
syncLimitValueState();
render();
