const $ = (id) => document.getElementById(id);

const elements = {
  height: $("height"),
  weight: $("weight"),
  bmiValue: $("bmi-value"),
  bmiCategory: $("bmi-category"),
  bmiMarker: $("bmi-marker"),
  scaleLabels: document.querySelectorAll(".bmi-scale-labels span"),
};

const categories = [
  { max: 18.5, label: "저체중" },
  { max: 23, label: "정상 체중" },
  { max: 25, label: "과체중" },
  { max: 30, label: "비만" },
  { max: Infinity, label: "고도비만" },
];

function parseInput(input) {
  const value = Number(input.value);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function formatNumber(value) {
  return Number(value.toFixed(1)).toLocaleString("ko-KR");
}

function getBmiCategory(bmi) {
  return categories.find((category) => bmi < category.max).label;
}

function getMarkerPosition(bmi) {
  const min = 15;
  const max = 35;
  const clamped = Math.min(Math.max(bmi, min), max);

  return ((clamped - min) / (max - min)) * 100;
}

function renderScale(bmi, category) {
  elements.bmiMarker.style.left = bmi ? `${getMarkerPosition(bmi)}%` : "0%";
  elements.bmiMarker.hidden = !bmi;

  elements.scaleLabels.forEach((label) => {
    label.classList.toggle("is-active", label.dataset.category === category);
  });
}

function render() {
  const heightCm = parseInput(elements.height);
  const weightKg = parseInput(elements.weight);

  if (!heightCm || !weightKg) {
    elements.bmiValue.textContent = "-";
    elements.bmiCategory.textContent = "-";
    renderScale(null, "");
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const category = getBmiCategory(bmi);

  elements.bmiValue.textContent = formatNumber(bmi);
  elements.bmiCategory.textContent = category;
  renderScale(bmi, category);
}

elements.height.addEventListener("input", render);
elements.weight.addEventListener("input", render);

render();
