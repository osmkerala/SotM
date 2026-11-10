document.addEventListener("DOMContentLoaded", function () {
  var tabs = document.querySelectorAll(".reach-tab");
  if (!tabs.length) return;

  var panels = document.querySelectorAll(".reach-panel-body");

  function activate(tab) {
    tabs.forEach(function (t) {
      var isActive = t === tab;
      t.classList.toggle("is-active", isActive);
      t.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    panels.forEach(function (panel) {
      var isActive = panel.id === tab.getAttribute("data-target");
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      activate(tab);
    });
  });
});
