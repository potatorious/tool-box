const $ = (id) => document.getElementById(id);

const krSizes = createKrSizes(210, 400, 5);
const sizeRows = createRows(krSizes);

const elements = {
  sourceUnit: $("source-unit"),
  sourceSize: $("source-size"),
  tableWrap: $("size-table-wrap"),
  resultRows: $("result-rows"),
};

const tableFields = ["kr", "usMen", "usWomen", "uk", "eu", "jp", "footIn"];

function createKrSizes(min, max, step) {
  return Array.from(
    { length: Math.floor((max - min) / step) + 1 },
    (_, index) => min + index * step,
  );
}

function createRows(sizes) {
  return sizes.map((kr) => {
    const footCm = kr / 10;
    const uk = roundToNearestHalf((kr / 25.4) * 3 - 23);
    const usMen = uk + 1;
    const usWomen = usMen + 1.5;

    return {
      kr,
      usMen,
      usWomen,
      uk,
      eu: roundToNearestHalf((kr * 3) / 20 + 2),
      jp: footCm,
      footCm,
      footIn: formatInchDisplay(footCm),
    };
  });
}

function formatInchDisplay(cm) {
  return `${formatDecimalInches(cm)} (${formatInches(cm)})`;
}

function formatDecimalInches(cm) {
  return String(Number((cm / 2.54).toFixed(2)));
}

function roundToNearestHalf(value) {
  return Number((Math.round(value * 2) / 2).toFixed(1));
}

function formatInches(cm) {
  const totalSixteenths = Math.round((cm / 2.54) * 16);
  const whole = Math.floor(totalSixteenths / 16);
  const numerator = totalSixteenths % 16;

  if (numerator === 0) {
    return String(whole);
  }

  const divisor = greatestCommonDivisor(numerator, 16);
  const simplifiedNumerator = numerator / divisor;
  const simplifiedDenominator = 16 / divisor;

  return `${whole} ${simplifiedNumerator}/${simplifiedDenominator}`;
}

function greatestCommonDivisor(a, b) {
  let left = a;
  let right = b;

  while (right !== 0) {
    const remainder = left % right;
    left = right;
    right = remainder;
  }

  return left;
}

function optionValue(value) {
  return String(value);
}

function uniqueSizes(rows, unit) {
  return [...new Set(rows.map((row) => row[unit]).filter((value) => value !== ""))];
}

function getRows() {
  return sizeRows;
}

function renderSizeOptions() {
  const rows = getRows();
  const unit = elements.sourceUnit.value;
  const sizes = uniqueSizes(rows, unit);

  elements.sourceSize.innerHTML = sizes
    .map((size) => `<option value="${optionValue(size)}">${size}</option>`)
    .join("");
}

function renderResults() {
  const rows = getRows();
  const unit = elements.sourceUnit.value;
  const selectedSize = elements.sourceSize.value;

  elements.resultRows.innerHTML = rows
    .map((row) => renderRow(row, optionValue(row[unit]) === selectedSize))
    .join("");

  scrollToSelectedRow();
}

function renderRow(row, isSelected) {
  return `
    <tr class="${isSelected ? "is-selected" : ""}">
      ${tableFields.map((field) => `<td>${formatCell(row, field)}</td>`).join("")}
    </tr>
  `;
}

function formatCell(row, field) {
  if (field === "footIn") {
    return formatInchCell(row);
  }

  return row[field] || "-";
}

function formatInchCell(row) {
  if (!row.footIn) {
    return "-";
  }

  return row.footIn;
}

function scrollToSelectedRow() {
  const selectedRow = elements.resultRows.querySelector(".is-selected");
  const tableHeader = elements.tableWrap.querySelector("thead");

  if (!selectedRow) {
    return;
  }

  elements.tableWrap.scrollTop = selectedRow.offsetTop - (tableHeader?.offsetHeight ?? 0);
}

function render() {
  renderSizeOptions();
  renderResults();
}

elements.sourceUnit.addEventListener("change", render);
elements.sourceSize.addEventListener("change", renderResults);

render();
