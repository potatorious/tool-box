const state = {
  applyMode: "up",
};

const $ = (id) => document.getElementById(id);

const elements = {
  part: {
    total: $("part-total"),
    percent: $("part-percent"),
    result: $("part-result"),
    formula: $("part-formula"),
    detail: $("part-detail"),
  },
  reverse: {
    part: $("reverse-part"),
    partSubject: $("reverse-part-subject"),
    percent: $("reverse-percent"),
    result: $("reverse-result"),
    formula: $("reverse-formula"),
    detail: $("reverse-detail"),
  },
  ratio: {
    total: $("ratio-total"),
    part: $("ratio-part"),
    partTopic: $("ratio-part-topic"),
    result: $("ratio-result"),
    formula: $("ratio-formula"),
    detail: $("ratio-detail"),
  },
  change: {
    before: $("change-before"),
    beforeSubject: $("change-before-subject"),
    after: $("change-after"),
    afterTo: $("change-after-to"),
    result: $("change-result"),
    formula: $("change-formula"),
    detail: $("change-detail"),
  },
  apply: {
    base: $("apply-base"),
    percent: $("apply-percent"),
    mode: $("apply-mode"),
    result: $("apply-result"),
    formula: $("apply-formula"),
    detail: $("apply-detail"),
  },
  resetAll: $("reset-all"),
};

const calculatorInputs = [
  elements.part.total,
  elements.part.percent,
  elements.reverse.part,
  elements.reverse.percent,
  elements.ratio.total,
  elements.ratio.part,
  elements.change.before,
  elements.change.after,
  elements.apply.base,
  elements.apply.percent,
];

function inputValue(input) {
  return Number(input.value) || 0;
}

function hasInput(input) {
  return input.value.trim() !== "";
}

function formatNumber(value) {
  const absValue = Math.abs(value);

  if (absValue > 0 && absValue < 0.01) {
    return value < 0 ? "> -0.01" : "< 0.01";
  }

  const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
  return rounded.toLocaleString("ko-KR", { maximumFractionDigits: 2 });
}

function decimalPlacesForSignificantDigits(value, digits) {
  if (value === 0) {
    return 0;
  }

  return Math.max(0, digits - Math.floor(Math.log10(Math.abs(value))) - 1);
}

function formatSignificantNumber(value, digits) {
  if (value === 0) {
    return "0";
  }

  const maximumFractionDigits = decimalPlacesForSignificantDigits(value, digits);
  const rounded = Number(value.toPrecision(digits));

  return rounded.toLocaleString("ko-KR", { maximumFractionDigits });
}

function roundTo(value, maximumFractionDigits) {
  const factor = 10 ** maximumFractionDigits;
  return Math.sign(value) * Math.round(Math.abs(value) * factor) / factor;
}

function formatRoundedNumber(value, maximumFractionDigits) {
  const rounded = roundTo(value, maximumFractionDigits);

  if (Object.is(rounded, -0) || rounded === 0) {
    return "0";
  }

  return rounded.toLocaleString("ko-KR", { maximumFractionDigits });
}

function decimalPlacesForNearHundredPercent(value) {
  const absValue = Math.abs(value);
  const fixedValue = absValue.toFixed(12);
  const fraction = fixedValue.split(".")[1]?.replace(/0+$/, "") ?? "";
  const repeatedDigit = absValue < 100 ? "9" : "0";
  let repeatedCount = 0;

  while (fraction[repeatedCount] === repeatedDigit) {
    repeatedCount += 1;
  }

  return Math.max(2, repeatedCount + 3);
}

function formatResultNumber(value) {
  const absValue = Math.abs(value);

  if (absValue === 0) {
    return "0";
  }

  if (absValue < 1) {
    return formatSignificantNumber(value, 3);
  }

  return formatRoundedNumber(value, 2);
}

function formatResultPercent(value) {
  const absValue = Math.abs(value);

  if (absValue === 0) {
    return "0";
  }

  if (absValue < 0.01) {
    return formatSignificantNumber(value, 3);
  }

  if (absValue !== 100 && roundTo(absValue, 2) === 100) {
    return formatRoundedNumber(value, decimalPlacesForNearHundredPercent(value));
  }

  return formatRoundedNumber(value, 2);
}

function lastDigit(value) {
  return String(Math.abs(value)).match(/\d(?=\D*$)/)?.[0] ?? "";
}

function hasFinalConsonant(value) {
  return ["0", "1", "3", "6", "7", "8"].includes(lastDigit(value));
}

