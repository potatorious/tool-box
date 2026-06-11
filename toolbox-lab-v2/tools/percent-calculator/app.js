const INITIAL_VALUES = {
  partTotal: "",
  partPercent: "",
  reversePart: "",
  reversePercent: "",
  ratioTotal: "",
  ratioPart: "",
  changeBefore: "",
  changeAfter: "",
  applyBase: "",
  applyPercent: "",
};

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

function inputValue(input) {
  return Number(input.value) || 0;
}

function hasInput(input) {
  return input.value.trim() !== "";
}

function formatNumber(value) {
  const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
  return rounded.toLocaleString("ko-KR", { maximumFractionDigits: 2 });
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

function tokenJosa(value, pair) {
  return `${token(value)}${josa(value, pair)}`;
}

function setWaiting(view, formula, detail) {
  view.result.textContent = "-";
  view.formula.textContent = formula;
  view.detail.innerHTML = `<p>${detail}</p>`;
}

function setChangeClass(element, kind) {
  element.classList.remove("percent-up", "percent-down", "percent-flat");
  element.classList.add(`percent-${kind}`);
}

function renderPartOfTotal() {
  const view = elements.part;

  if (!hasInput(view.total) || !hasInput(view.percent)) {
    setWaiting(
      view,
      "전체 값 ÷ 100 × 비율 = 결과",
      "전체 값과 비율로 일부 값을 구합니다."
    );
    return;
  }

  const total = inputValue(view.total);
  const percent = inputValue(view.percent);
  const onePercent = total / 100;
  const result = onePercent * percent;

  view.result.textContent = formatNumber(result);
  view.formula.textContent = `${formatNumber(total)} ÷ 100 × ${formatNumber(percent)} = ${formatNumber(result)}`;
  view.detail.innerHTML = `
    <p>입력한 전체 값은 ${token(total)}입니다.<br>입력한 비율은 ${token(percent)}%입니다.</p>
    <p>1. 전체 값 ${token(total)}을 100으로 나눕니다.<br>${token(total)} ÷ 100 = ${token(onePercent)}</p>
    <p>2. 이것은 1%가 ${token(onePercent)}이라는 뜻입니다.</p>
    <p>3. 비율 ${token(percent)}%를 구하기 위해 ${token(onePercent)}에 ${token(percent)}을 곱합니다.<br>${token(onePercent)} × ${token(percent)} = ${token(result)}</p>
    <p>따라서 ${token(total)} 의 ${token(percent)}% 는 ${token(result)}</p>
  `;
}

function renderReverseTotal() {
  const view = elements.reverse;

  if (!hasInput(view.part) || !hasInput(view.percent)) {
    setWaiting(
      view,
      "일부 값 ÷ 비율 × 100 = 전체 값",
      "일부 값과 비율로 전체 값을 구합니다."
    );
    view.partSubject.textContent = "이";
    return;
  }

  const part = inputValue(view.part);
  const percent = inputValue(view.percent);
  const onePercent = percent === 0 ? 0 : part / percent;
  const result = onePercent * 100;

  view.partSubject.textContent = josa(part, "이/가");
  view.result.textContent = formatNumber(result);
  view.formula.textContent = `${formatNumber(part)} ÷ ${formatNumber(percent)} × 100 = ${formatNumber(result)}`;
  view.detail.innerHTML = `
    <p>입력한 일부 값은 ${token(part)}입니다.<br>입력한 비율은 ${token(percent)}%입니다.</p>
    <p>1. 일부 값 ${tokenJosa(part, "을/를")} 비율 ${tokenJosa(percent, "으로/로")} 나눕니다.<br>${token(part)} ÷ ${token(percent)} = ${token(onePercent)}</p>
    <p>2. 이것은 1%가 ${token(onePercent)}이라는 뜻입니다.</p>
    <p>3. 전체 값은 100%이므로 ${token(onePercent)}에 100을 곱합니다.<br>${token(onePercent)} × 100 = ${token(result)}</p>
    <p>따라서 ${tokenJosa(part, "이/가")} ${token(percent)}% 라면 전체는 ${token(result)}</p>
  `;
}

function renderRatio() {
  const view = elements.ratio;

  if (!hasInput(view.total) || !hasInput(view.part)) {
    setWaiting(
      view,
      "일부 값 ÷ 전체 값 × 100 = 비율",
      "전체 값과 일부 값으로 비율을 구합니다."
    );
    view.partTopic.textContent = "은";
    return;
  }

  const total = inputValue(view.total);
  const part = inputValue(view.part);
  const ratio = total === 0 ? 0 : part / total;
  const result = ratio * 100;

  view.partTopic.textContent = josa(part, "은/는");
  view.result.textContent = `${formatNumber(result)}%`;
  view.formula.textContent = `${formatNumber(part)} ÷ ${formatNumber(total)} × 100 = ${formatNumber(result)}`;
  view.detail.innerHTML = `
    <p>입력한 전체 값은 ${token(total)}입니다.<br>입력한 일부 값은 ${token(part)}입니다.</p>
    <p>1. 일부 값 ${tokenJosa(part, "을/를")} 전체 값 ${tokenJosa(total, "으로/로")} 나눕니다.<br>${token(part)} ÷ ${token(total)} = ${token(ratio)}</p>
    <p>2. 이것은 일부 값이 전체 값의 ${token(ratio)}배라는 뜻입니다.</p>
    <p>3. 퍼센트로 바꾸기 위해 ${token(ratio)}에 100을 곱합니다.<br>${token(ratio)} × 100 = ${token(result)}</p>
    <p>따라서 ${token(total)} 중 ${tokenJosa(part, "은/는")} ${token(result)}%</p>
  `;
}

function renderChangeRate() {
  const view = elements.change;

  if (!hasInput(view.before) || !hasInput(view.after)) {
    setWaiting(
      view,
      "(변경 값 - 기준 값) ÷ 기준 값 × 100 = 증감률",
      "기준 값과 변경 값으로 증감률을 구합니다."
    );
    view.beforeSubject.textContent = "이";
    view.afterTo.textContent = "으로";
    setChangeClass(view.result, "flat");
    return;
  }

  const before = inputValue(view.before);
  const after = inputValue(view.after);
  const difference = after - before;
  const absDifference = Math.abs(difference);
  const changeRatio = before === 0 ? 0 : absDifference / before;
  const signedRate = before === 0 ? 0 : difference / before * 100;
  const absRate = Math.abs(signedRate);
  const kind = difference > 0 ? "up" : difference < 0 ? "down" : "flat";
  const label = difference > 0
    ? `▲ ${formatNumber(absRate)}% 증가`
    : difference < 0
      ? `▼ ${formatNumber(absRate)}% 감소`
      : "0% 변화 없음";

  view.beforeSubject.textContent = josa(before, "이/가");
  view.afterTo.textContent = josa(after, "으로/로");
  view.result.textContent = label;
  setChangeClass(view.result, kind);
  view.formula.textContent = `(${formatNumber(after)} - ${formatNumber(before)}) ÷ ${formatNumber(before)} × 100 = ${formatNumber(signedRate)}`;

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

  view.detail.innerHTML = `
    <p>입력한 기준 값은 ${token(before)}입니다.<br>입력한 변경 값은 ${token(after)}입니다.</p>
    <p>1. 변경 값 ${token(after)}에서 기준 값 ${tokenJosa(before, "을/를")} 뺍니다.<br>${token(after)} - ${token(before)} = ${token(difference)}</p>
    <p>2. 이것은 기준 값보다 ${token(absDifference)}만큼 ${finalText}했다는 뜻입니다.</p>
    <p>3. ${verb} 값 ${tokenJosa(absDifference, "을/를")} 기준 값 ${tokenJosa(before, "으로/로")} 나눕니다.<br>${token(absDifference)} ÷ ${token(before)} = ${token(changeRatio)}</p>
    <p>4. 퍼센트로 바꾸기 위해 ${token(changeRatio)}에 100을 곱합니다.<br>${token(changeRatio)} × 100 = ${token(absRate)}</p>
    <p>따라서 ${tokenJosa(before, "이/가")} ${tokenJosa(after, "으로/로")} 바뀌면 ${kind === "up" ? "▲" : "▼"} ${token(absRate)}% ${finalText}</p>
  `;
}

function renderApplyPercent() {
  const view = elements.apply;

  if (!hasInput(view.base) || !hasInput(view.percent)) {
    setWaiting(
      view,
      "기준 값 + (기준 값 ÷ 100 × 비율) = 결과",
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
  const word = isUp ? "증가" : "감소";

  view.mode.textContent = label;
  setChangeClass(view.mode, isUp ? "up" : "down");
  view.result.textContent = formatNumber(result);
  view.formula.textContent = `${formatNumber(base)} ${symbol} (${formatNumber(base)} ÷ 100 × ${formatNumber(percent)}) = ${formatNumber(result)}`;
  view.detail.innerHTML = `
    <p>입력한 기준 값은 ${token(base)}입니다.<br>입력한 비율은 ${token(percent)}%입니다.<br>선택한 방식은 ${label}입니다.</p>
    <p>1. 기준 값 ${tokenJosa(base, "을/를")} 100으로 나눕니다.<br>${token(base)} ÷ 100 = ${token(base / 100)}</p>
    <p>2. 이것은 1%가 ${token(base / 100)}이라는 뜻입니다.</p>
    <p>3. 비율 ${token(percent)}%를 구하기 위해 ${token(base / 100)}에 ${token(percent)}을 곱합니다.<br>${token(base / 100)} × ${token(percent)} = ${token(amount)}</p>
    <p>4. ${word}이므로 기준 값 ${token(base)}${isUp ? "에" : "에서"} ${tokenJosa(amount, "을/를")} ${isUp ? "더합니다" : "뺍니다"}.<br>${token(base)} ${symbol} ${token(amount)} = ${token(result)}</p>
    <p>따라서 ${token(base)} 에 ${token(percent)}% 를 ${label}하면 ${token(result)}</p>
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
}

function resetAll() {
  elements.part.total.value = INITIAL_VALUES.partTotal;
  elements.part.percent.value = INITIAL_VALUES.partPercent;
  elements.reverse.part.value = INITIAL_VALUES.reversePart;
  elements.reverse.percent.value = INITIAL_VALUES.reversePercent;
  elements.ratio.total.value = INITIAL_VALUES.ratioTotal;
  elements.ratio.part.value = INITIAL_VALUES.ratioPart;
  elements.change.before.value = INITIAL_VALUES.changeBefore;
  elements.change.after.value = INITIAL_VALUES.changeAfter;
  elements.apply.base.value = INITIAL_VALUES.applyBase;
  elements.apply.percent.value = INITIAL_VALUES.applyPercent;
  state.applyMode = "up";
  renderAll();
}

function bindEvents() {
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", renderAll);
  });

  elements.apply.mode.addEventListener("click", () => {
    state.applyMode = state.applyMode === "up" ? "down" : "up";
    renderApplyPercent();
  });

  elements.resetAll.addEventListener("click", resetAll);
}

bindEvents();
renderAll();
