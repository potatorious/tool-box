const defaults = {
  partTotal: "",
  partPercent: "",
  ratioTotal: "",
  ratioPart: "",
  changeBefore: "",
  changeAfter: "",
  applyBase: "",
  applyPercent: "",
  reversePart: "",
  reversePercent: "",
};

const state = {
  applyMode: "up",
};

const $ = (id) => document.getElementById(id);

const els = {
  partTotal: $("part-total"),
  partPercent: $("part-percent"),
  partResult: $("part-result"),
  partFormula: $("part-formula"),
  partDetail: $("part-detail"),

  ratioTotal: $("ratio-total"),
  ratioPart: $("ratio-part"),
  ratioPartTopic: $("ratio-part-topic"),
  ratioResult: $("ratio-result"),
  ratioFormula: $("ratio-formula"),
  ratioDetail: $("ratio-detail"),

  changeBefore: $("change-before"),
  changeBeforeSubject: $("change-before-subject"),
  changeAfter: $("change-after"),
  changeAfterTo: $("change-after-to"),
  changeResult: $("change-result"),
  changeFormula: $("change-formula"),
  changeDetail: $("change-detail"),

  applyBase: $("apply-base"),
  applyPercent: $("apply-percent"),
  applyMode: $("apply-mode"),
  applyResult: $("apply-result"),
  applyFormula: $("apply-formula"),
  applyDetail: $("apply-detail"),

  reversePart: $("reverse-part"),
  reversePartSubject: $("reverse-part-subject"),
  reversePercent: $("reverse-percent"),
  reverseResult: $("reverse-result"),
  reverseFormula: $("reverse-formula"),
  reverseDetail: $("reverse-detail"),

  resetAll: $("reset-all"),
};

function numberValue(input) {
  return Number(input.value) || 0;
}

function hasValue(input) {
  return input.value.trim() !== "";
}