function endsWithRieul(value) {
  return ["1", "7", "8"].includes(lastDigit(value));
}

function josa(value, pair) {
  if (pair === "으로/로") {
    return hasFinalConsonant(value) && !endsWithRieul(value) ? "으로" : "로";
  }

  const [withFinal, withoutFinal] = pair.split("/");
  return hasFinalConsonant(value) ? withFinal : withoutFinal;
}

function token(value) {
  return `<span class="value-token">${formatNumber(value)}</span>`;
}

function resultToken(value) {
  return `<span class="value-token">${formatResultNumber(value)}</span>`;
}

function formulaInput(value) {
  return `<strong>${formatResultNumber(value)}</strong>`;
}

function formulaPercent(value) {
  return `<strong>${formatResultPercent(value)}</strong>`;
}

function tokenJosa(value, pair) {
  return `${token(value)}${josa(value, pair)}`;
}

function resultTokenJosa(value, pair) {
  return `${resultToken(value)}${josa(value, pair)}`;
}

function changeToken(kind, text) {
  return `<span class="percent-${kind}">${text}</span>`;
}

function waitingFormula(formula) {
  return formula.replace(
    /증감 후 값|전체 값|일부 값|기준 값|변경 값|증감률|비율/g,
    (label) => `<strong>${label}</strong>`
  );
}

function setWaiting(view, formula, resultLabel, detail) {
  clearChangeClass(view.result);
  clearCopyValue(view.result);
  view.result.textContent = resultLabel;
  view.formula.innerHTML = waitingFormula(formula);
  view.detail.innerHTML = `<p>${detail}</p>`;
}

function setCannotDivideByZero(view, formula) {
  clearChangeClass(view.result);
  clearCopyValue(view.result);
  view.result.textContent = "계산 불가";
  view.formula.innerHTML = `${formula} = <strong>계산 불가</strong>`;
  view.detail.innerHTML = "<p>0 으로 나누는 계산은 할 수 없습니다.</p>";
}

function setChangeClass(element, kind) {
  element.classList.remove("percent-up", "percent-down", "percent-flat");
  element.classList.add(`percent-${kind}`);
}

function clearChangeClass(element) {
  element.classList.remove("percent-up", "percent-down", "percent-flat");
}

function setCopyValue(result, value) {
  const button = document.querySelector(`[data-copy-target="${result.id}"]`);

  if (button) {
    button.dataset.copyValue = value;
    resetCopyButton(button);
  }
}

function clearCopyValue(result) {
  const button = document.querySelector(`[data-copy-target="${result.id}"]`);

  if (button) {
    delete button.dataset.copyValue;
    resetCopyButton(button);
  }
}

function resetCopyButton(button) {
  button.textContent = "복사";
}

function isCopyableResult(text) {
  const normalized = text.trim();
  const waitingLabels = ["일부 값", "전체 값", "비율", "증감률", "증감 후 값"];

  if (normalized === "" || normalized === "-" || normalized === "계산 불가") {
    return false;
  }

  if (waitingLabels.includes(normalized) || normalized.includes("0% 변화 없음")) {
    return false;
  }

  const numericText = normalized.replace(/[,%]/g, "").trim();
  return !/^[-+]?0(?:\.0+)?$/.test(numericText);
}

function updateCopyButtons() {
  document.querySelectorAll(".copy-result").forEach((button) => {
    const target = $(button.dataset.copyTarget);
    const isVisible = isCopyableResult(target.textContent);

    button.hidden = !isVisible;
    if (!isVisible) {
      resetCopyButton(button);
    }
  });
}

async function copyResult(button) {
  const target = $(button.dataset.copyTarget);
  const text = target.textContent.trim();
  const copyValue = button.dataset.copyValue || text;

  if (!isCopyableResult(text)) {
    return;
  }

  try {
    await navigator.clipboard.writeText(copyValue);
    button.textContent = "복사됨";
    window.setTimeout(() => resetCopyButton(button), 1000);
  } catch {
    button.textContent = "실패";
    window.setTimeout(() => resetCopyButton(button), 1000);
  }
}

