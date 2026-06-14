const $ = (id) => document.getElementById(id);

const elements = {
  birthYear: $("birth-year"),
  birthMonth: $("birth-month"),
  birthDay: $("birth-day"),
  baseYear: $("base-year"),
  baseMonth: $("base-month"),
  baseDay: $("base-day"),
  internationalAge: $("international-age"),
  yearAge: $("year-age"),
  koreanAge: $("korean-age"),
  exactAge: $("exact-age"),
  birthdayStatus: $("birthday-status"),
  daysLived: $("days-lived"),
  nextBirthdayLabel: $("next-birthday-label"),
  nextBirthday: $("next-birthday"),
  nextBirthdayDays: $("next-birthday-days"),
  birthSummaryMain: $("birth-summary-main"),
  birthSummaryDetail: $("birth-summary-detail"),
  birthSymbols: $("birth-symbols"),
  adultYear: $("adult-year"),
  adultStatus: $("adult-status"),
  milestones: $("milestones"),
  ageNames: $("age-names"),
  schoolYears: $("school-years"),
};

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
const zodiacAnimals = [
  "원숭이",
  "닭",
  "개",
  "돼지",
  "쥐",
  "소",
  "호랑이",
  "토끼",
  "용",
  "뱀",
  "말",
  "양",
];
const heavenlyStems = [
  { ko: "경", hanja: "庚" },
  { ko: "신", hanja: "辛" },
  { ko: "임", hanja: "壬" },
  { ko: "계", hanja: "癸" },
  { ko: "갑", hanja: "甲" },
  { ko: "을", hanja: "乙" },
  { ko: "병", hanja: "丙" },
  { ko: "정", hanja: "丁" },
  { ko: "무", hanja: "戊" },
  { ko: "기", hanja: "己" },
];
const earthlyBranches = [
  { ko: "신", hanja: "申" },
  { ko: "유", hanja: "酉" },
  { ko: "술", hanja: "戌" },
  { ko: "해", hanja: "亥" },
  { ko: "자", hanja: "子" },
  { ko: "축", hanja: "丑" },
  { ko: "인", hanja: "寅" },
  { ko: "묘", hanja: "卯" },
  { ko: "진", hanja: "辰" },
  { ko: "사", hanja: "巳" },
  { ko: "오", hanja: "午" },
  { ko: "미", hanja: "未" },
];
const milestoneDays = [
  100, 200, 300, 500, 777, 1000, 1500, 2000, 3000, 5000, 7777, 10000, 15000,
  20000, 25000, 30000, 36500, 40000,
];
const ageNameList = [
  { age: 15, name: "지학", hanja: "志學" },
  { age: 20, name: "약관", hanja: "弱冠" },
  { age: 30, name: "이립", hanja: "而立" },
  { age: 40, name: "불혹", hanja: "不惑" },
  { age: 50, name: "지천명", hanja: "知天命" },
  { age: 60, name: "육순", hanja: "六旬" },
  { age: 61, name: "환갑", hanja: "還甲" },
  { age: 62, name: "진갑", hanja: "進甲" },
  { age: 70, name: "칠순", hanja: "七旬" },
  { age: 71, name: "망팔", hanja: "望八" },
  { age: 77, name: "희수", hanja: "喜壽" },
  { age: 80, name: "팔순", hanja: "八旬" },
  { age: 81, name: "망구", hanja: "望九" },
  { age: 88, name: "미수", hanja: "米壽" },
  { age: 90, name: "구순", hanja: "九旬" },
  { age: 91, name: "망백", hanja: "望百" },
  { age: 99, name: "백수", hanja: "白壽" },
  { age: 100, name: "상수", hanja: "上壽" },
  { age: 108, name: "다수", hanja: "茶壽" },
  { age: 111, name: "황수", hanja: "皇壽" },
  { age: 120, name: "천수", hanja: "天壽" },
];
const schoolStages = [
  { offset: 7, label: "초등학교 1학년" },
  { offset: 8, label: "초등학교 2학년" },
  { offset: 9, label: "초등학교 3학년" },
  { offset: 10, label: "초등학교 4학년" },
  { offset: 11, label: "초등학교 5학년" },
  { offset: 12, label: "초등학교 6학년" },
  { offset: 13, label: "중학교 1학년" },
  { offset: 14, label: "중학교 2학년" },
  { offset: 15, label: "중학교 3학년" },
  { offset: 16, label: "고등학교 1학년" },
  { offset: 17, label: "고등학교 2학년" },
  { offset: 18, label: "고등학교 3학년" },
  { offset: 19, label: "고등학교 졸업" },
];
const detailPlaceholders = {
  daysLived: "생후 일수와 개월 수가 표시됩니다.",
  exactAge: "만 나이 기준의 년, 월, 일 기간이 표시됩니다.",
  birthSummary: "출생 연도의 육십갑자와 띠가 표시됩니다.",
  birthSymbols: "별자리와 월별 탄생석이 표시됩니다.",
  adultStatus: "성년이 되는 해와 남은 기간이 표시됩니다.",
  nextBirthday: "다음 생일의 요일과 남은 기간이 표시됩니다.",
};
const westernZodiacSigns = [
  { name: "염소자리", from: [12, 22], to: [1, 19] },
  { name: "물병자리", from: [1, 20], to: [2, 18] },
  { name: "물고기자리", from: [2, 19], to: [3, 20] },
  { name: "양자리", from: [3, 21], to: [4, 19] },
  { name: "황소자리", from: [4, 20], to: [5, 20] },
  { name: "쌍둥이자리", from: [5, 21], to: [6, 21] },
  { name: "게자리", from: [6, 22], to: [7, 22] },
  { name: "사자자리", from: [7, 23], to: [8, 22] },
  { name: "처녀자리", from: [8, 23], to: [9, 22] },
  { name: "천칭자리", from: [9, 23], to: [10, 22] },
  { name: "전갈자리", from: [10, 23], to: [11, 22] },
  { name: "사수자리", from: [11, 23], to: [12, 21] },
];
const birthstones = [
  "가넷",
  "자수정",
  "아쿠아마린",
  "다이아몬드",
  "에메랄드",
  "진주 · 문스톤 · 알렉산드라이트",
  "루비",
  "페리도트 · 스피넬 · 사도닉스",
  "사파이어",
  "오팔 · 투어멀린",
  "토파즈 · 시트린",
  "터키석 · 지르콘 · 탄자나이트",
];

