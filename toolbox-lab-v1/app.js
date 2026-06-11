const HOURS_PER_DAY = 8;
const HOURS_PER_WEEK = 40;
const WEEKS_PER_MONTH = 4.33;
const WEEKS_PER_YEAR = 52;

const form = document.querySelector("#calculator-form");
const hoursInput = document.querySelector("#hours");
const rateInput = document.querySelector("#rate");
const valueInput = document.querySelector("#value");
const timeUnit = document.querySelector("#time-unit");
const rateUnit = document.querySelector("#rate-unit");
const totalHoursEl = document.querySelector("#total-hours");
const hourlyRateEl = document.querySelector("#hourly-rate");
const totalValueEl = document.querySelector("#total-value");
const conversionTable = document.querySelector("#conversion-table");
const copyButton = document.querySelector("#copy-result");
const copyStatus = document.querySelector("#copy-status");

function toHours(amount, unit) {
  const value = Number(amount) || 0;
  const units = {
    minute: value / 60,
    hour: value,
    day: value * HOURS_PER_DAY,
    week: value * HOURS_PER_WEEK,
  };
  return units[unit] ?? value;
}

function rateToHourly(amount, unit) {
  const value = Number(amount) || 0;
  const units = {
    hour: value,
    day: value / HOURS_PER_DAY,
    week: value / HOURS_PER_WEEK,
    month: value / (HOURS_PER_WEEK * WEEKS_PER_MONTH),
  };
  return units[unit] ?? value;
}

function formatCurrency(value) {
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
}

function formatNumber(value, maximumFractionDigits = 2) {
  return value.toLocaleString("ko-KR", { maximumFractionDigits });
}

function calculate() {
  const totalHours = toHours(hoursInput.value, timeUnit.value);
  const hourlyRate = rateToHourly(rateInput.value, rateUnit.value);
  const totalValue = totalHours * hourlyRate;

  valueInput.value = Math.round(totalValue);
  totalHoursEl.textContent = `${formatNumber(totalHours)}시간`;
  hourlyRateEl.textContent = formatCurrency(hourlyRate);
  totalValueEl.textContent = formatCurrency(totalValue);

  const rows = [
    ["분당 가치", hourlyRate / 60],
    ["일 기준 가치", hourlyRate * HOURS_PER_DAY],
    ["주 기준 가치", hourlyRate * HOURS_PER_WEEK],
    ["월 기준 가치", hourlyRate * HOURS_PER_WEEK * WEEKS_PER_MONTH],
    ["연 기준 가치", hourlyRate * HOURS_PER_WEEK * WEEKS_PER_YEAR],
  ];

  conversionTable.innerHTML = rows
    .map(([label, value]) => `<tr><td>${label}</td><td>${formatCurrency(value)}</td></tr>`)
    .join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  calculate();
});

form.addEventListener("input", calculate);
form.addEventListener("change", calculate);

form.addEventListener("reset", () => {
  window.setTimeout(calculate, 0);
});

document.querySelectorAll("[data-hours]").forEach((button) => {
  button.addEventListener("click", () => {
    hoursInput.value = button.dataset.hours;
    timeUnit.value = "hour";
    calculate();
  });
});

copyButton.addEventListener("click", async () => {
  const text = [
    `총 시간: ${totalHoursEl.textContent}`,
    `시간당 요율: ${hourlyRateEl.textContent}`,
    `총 가치: ${totalValueEl.textContent}`,
  ].join("\n");

  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = "계산 결과를 클립보드에 복사했습니다.";
  } catch {
    copyStatus.textContent = "복사 권한이 없어 화면의 결과를 직접 선택해 복사해 주세요.";
  }
});

calculate();