function renderPartOfTotal() {
  const view = elements.part;

  if (!hasInput(view.total) || !hasInput(view.percent)) {
    setWaiting(
      view,
      "전체 값 ÷ 100 × 비율 = 일부 값",
      "일부 값",
      "전체 값과 비율로 일부 값을 구합니다."
    );
    return;
  }

  const total = inputValue(view.total);
  const percent = inputValue(view.percent);
  const onePercent = total / 100;
  const result = onePercent * percent;

  view.result.textContent = formatResultNumber(result);
  setCopyValue(view.result, formatResultNumber(result));
  view.formula.innerHTML = `${formulaInput(total)} ÷ 100 × ${formulaInput(percent)} = ${formulaInput(result)}`;
  view.detail.innerHTML = `
    <p>입력한 전체 값은 ${token(total)}입니다.<br>입력한 비율은 ${token(percent)}%입니다.</p>
    <p>1. 전체 값 ${token(total)}을 100으로 나눕니다.<br>${token(total)} ÷ 100 = ${resultToken(onePercent)}</p>
    <p>2. 이것은 1%가 ${resultToken(onePercent)}이라는 뜻입니다.</p>
    <p>3. 비율 ${token(percent)}%를 구하기 위해 ${resultToken(onePercent)}에 ${token(percent)}을 곱합니다.<br>${resultToken(onePercent)} × ${token(percent)} = ${resultToken(result)}</p>
    <p>따라서 ${token(total)} 의 ${token(percent)}% 는 ${resultToken(result)}</p>
  `;
}

function renderReverseTotal() {
  const view = elements.reverse;

  if (!hasInput(view.part) || !hasInput(view.percent)) {
    setWaiting(
      view,
      "일부 값 ÷ 비율 × 100 = 전체 값",
      "전체 값",
      "일부 값과 비율로 전체 값을 구합니다."
    );
    view.partSubject.textContent = "이";
    return;
  }

  const part = inputValue(view.part);
  const percent = inputValue(view.percent);

  if (percent === 0) {
    view.partSubject.textContent = josa(part, "이/가");
    setCannotDivideByZero(view, `${formulaInput(part)} ÷ ${formulaInput(percent)} × 100`);
    return;
  }

  const onePercent = part / percent;
  const result = onePercent * 100;

  view.partSubject.textContent = josa(part, "이/가");
  view.result.textContent = formatResultNumber(result);
  setCopyValue(view.result, formatResultNumber(result));
  view.formula.innerHTML = `${formulaInput(part)} ÷ ${formulaInput(percent)} × 100 = ${formulaInput(result)}`;
  view.detail.innerHTML = `
    <p>입력한 일부 값은 ${token(part)}입니다.<br>입력한 비율은 ${token(percent)}%입니다.</p>
    <p>1. 일부 값 ${tokenJosa(part, "을/를")} 비율 ${tokenJosa(percent, "으로/로")} 나눕니다.<br>${token(part)} ÷ ${token(percent)} = ${resultToken(onePercent)}</p>
    <p>2. 이것은 1%가 ${resultToken(onePercent)}이라는 뜻입니다.</p>
    <p>3. 전체 값은 100%이므로 ${resultToken(onePercent)}에 100을 곱합니다.<br>${resultToken(onePercent)} × 100 = ${resultToken(result)}</p>
    <p>따라서 ${tokenJosa(part, "이/가")} ${token(percent)}% 라면 전체는 ${resultToken(result)}</p>
  `;
}

function renderRatio() {
  const view = elements.ratio;

  if (!hasInput(view.total) || !hasInput(view.part)) {
    setWaiting(
      view,
      "일부 값 ÷ 전체 값 × 100 = 비율",
      "비율",
      "전체 값과 일부 값으로 비율을 구합니다."
    );
    view.partTopic.textContent = "은";
    return;
  }

  const total = inputValue(view.total);
  const part = inputValue(view.part);

  if (total === 0) {
    view.partTopic.textContent = josa(part, "은/는");
    setCannotDivideByZero(view, `${formulaInput(part)} ÷ ${formulaInput(total)} × 100`);
    return;
  }

  const ratio = part / total;
  const result = ratio * 100;

  view.partTopic.textContent = josa(part, "은/는");
  view.result.textContent = `${formatResultPercent(result)}%`;
  setCopyValue(view.result, `${formatResultPercent(result)}%`);
  view.formula.innerHTML = `${formulaInput(part)} ÷ ${formulaInput(total)} × 100 = ${formulaPercent(result)}%`;
  view.detail.innerHTML = `
    <p>입력한 전체 값은 ${token(total)}입니다.<br>입력한 일부 값은 ${token(part)}입니다.</p>
    <p>1. 일부 값 ${tokenJosa(part, "을/를")} 전체 값 ${tokenJosa(total, "으로/로")} 나눕니다.<br>${token(part)} ÷ ${token(total)} = ${resultToken(ratio)}</p>
    <p>2. 이것은 일부 값이 전체 값의 ${resultToken(ratio)}배라는 뜻입니다.</p>
    <p>3. 퍼센트로 바꾸기 위해 ${resultToken(ratio)}에 100을 곱합니다.<br>${resultToken(ratio)} × 100 = ${formulaPercent(result)}%</p>
    <p>따라서 ${token(total)} 중 ${tokenJosa(part, "은/는")} ${formulaPercent(result)}%</p>
  `;
}

