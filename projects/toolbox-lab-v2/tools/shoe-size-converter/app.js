const $ = (id) => document.getElementById(id);

const menFootCm = [21.6, 22, 22.4, 22.9, 23.3, 23.7, 24.1, 24.5, 25, 25.4, 25.8, 26.2, 26.7, 27.1, 27.5, 27.9, 28.3, 28.8, 29.2, 29.6, 30, 30.5, 30.9, 31.3, 31.7, 32.2, 32.6, 33, 33.4, 33.9, 34.3, 34.7, 35.1, 35.5, 36, 36.4, 36.8, 37.2];
const menFootIn = ["8 1/2", "8 11/16", "8 13/16", "9", "9 3/16", "9 5/16", "9 1/2", "9 11/16", "9 13/16", "10", "10 3/16", "10 5/16", "10 1/2", "10 11/16", "10 13/16", "11", "11 3/16", "11 5/16", "11 1/2", "11 11/16", "11 13/16", "12", "12 3/16", "12 5/16", "12 1/2", "12 11/16", "12 13/16", "13", "13 3/16", "13 5/16", "13 1/2", "13 11/16", "13 13/16", "14", "14 3/16", "14 5/16", "14 1/2", "14 11/16"];
const womenFootCm = [20.8, 21.2, 21.6, 22, 22.4, 22.9, 23.3, 23.7, 24.1, 24.5, 25, 25.4, 25.8, 26.2, 26.7, 27.1, 27.5, 27.9, 28.3, 28.8, 29.2, 29.6, 30, 30.5, 30.9, 31.3, 31.7, 32.2];

const charts = {
  men: createRows({
    usMen: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22],
    usWomen: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5],
    uk: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21],
    kr: [225, 230, 235, 235, 240, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315, 320, 325, 330, 335, 340, 345, 350, 355, 360, 365, 370, 375, 380, 385, 390, 395, 400],
    jp: [22.5, 23, 23.5, 23.5, 24, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40],
    eu: [35.5, 36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46, 47, 47.5, 48, 48.5, 49, 49.5, 50, 50.5, 51, 51.5, 52, 52.5, 53, 53.5, 54, 54.5, 55, 55.5, 56, 56.5],
    footCm: menFootCm,
    footIn: menFootIn,
  }),
  women: createRows({
    usWomen: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5],
    usMen: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21],
    uk: [1.5, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20],
    kr: [210, 210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315, 320, 325, 330, 335, 340, 345, 350, 355, 360, 365, 370, 375, 380, 385, 390, 395],
    jp: [21, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5],
    eu: [33.5, 34.5, 35, 35.5, 36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46, 47, 47.5, 48, 48.5, 49, 50, 50.5, 51, 51.5, 52, 52.5, 53, 53.5, 54, 54.5, 55, 55.5, 56],
    footCm: womenFootCm,
  }),
};

const elements = {
  chartType: $("chart-type"),
  sourceUnit: $("source-unit"),
  sourceSize: $("source-size"),
  tableWrap: $("size-table-wrap"),
  resultRows: $("result-rows"),
};

const tableFields = ["kr", "usMen", "usWomen", "uk", "eu", "jp", "footCm", "footIn"];

function createRows(columns) {
  const rowCount = Math.max(...Object.values(columns).map((values) => values.length));

  return Array.from({ length: rowCount }, (_, index) => ({
    kr: columns.kr[index] ?? "",
    usMen: columns.usMen[index] ?? "",
    usWomen: columns.usWomen[index] ?? "",
    uk: columns.uk[index] ?? "",
    eu: columns.eu[index] ?? "",
    jp: columns.jp[index] ?? "",
    footCm: columns.footCm[index] ?? "",
    footIn: columns.footIn?.[index] ?? (columns.footCm[index] ? formatInches(columns.footCm[index]) : ""),
    footInDecimal: columns.footCm[index] ? formatDecimalInches(columns.footCm[index]) : "",
  }));
}

function formatDecimalInches(cm) {
  return String(Number((cm / 2.54).toFixed(2)));
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
  return charts[elements.chartType.value];
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

  return `${row.footInDecimal} (${row.footIn})`;
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

elements.chartType.addEventListener("change", render);
elements.sourceUnit.addEventListener("change", render);
elements.sourceSize.addEventListener("change", renderResults);

render();