function fillDateInputs(prefix, date) {
  elements[`${prefix}Year`].value = date.getFullYear();
  elements[`${prefix}Month`].value = date.getMonth() + 1;
  elements[`${prefix}Day`].value = date.getDate();
}

function parseNumber(input) {
  const rawValue = String(input.value).trim();

  if (!rawValue) {
    return null;
  }

  const value = Number(rawValue);
  return Number.isInteger(value) ? value : null;
}

function limitDigits(input, maxLength) {
  input.value = input.value.replace(/\D/g, "").slice(0, maxLength);
}

function parseDateParts(yearInput, monthInput, dayInput) {
  const year = parseNumber(yearInput);
  const enteredMonth = parseNumber(monthInput);
  const enteredDay = parseNumber(dayInput);

  if (!year) {
    return null;
  }

  const month = enteredMonth ?? 1;
  const day = enteredMonth ? (enteredDay ?? 1) : 1;
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function formatDate(date) {
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return `${formattedDate}(${weekdays[date.getDay()]})`;
}

function formatNumber(value) {
  return value.toLocaleString("ko-KR");
}

function formatDuration(duration) {
  return `${formatNumber(duration.years)}년 ${duration.months}개월 ${duration.days}일`;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addYears(date, years) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);

  if (result.getMonth() !== date.getMonth()) {
    return new Date(date.getFullYear() + years, 1, 28);
  }

  return result;
}