function renderChangeRate() {
  const view = elements.change;

  if (!hasInput(view.before) || !hasInput(view.after)) {
    setWaiting(
      view,
      "(변경 값 - 기준 값) ÷ 기준 값 × 100 = 증감률",
      "증감률",
      "기준 값과 변경 값으로 증감률을 구합니다."
    );
    view.beforeSubject.textContent = "이";
    view.afterTo.textContent = "으로";
    return;
  }

  const before = inputValue(view.before);
  const after = inputValue(view.after);
  const difference = after - before;

  if (before === 0) {
    view.beforeSubject.textContent = josa(before, "이/가");
    view.afterTo.textContent = josa(after, "으로/로");

    if (difference === 0) {
      clearCopyValue(view.result);
      view.result.textContent = "0%";
      setChangeClass(view.result, "flat");
      view.formula.innerHTML = `${formulaInput(after)} - ${formulaInput(before)} = ${formulaInput(0)}`;
      view.detail.innerHTML = `
        <p>입력한 기준 값은 ${token(before)}입니다.<br>입력한 변경 값은 ${token(after)}입니다.</p>
        <p>1. 변경 값 ${token(after)}에서 기준 값 ${tokenJosa(before, "을/를")} 뺍니다.<br>${token(after)} - ${token(before)} = 0</p>
        <p>2. 차이가 0이므로 값이 변하지 않았습니다.</p>
        <p>따라서 ${tokenJosa(before, "이/가")} ${tokenJosa(after, "으로/로")} 바뀌면 0% 변화 없음</p>
      `;
      return;
    }

    setCannotDivideByZero(view, `(${formulaInput(after)} - ${formulaInput(before)}) ÷ ${formulaInput(before)} × 100`);
    return;
  }

  const absDifference = Math.abs(difference);
  const changeRatio = absDifference / before;
  const signedRate = difference / before * 100;
  const absRate = Math.abs(signedRate);
  const kind = difference > 0 ? "up" : difference < 0 ? "down" : "flat";
  const label = difference === 0 ? "0%" : `${formatResultPercent(signedRate)}%`;

  view.beforeSubject.textContent = josa(before, "이/가");
  view.afterTo.textContent = josa(after, "으로/로");
  view.result.textContent = label;
  setCopyValue(view.result, `${formatResultPercent(signedRate)}%`);
  setChangeClass(view.result, kind);
  view.formula.innerHTML = `(${formulaInput(after)} - ${formulaInput(before)}) ÷ ${formulaInput(before)} × 100 = ${formulaPercent(signedRate)}%`;

  if (kind === "flat") {
    view.detail.innerHTML = `
      <p>입력한 기준 값은 ${token(before)}입니다.<br>입력한 변경 값은 ${token(after)}입니다.</p>
      <p>1. 변경 값 ${token(after)}에서 기준 값 ${tokenJosa(before, "을/를")} 뺍니다.<br>${token(after)} - ${token(before)} = 0</p>
      <p>2. 차이가 0이므로 값이 변하지 않았습니다.</p>
      <p>따라서 ${tokenJosa(before, "이/가")} ${tokenJosa(after, "으로/로")} 바뀌면 0% 변화 없음</p>
    `;
    return;
  }

  const verb = kind === "up" ? "늘어난" : "줄어든";
  const finalText = kind === "up" ? "증가" : "감소";
  const finalTextToken = changeToken(kind, finalText);
  const finalLabel = changeToken(kind, `${formatResultPercent(signedRate)}%`);

  view.detail.innerHTML = `
    <p>입력한 기준 값은 ${token(before)}입니다.<br>입력한 변경 값은 ${token(after)}입니다.</p>
    <p>1. 변경 값 ${token(after)}에서 기준 값 ${tokenJosa(before, "을/를")} 뺍니다.<br>${token(after)} - ${token(before)} = ${token(difference)}</p>
    <p>2. 이것은 기준 값보다 ${resultToken(absDifference)}만큼 ${finalTextToken}했다는 뜻입니다.</p>
    <p>3. ${verb} 값 ${resultTokenJosa(absDifference, "을/를")} 기준 값 ${tokenJosa(before, "으로/로")} 나눕니다.<br>${resultToken(absDifference)} ÷ ${token(before)} = ${resultToken(changeRatio)}</p>
    <p>4. 퍼센트로 바꾸기 위해 ${resultToken(changeRatio)}에 100을 곱합니다.<br>${resultToken(changeRatio)} × 100 = ${formulaPercent(absRate)}%</p>
    <p>따라서 ${tokenJosa(before, "이/가")} ${tokenJosa(after, "으로/로")} 바뀌면 ${finalLabel}</p>
  `;
}

