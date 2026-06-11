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
  monthsLived: $("months-lived"),
  nextBirthday: $("next-birthday"),
  nextBirthdayDays: $("next-birthday-days"),
  birthSummary: $("birth-summary"),
  adultYear: $("adult-year"),
  adultStatus: $("adult-status"),
  milestones: $("milestones"),
  ageNames: $("age-names"),
  schoolYears: $("school-years"),
};

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
const zodiacAnimals = ["원숭이", "닭", "개", "돼지", "쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양"];
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
  100,
  200,
  300,
  500,
  777,
  1000,
  1500,
  2000,
  3000,
  5000,
  7777,
  10000,
  15000,
  20000,
  25000,
  30000,
  36500,
];
const ageNameList = [
  { age: 15, name: "지학", hanja: "志學" },
  { age: 20, name: "약관", hanja: "弱冠" },
  { age: 20, name: "방년", hanja: "芳年" },
  { age: 30, name: "입지", hanja: "立志" },
  { age: 30, name: "이립", hanja: "而立" },
  { age: 40, name: "불혹", hanja: "不惑" },
  { age: 50, name: "지천명", hanja: "知天命" },
  { age: 60, name: "이순", hanja: "耳順" },
  { age: 60, name: "육순", hanja: "六旬" },
  { age: 61, name: "환갑", hanja: "還甲" },
  { age: 61, name: "회갑", hanja: "回甲" },
  { age: 62, name: "진갑", hanja: "進甲" },
  { age: 70, name: "고희", hanja: "古稀" },
  { age: 70, name: "칠순", hanja: "七旬" },
  { age: 70, name: "종심", hanja: "從心" },
  { age: 71, name: "망팔", hanja: "望八" },
  { age: 77, name: "희수", hanja: "喜壽" },
  { age: 80, name: "팔순", hanja: "八旬" },
  { age: 80, name: "산수", hanja: "傘壽" },
  { age: 81, name: "망구", hanja: "望九" },
  { age: 88, name: "미수", hanja: "米壽" },
  { age: 90, name: "구순", hanja: "九旬" },
  { age: 90, name: "졸수", hanja: "卒壽" },
  { age: 91, name: "망백", hanja: "望百" },
  { age: 99, name: "백수", hanja: "白壽" },
  { age: 100, name: "상수", hanja: "上壽" },
  { age: 108, name: "다수", hanja: "茶壽" },
  { age: 111, name: "황수", hanja: "皇壽" },
  { age: 120, name: "천수", hanja: "天壽" },
];
const schoolStages = [
  { offset: 4, label: "유치원" },
  { offset: 5, label: "유치원" },
  { offset: 6, label: "유치원" },
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

function parseDateParts(yearInput, monthInput, dayInput) {
  const year = parseNumber(yearInput);
  const enteredMonth = parseNumber(monthInput);
  const enteredDay = parseNumber(dayInput);

  if (!year) {
    return null;
  }

  const month = enteredMonth ?? 1;
  const day = enteredMonth ? enteredDay ?? 1 : 1;
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
  const start = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const end = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

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

function resetResult(message = "-") {
  elements.internationalAge.textContent = message;
  elements.yearAge.textContent = message;
  elements.koreanAge.textContent = message;
  elements.exactAge.textContent = message;
  elements.birthdayStatus.textContent = message;
  elements.daysLived.textContent = message;
  elements.monthsLived.textContent = message;
  elements.nextBirthday.textContent = message;
  elements.nextBirthdayDays.textContent = message;
  elements.birthSummary.textContent = message;
  elements.adultYear.textContent = message;
  elements.adultStatus.textContent = message;
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
    elements.milestones.append(createInfoRow(`${formatNumber(days)}일`, formatDate(date), detail, date < baseDate));
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

function renderAgeNames(birthYear, baseYear) {
  elements.ageNames.textContent = "";

  ageNameList.forEach((item) => {
    // These traditional labels are shown by Korean counted age.
    const year = birthYear + item.age - 1;
    const isPast = year < baseYear;
    elements.ageNames.append(createInfoRow(`${item.age}세`, `${item.name}(${item.hanja})`, `${year}년`, isPast));
  });
}

function renderSchoolYears(birthDate) {
  elements.schoolYears.textContent = "";
  const birthYear = birthDate.getFullYear();

  schoolStages.forEach((stage) => {
    const year = birthYear + stage.offset;
    const schoolStartDate = new Date(year, 2, 1);
    const internationalAge = getInternationalAge(birthDate, schoolStartDate);
    const koreanAge = stage.offset + 1;
    const ageText = `만 ${internationalAge}세 · 세는 나이 ${koreanAge}세`;
    elements.schoolYears.append(createInfoRow(`${year}년`, stage.label, ageText));
  });
}

function render() {
  const birthDate = parseDateParts(elements.birthYear, elements.birthMonth, elements.birthDay);
  const baseDate = parseDateParts(elements.baseYear, elements.baseMonth, elements.baseDay);

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

  elements.internationalAge.textContent = `${formatNumber(internationalAge)}세`;
  elements.yearAge.textContent = `${formatNumber(yearAge)}세`;
  elements.koreanAge.textContent = `${formatNumber(koreanAge)}세`;
  elements.exactAge.textContent = `${formatNumber(exactAge.years)}년 ${exactAge.months}개월 ${exactAge.days}일`;
  elements.birthdayStatus.textContent = hasBirthdayPassed(birthDate, baseDate)
    ? "올해 생일이 지났습니다."
    : "올해 생일 전입니다.";
  elements.daysLived.textContent = `${formatNumber(daysLived)}일`;
  elements.monthsLived.textContent = `/ ${formatNumber(monthsLived)}개월`;
  elements.nextBirthday.textContent = `다음 생일은 ${weekdays[nextBirthday.getDay()]}요일,`;
  elements.nextBirthdayDays.textContent = daysToNextBirthday === 0
    ? "오늘이 생일입니다."
    : `${formatNumber(daysToNextBirthday)}일 남았습니다.`;
  elements.birthSummary.textContent = `${birthDate.getFullYear()}년 ${getSexagenaryYear(birthDate.getFullYear())} ${getZodiac(birthDate.getFullYear())}띠 입니다.`;
  elements.adultYear.textContent = `${adultDate.getFullYear()}년 성년 입니다.`;
  elements.adultStatus.textContent = daysToAdult > 0
    ? `${formatNumber(daysToAdult)}일 남았습니다.`
    : `${formatNumber(Math.abs(daysToAdult))}일 지났습니다.`;

  renderMilestones(birthDate, baseDate);
  renderAgeNames(birthDate.getFullYear(), baseDate.getFullYear());
  renderSchoolYears(birthDate);
}

fillDateInputs("base", new Date());

[
  elements.birthYear,
  elements.birthMonth,
  elements.birthDay,
  elements.baseYear,
  elements.baseMonth,
  elements.baseDay,
].forEach((input) => {
  input.addEventListener("input", render);
});

render();