function getBirthdayForYear(birthDate, year) {
  const month = birthDate.getMonth();
  const day = birthDate.getDate();
  const birthday = new Date(year, month, day);

  if (birthday.getMonth() !== month) {
    return new Date(year, 1, 28);
  }

  return birthday;
}

function getDayDiff(startDate, endDate) {
  const start = Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  );
  const end = Date.UTC(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
  );

  return Math.floor((end - start) / 86400000);
}

function hasBirthdayPassed(birthDate, baseDate) {
  const birthday = getBirthdayForYear(birthDate, baseDate.getFullYear());
  return baseDate >= birthday;
}

function getInternationalAge(birthDate, baseDate) {
  let age = baseDate.getFullYear() - birthDate.getFullYear();

  if (!hasBirthdayPassed(birthDate, baseDate)) {
    age -= 1;
  }

  return age;
}

function getExactAge(birthDate, baseDate) {
  let years = baseDate.getFullYear() - birthDate.getFullYear();
  let cursor = getBirthdayForYear(birthDate, birthDate.getFullYear() + years);

  if (cursor > baseDate) {
    years -= 1;
    cursor = getBirthdayForYear(birthDate, birthDate.getFullYear() + years);
  }

  let months = 0;
  let next = new Date(cursor);
  next.setMonth(next.getMonth() + 1);

  while (next <= baseDate) {
    months += 1;
    cursor = next;
    next = new Date(cursor);
    next.setMonth(next.getMonth() + 1);
  }

  return {
    years,
    months,
    days: getDayDiff(cursor, baseDate),
  };
}

function getNextBirthday(birthDate, baseDate) {
  let nextBirthday = getBirthdayForYear(birthDate, baseDate.getFullYear());

  if (nextBirthday < baseDate) {
    nextBirthday = getBirthdayForYear(birthDate, baseDate.getFullYear() + 1);
  }

  return nextBirthday;
}

function getZodiac(year) {
  return zodiacAnimals[((year % 12) + 12) % 12];
}

function getSexagenaryYear(year) {
  const stem = heavenlyStems[((year % 10) + 10) % 10];
  const branch = earthlyBranches[((year % 12) + 12) % 12];

  return `${stem.ko}${branch.ko}(${stem.hanja}${branch.hanja})년`;
}

function isDateInRange(month, day, from, to) {
  const value = month * 100 + day;
  const start = from[0] * 100 + from[1];
  const end = to[0] * 100 + to[1];

  if (start <= end) {
    return value >= start && value <= end;
  }

  return value >= start || value <= end;
}

function getWesternZodiacSign(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return westernZodiacSigns.find((sign) =>
    isDateInRange(month, day, sign.from, sign.to),
  ).name;
}

function getBirthstone(date) {
  return birthstones[date.getMonth()];
}

function resetResult(message = "") {
  const hasMessage = Boolean(message);

  elements.internationalAge.textContent = hasMessage ? message : "-";
  elements.yearAge.textContent = hasMessage ? message : "-";
  elements.koreanAge.textContent = hasMessage ? message : "-";
  elements.birthdayStatus.textContent = "";
  elements.daysLived.textContent = hasMessage ? message : detailPlaceholders.daysLived;
  elements.exactAge.textContent = hasMessage ? message : detailPlaceholders.exactAge;
  elements.nextBirthdayLabel.textContent = "";
  elements.nextBirthday.textContent = hasMessage ? message : detailPlaceholders.nextBirthday;
  elements.nextBirthdayDays.textContent = "";
  elements.birthSummaryMain.textContent = hasMessage ? message : detailPlaceholders.birthSummary;
  elements.birthSummaryDetail.textContent = "";
  elements.birthSymbols.textContent = hasMessage ? message : detailPlaceholders.birthSymbols;
  elements.adultYear.textContent = hasMessage ? message : detailPlaceholders.adultStatus;
  elements.adultStatus.textContent = "";
  elements.milestones.textContent = "";
  elements.ageNames.textContent = "";
  elements.schoolYears.textContent = "";
}