function showWaiting(resultEl, formulaEl, detailEl, suffix = "") {
  resultEl.textContent = suffix ? `-${suffix}` : "-";
  formulaEl.textContent = "전체 값 ÷ 100 × 비율 = 결과";
  detailEl.innerHTML = "<p>필요한 값을 입력하면 자세한 설명이 표시됩니다.</p>";
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

function setChangeClass(element, kind) {
  element.classList.remove("percent-up", "percent-down", "percent-flat");
  element.classList.add(`percent-${kind}`);
}

function renderPartOfTotal() {
  if (!hasValue(els.partTotal) || !hasValue(els.partPercent)) {
    showWaiting(els.partResult, els.partFormula, els.partDetail);
    return;
  }

  const total = numberValue(els.partTotal);
  const percent = numberValue(els.partPercent);
  const result = total / 100 * percent;

  els.partResult.textContent = formatNumber(result);
  els.partFormula.textContent = `${formatNumber(total)} ÷ 100 × ${formatNumber(percent)} = ${formatNumber(result)}`;
  els.partDetail.innerHTML = `
    <p>입력한 전체 값은 ${token(total)}입니다.<br>입력한 비율은 ${token(percent)}%입니다.</p>
    <p>1. 전체 값 ${token(total)}을 100으로 나눕니다.<br>${token(total)} ÷ 100 = ${token(total / 100)}</p>
    <p>2. 이것은 1%가 ${token(total / 100)}이라는 뜻입니다.</p>
    <p>3. 비율 ${token(percent)}%를 구하기 위해 ${token(total / 100)}에 ${token(percent)}을 곱합니다.<br>${token(total / 100)} × ${token(percent)} = ${token(result)}</p>
    <p>따라서 ${token(total)} 의 ${token(percent)}% 는 ${token(result)}</p>
  `;
}

function renderRatio() {
  if (!hasValue(els.ratioTotal) || !hasValue(els.ratioPart)) {
    showWaiting(els.ratioResult, els.ratioFormula, els.ratioDetail);
    els.ratioPartTopic.textContent = "은";
    els.ratioFormula.textContent = "일부 값 ÷ 전체 값 × 100 = 비율";
    return;
  }

  const total = numberValue(els.ratioTotal);
  const part = numberValue(els.ratioPart);
  const result = total === 0 ? 0 : part / total * 100;

  els.ratioPartTopic.textContent = josa(part, "은/는");
  els.ratioResult.textContent = `${formatNumber(result)}%`;
  els.ratioFormula.textContent = `${formatNumber(part)} ÷ ${formatNumber(total)} × 100 = ${formatNumber(result)}`;
  els.ratioDetail.innerHTML = `
    <p>입력한 전체 값은 ${token(total)}입니다.<br>입력한 일부 값은 ${token(part)}입니다.</p>
    <p>1. 일부 값 ${tokenJosa(part, "을/를")} 전체 값 ${tokenJosa(total, "으로/로")} 나눕니다.<br>${token(part)} ÷ ${token(total)} = ${token(total === 0 ? 0 : part / total)}</p>
    <p>2. 이것은 일부 값이 전체 값의 ${token(total === 0 ? 0 : part / total)}배라는 뜻입니다.</p>
    <p>3. 퍼센트로 바꾸기 위해 ${token(total === 0 ? 0 : part / total)}에 100을 곱합니다.<br>${token(total === 0 ? 0 : part / total)} × 100 = ${token(result)}</p>
    <p>따라서 ${token(total)} 중 ${tokenJosa(part, "은/는")} ${token(result)}%</p>
  `;
}

function renderChangeRate() {
  if (!hasValue(els.changeBefore) || !hasValue(els.changeAfter)) {
    showWaiting(els.changeResult, els.changeFormula, els.changeDetail);
    els.changeBeforeSubject.textContent = "이";
    els.changeAfterTo.textContent = "으로";
    els.changeFormula.textContent = "(변경 값 - 기준 값) ÷ 기준 값 × 100 = 증감률";
    setChangeClass(els.changeResult, "flat");
    return;
  }

  const before = numberValue(els.changeBefore);
  const after = numberValue(els.changeAfter);
  const difference = after - before;
  const absDifference = Math.abs(difference);
  const rate = before === 0 ? 0 : difference / before * 100;
  const absRate = Math.abs(rate);
  const kind = difference > 0 ? "up" : difference < 0 ? "down" : "flat";
  const label = difference > 0 ? `▲ ${formatNumber(absRate)}% 증가` : difference < 0 ? `▼ ${formatNumber(absRate)}% 감소` : "0% 변화 없음";

  els.changeBeforeSubject.textContent = josa(before, "이/가");
  els.changeAfterTo.textContent = josa(after, "으로/로");
  els.changeResult.textContent = label;
  setChangeClass(els.changeResult, kind);
  els.changeFormula.textContent = `(${formatNumber(after)} - ${formatNumber(before)}) ÷ ${formatNumber(before)} × 100 = ${formatNumber(rate)}`;

  if (kind === "flat") {
    els.changeDetail.innerHTML = `
      <p>입력한 기준 값은 ${token(before)}입니다.<br>입력한 변경 값은 ${token(after)}입니다.</p>
      <p>1. 변경 값 ${token(after)}에서 기준 값 ${tokenJosa(before, "을/를")} 뺍니다.<br>${token(after)} - ${token(before)} = 0</p>
      <p>2. 차이가 0이므로 값이 변하지 않았습니다.</p>
      <p>따라서 ${tokenJosa(before, "이/가")} ${tokenJosa(after, "으로/로")} 바뀌면 0% 변화 없음</p>
    `;
    return;
  }

  const verb = kind === "up" ? "늘어난" : "줄어든";
  const finalText = kind === "up" ? "증가" : "감소";
  els.changeDetail.innerHTML = `
    <p>입력한 기준 값은 ${token(before)}입니다.<br>입력한 변경 값은 ${token(after)}입니다.</p>
    <p>1. 변경 값 ${token(after)}에서 기준 값 ${tokenJosa(before, "을/를")} 뺍니다.<br>${token(after)} - ${token(before)} = ${token(difference)}</p>
    <p>2. 이것은 기준 값보다 ${token(absDifference)}만큼 ${finalText}했다는 뜻입니다.</p>
    <p>3. ${verb} 값 ${tokenJosa(absDifference, "을/를")} 기준 값 ${tokenJosa(before, "으로/로")} 나눕니다.<br>${token(absDifference)} ÷ ${token(before)} = ${token(before === 0 ? 0 : absDifference / before)}</p>
    <p>4. 퍼센트로 바꾸기 위해 ${token(before === 0 ? 0 : absDifference / before)}에 100을 곱합니다.<br>${token(before === 0 ? 0 : absDifference / before)} × 100 = ${token(absRate)}</p>
    <p>따라서 ${tokenJosa(before, "이/가")} ${tokenJosa(after, "으로/로")} 바뀌면 ${kind === "up" ? "▲" : "▼"} ${token(absRate)}% ${finalText}</p>
  `;
}

function renderApplyPercent() {
  if (!hasValue(els.applyBase) || !hasValue(els.applyPercent)) {
    showWaiting(els.applyResult, els.applyFormula, els.applyDetail);
    els.applyFormula.textContent = "기준 값 + (기준 값 ÷ 100 × 비율) = 결과";
    els.applyMode.textContent = state.applyMode === "up" ? "▲ 증가" : "▼ 감소";
    setChangeClass(els.applyMode, state.applyMode === "up" ? "up" : "down");
    return;
  }

  const base = numberValue(els.applyBase);
  const percent = numberValue(els.applyPercent);
  const amount = base / 100 * percent;
  const isUp = state.applyMode === "up";
  const result = isUp ? base + amount : base - amount;
  const symbol = isUp ? "+" : "-";
  const label = isUp ? "▲ 증가" : "▼ 감소";
  const word = isUp ? "증가" : "감소";

  els.applyMode.textContent = label;
  setChangeClass(els.applyMode, isUp ? "up" : "down");
  els.applyResult.textContent = formatNumber(result);
  els.applyFormula.textContent = `${formatNumber(base)} ${symbol} (${formatNumber(base)} ÷ 100 × ${formatNumber(percent)}) = ${formatNumber(result)}`;
  els.applyDetail.innerHTML = `
    <p>입력한 기준 값은 ${token(base)}입니다.<br>입력한 비율은 ${token(percent)}%입니다.<br>선택한 방식은 ${label}입니다.</p>
    <p>1. 기준 값 ${tokenJosa(base, "을/를")} 100으로 나눕니다.<br>${token(base)} ÷ 100 = ${token(base / 100)}</p>
    <p>2. 이것은 1%가 ${token(base / 100)}이라는 뜻입니다.</p>
    <p>3. 비율 ${token(percent)}%를 구하기 위해 ${token(base / 100)}에 ${token(percent)}을 곱합니다.<br>${token(base / 100)} × ${token(percent)} = ${token(amount)}</p>
    <p>4. ${word}이므로 기준 값 ${token(base)}${isUp ? "에" : "에서"} ${tokenJosa(amount, "을/를")} ${isUp ? "더합니다" : "뺍니다"}.<br>${token(base)} ${symbol} ${token(amount)} = ${token(result)}</p>
    <p>따라서 ${token(base)} 에 ${token(percent)}% 를 ${label}하면 ${token(result)}</p>
  `;
}

function renderReverseTotal() {
  if (!hasValue(els.reversePart) || !hasValue(els.reversePercent)) {
    showWaiting(els.reverseResult, els.reverseFormula, els.reverseDetail);
    els.reversePartSubject.textContent = "이";
    els.reverseFormula.textContent = "일부 값 ÷ 비율 × 100 = 전체 값";
    return;
  }

  const part = numberValue(els.reversePart);
  const percent = numberValue(els.reversePercent);
  const result = percent === 0 ? 0 : part / percent * 100;

  els.reversePartSubject.textContent = josa(part, "이/가");
  els.reverseResult.textContent = formatNumber(result);
  els.reverseFormula.textContent = `${formatNumber(part)} ÷ ${formatNumber(percent)} × 100 = ${formatNumber(result)}`;
  els.reverseDetail.innerHTML = `
    <p>입력한 일부 값은 ${token(part)}입니다.<br>입력한 비율은 ${token(percent)}%입니다.</p>
    <p>1. 일부 값 ${tokenJosa(part, "을/를")} 비율 ${tokenJosa(percent, "으로/로")} 나눕니다.<br>${token(part)} ÷ ${token(percent)} = ${token(percent === 0 ? 0 : part / percent)}</p>
    <p>2. 이것은 1%가 ${token(percent === 0 ? 0 : part / percent)}이라는 뜻입니다.</p>
    <p>3. 전체 값은 100%이므로 ${token(percent === 0 ? 0 : part / percent)}에 100을 곱합니다.<br>${token(percent === 0 ? 0 : part / percent)} × 100 = ${token(result)}</p>
    <p>따라서 ${tokenJosa(part, "이/가")} ${token(percent)}% 라면 전체는 ${token(result)}</p>
  `;
}

function render() {
  renderPartOfTotal();
  renderRatio();
  renderChangeRate();
  renderApplyPercent();
  renderReverseTotal();
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", render);
});

els.applyMode.addEventListener("click", () => {
  state.applyMode = state.applyMode === "up" ? "down" : "up";
  renderApplyPercent();
});

els.resetAll.addEventListener("click", () => {
  els.partTotal.value = defaults.partTotal;
  els.partPercent.value = defaults.partPercent;
  els.ratioTotal.value = defaults.ratioTotal;
  els.ratioPart.value = defaults.ratioPart;
  els.changeBefore.value = defaults.changeBefore;
  els.changeAfter.value = defaults.changeAfter;
  els.applyBase.value = defaults.applyBase;
  els.applyPercent.value = defaults.applyPercent;
  els.reversePart.value = defaults.reversePart;
  els.reversePercent.value = defaults.reversePercent;
  state.applyMode = "up";
  render();
});

render();
