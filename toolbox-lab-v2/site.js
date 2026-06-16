(() => {
  function padDatePart(value) {
    return String(value).padStart(2, "0");
  }

  function formatLocalDateTime(date) {
    const year = date.getFullYear();
    const month = padDatePart(date.getMonth() + 1);
    const day = padDatePart(date.getDate());
    const hours = padDatePart(date.getHours());
    const minutes = padDatePart(date.getMinutes());
    const seconds = padDatePart(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function updateSiteClock() {
    const clock = document.querySelector("[data-site-clock]");

    if (!clock) {
      return;
    }

    clock.textContent = formatLocalDateTime(new Date());
  }

  updateSiteClock();
  setInterval(updateSiteClock, 1000);
})();