function renderMilestones(birthDate, baseDate) {
  elements.milestones.textContent = "";

  milestoneDays.forEach((days) => {
    const date = addDays(birthDate, days);
    const internationalAge = getInternationalAge(birthDate, date);
    const koreanAge = date.getFullYear() - birthDate.getFullYear() + 1;
    const detail = `만 ${formatNumber(internationalAge)}세 · 세는 나이 ${formatNumber(koreanAge)}세`;
    elements.milestones.append(
      createInfoRow(
        `${formatNumber(days)}일`,
        formatDate(date),
        detail,
        date < baseDate,
      ),
    );
  });
}

function createInfoRow(labelText, valueText, detailText = "", isPast = false) {
  const item = document.createElement("div");
  item.className = "counter-row";

  const label = document.createElement("span");
  label.textContent = labelText;

  const value = document.createElement("strong");
  value.textContent = valueText;

  const detail = document.createElement("span");
  detail.textContent = detailText;

  if (isPast) {
    item.classList.add("is-past");
  }

  item.append(label, value, detail);
  return item;
}

function createAgeNameRow(nicknameText, yearText, countedAgeText, isPast = false) {
  const item = document.createElement("div");
  item.className = "counter-row age-name-row";

  const nickname = document.createElement("span");
  nickname.textContent = nicknameText;

  const year = document.createElement("strong");
  year.textContent = yearText;

  const countedAge = document.createElement("span");
  countedAge.textContent = countedAgeText;

  if (isPast) {
    item.classList.add("is-past");
  }

  item.append(nickname, year, countedAge);
  return item;
}

function renderAgeNames(birthYear, baseYear) {
  elements.ageNames.textContent = "";

  ageNameList.forEach((item) => {
    // These traditional labels are shown by Korean counted age.
    const year = birthYear + item.age - 1;
    const isPast = year < baseYear;
    elements.ageNames.append(
      createAgeNameRow(
        `${item.name}(${item.hanja})`,
        `${year}년`,
        `세는 나이 ${item.age}세`,
        isPast,
      ),
    );
  });
}

function renderSchoolYears(birthDate, baseDate) {
  elements.schoolYears.textContent = "";
  const birthYear = birthDate.getFullYear();

  schoolStages.forEach((stage) => {
    const year = birthYear + stage.offset;
    const schoolStartDate = new Date(year, 2, 1);
    const internationalAge = getInternationalAge(birthDate, schoolStartDate);
    const koreanAge = stage.offset + 1;
    const ageText = `만 ${internationalAge}세 · 세는 나이 ${koreanAge}세`;
    const isPast = schoolStartDate < baseDate;
    elements.schoolYears.append(
      createInfoRow(stage.label, `${year}년`, ageText, isPast),
    );
  });
}

function render() {
  const birthDate = parseDateParts(
    elements.birthYear,
    elements.birthMonth,
    elements.birthDay,
  );
  const baseDate = parseDateParts(
    elements.baseYear,
    elements.baseMonth,
    elements.baseDay,
  );

  if (!birthDate || !baseDate) {
    resetResult();
    return;
  }

  if (birthDate > baseDate) {
    resetResult("기준일 이전 생년월일을 입력하세요.");
    return;
  }

  const internationalAge = getInternationalAge(birthDate, baseDate);
  const yearAge = baseDate.getFullYear() - birthDate.getFullYear();
  const koreanAge = yearAge + 1;
  const exactAge = getExactAge(birthDate, baseDate);
  const daysLived = getDayDiff(birthDate, baseDate);
  const monthsLived = exactAge.years * 12 + exactAge.months;
  const nextBirthday = getNextBirthday(birthDate, baseDate);
  const daysToNextBirthday = getDayDiff(baseDate, nextBirthday);
  const adultDate = addYears(birthDate, 19);
  const daysToAdult = getDayDiff(baseDate, adultDate);
  const adultDuration = daysToAdult > 0
    ? getExactAge(baseDate, adultDate)
    : getExactAge(adultDate, baseDate);

  elements.internationalAge.textContent = `${formatNumber(internationalAge)}세`;
  elements.yearAge.textContent = `${formatNumber(yearAge)}세`;
  elements.koreanAge.textContent = `${formatNumber(koreanAge)}세`;
  renderDaysLived(daysLived, monthsLived);
  renderExactAge(exactAge, hasBirthdayPassed(birthDate, baseDate));
  elements.nextBirthdayLabel.textContent = "다음 생일은 ";
  renderNextBirthday(nextBirthday, daysToNextBirthday);
  renderBirthSummary(birthDate);
  renderBirthSymbols(birthDate);
  elements.adultYear.textContent = `${adultDate.getFullYear()}년 성년, `;
  renderAdultStatus(daysToAdult, adultDuration);

  renderMilestones(birthDate, baseDate);
  renderAgeNames(birthDate.getFullYear(), baseDate.getFullYear());
  renderSchoolYears(birthDate, baseDate);
}

