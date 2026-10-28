document.addEventListener("DOMContentLoaded", function () {
  var el = document.getElementById("countdown");
  if (!el) return;

  // 14 Nov 2026, 9:30 AM IST (UTC+5:30) — a fixed instant, correct for every visitor regardless of their own timezone.
  var EVENT_START = new Date("2026-11-14T09:30:00+05:30").getTime();

  var daysEl = document.getElementById("cdDays");
  var hoursEl = document.getElementById("cdHours");
  var minsEl = document.getElementById("cdMinutes");
  var secsEl = document.getElementById("cdSeconds");

  function pad(n) {
    n = String(n);
    return n.length < 2 ? "0" + n : n;
  }

  var timer;

  function tick() {
    var diff = EVENT_START - Date.now();

    if (diff <= 0) {
      el.innerHTML = '<p class="countdown-done">State of the Map Kerala 2026 is happening now!</p>';
      clearInterval(timer);
      return;
    }

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    if (daysEl) daysEl.textContent = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minsEl) minsEl.textContent = pad(minutes);
    if (secsEl) secsEl.textContent = pad(seconds);
  }

  tick();
  timer = setInterval(tick, 1000);
});