function renderApplyPercent() {
  const view = elements.apply;

  if (!hasInput(view.base) || !hasInput(view.percent)) {
    setWaiting(
      view,
      "기준 값 + (기준 값 ÷ 100 × 비율) = 증감 후 값",
      "증감 후 값",
      "기준 값과 비율로 증감 후 값을 구합니다."
    );
    view.mode.textContent = state.applyMode === "up" ? "▲ 증가" : "▼ 감소";
    setChangeClass(view.mode, state.applyMode === "up" ? "up" : "down");
    return;
  }

  const base = inputValue(view.base);
  const percent = inputValue(view.percent);
  const amount = base / 100 * percent;
  const isUp = state.applyMode === "up";
  const result = isUp ? base + amount : base - amount;
  const symbol = isUp ? "+" : "-";
  const label = isUp ? "▲ 증가" : "▼ 감소";
  const labelToken = changeToken(isUp ? "up" : "down", label);
  const word = isUp ? "증가" : "감소";

  view.mode.textContent = label;
  setChangeClass(view.mode, isUp ? "up" : "down");
  view.result.textContent = formatResultNumber(result);
  setCopyValue(view.result, formatResultNumber(result));
  view.formula.innerHTML = `${formulaInput(base)} ${symbol} (${formulaInput(base)} ÷ 100 × ${formulaInput(percent)}) = ${formulaInput(result)}`;
  view.detail.innerHTML = `
    <p>입력한 기준 값은 ${token(base)}입니다.<br>입력한 비율은 ${token(percent)}%입니다.<br>선택한 방식은 ${labelToken}입니다.</p>
    <p>1. 기준 값 ${tokenJosa(base, "을/를")} 100으로 나눕니다.<br>${token(base)} ÷ 100 = ${resultToken(base / 100)}</p>
    <p>2. 이것은 1%가 ${resultToken(base / 100)}이라는 뜻입니다.</p>
    <p>3. 비율 ${token(percent)}%를 구하기 위해 ${resultToken(base / 100)}에 ${token(percent)}을 곱합니다.<br>${resultToken(base / 100)} × ${token(percent)} = ${resultToken(amount)}</p>
    <p>4. ${word}이므로 기준 값 ${token(base)}${isUp ? "에" : "에서"} ${resultTokenJosa(amount, "을/를")} ${isUp ? "더합니다" : "뺍니다"}.<br>${token(base)} ${symbol} ${resultToken(amount)} = ${resultToken(result)}</p>
    <p>따라서 ${token(base)} 에 ${token(percent)}% 를 ${labelToken}하면 ${resultToken(result)}</p>
  `;
}

const renderers = [
  renderPartOfTotal,
  renderReverseTotal,
  renderRatio,
  renderChangeRate,
  renderApplyPercent,
];

function renderAll() {
  renderers.forEach((render) => render());
  updateCopyButtons();
}

function resetAll() {
  calculatorInputs.forEach((input) => {
    input.value = "";
  });
  state.applyMode = "up";
  renderAll();
}

function bindEvents() {
  calculatorInputs.forEach((input) => {
    input.addEventListener("input", renderAll);
  });

  elements.apply.mode.addEventListener("click", () => {
    state.applyMode = state.applyMode === "up" ? "down" : "up";
    renderApplyPercent();
    updateCopyButtons();
  });

  elements.resetAll.addEventListener("click", resetAll);

  document.querySelectorAll(".copy-result").forEach((button) => {
    button.addEventListener("click", () => copyResult(button));
  });
}

bindEvents();
renderAll();