function renderDaysLived(daysLived, monthsLived) {
  elements.daysLived.textContent = "";

  const value = document.createElement("strong");
  value.textContent = `${formatNumber(daysLived)}일 (${formatNumber(monthsLived)}개월)`;

  elements.daysLived.append("생후 ", value);
}

function renderExactAge(exactAge, birthdayPassed) {
  elements.exactAge.textContent = "";
  const value = document.createElement("strong");
  value.textContent = `${formatNumber(exactAge.years)}년 ${exactAge.months}개월 ${exactAge.days}일, `;
  elements.exactAge.append(value);
  elements.birthdayStatus.textContent = birthdayPassed
    ? "올해 생일이 지났습니다."
    : "올해 생일 전입니다.";
}

function renderBirthSummary(birthDate) {
  elements.birthSummaryMain.textContent = `${birthDate.getFullYear()}년 `;

  const value = document.createElement("strong");
  value.textContent = `${getSexagenaryYear(birthDate.getFullYear())} ${getZodiac(birthDate.getFullYear())}띠`;

  elements.birthSummaryMain.append(value);
  elements.birthSummaryDetail.textContent = " 입니다.";
}

function renderBirthSymbols(birthDate) {
  elements.birthSymbols.textContent = "";

  const zodiac = document.createElement("strong");
  zodiac.textContent = `${getWesternZodiacSign(birthDate)},`;

  const birthstone = document.createElement("strong");
  birthstone.textContent = getBirthstone(birthDate);

  elements.birthSymbols.append(
    "별자리는 ",
    zodiac,
    " 탄생석은 ",
    birthstone,
    " 입니다.",
  );
}

function renderAdultStatus(daysToAdult, adultDuration) {
  const status = daysToAdult > 0 ? "남았습니다." : "지났습니다.";
  const value = document.createElement("strong");
  value.textContent = formatDuration(adultDuration);

  elements.adultStatus.textContent = "";
  elements.adultStatus.append(value, ` ${status}`);
}

function renderNextBirthday(nextBirthday, daysToNextBirthday) {
  elements.nextBirthday.textContent = "";
  elements.nextBirthdayDays.textContent = "";

  const weekday = document.createElement("strong");
  weekday.textContent = `${weekdays[nextBirthday.getDay()]}요일, `;
  elements.nextBirthday.append(weekday);

  if (daysToNextBirthday === 0) {
    elements.nextBirthdayDays.textContent = "오늘이 생일입니다. 생일 축하드립니다!";
    return;
  }

  const days = document.createElement("strong");
  days.textContent = `${formatNumber(daysToNextBirthday)}일`;
  elements.nextBirthdayDays.append(days, " 남았습니다.");
}

fillDateInputs("base", new Date());

[
  elements.birthYear,
  elements.baseYear,
].forEach((input) => {
  input.addEventListener("input", () => {
    limitDigits(input, 4);
    render();
  });
});

[
  elements.birthMonth,
  elements.birthDay,
  elements.baseMonth,
  elements.baseDay,
].forEach((input) => {
  input.addEventListener("input", () => {
    limitDigits(input, 2);
    render();
  });
});

render();
