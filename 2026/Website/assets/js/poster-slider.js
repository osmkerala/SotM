document.addEventListener("DOMContentLoaded", function () {
  var sliders = document.querySelectorAll(".poster-slider");
  if (!sliders.length) return;

  function itemsPerView(mode) {
    if (mode !== "row") return 1;
    var w = window.innerWidth;
    if (w >= 860) return 4;
    if (w >= 640) return 2;
    return 1;
  }

  function initSlider(slider, files) {
    var folder = (slider.getAttribute("data-folder") || "SessionPosters").replace(/\/$/, "");
    var mode = slider.getAttribute("data-mode") || "single";
    var interval = parseInt(slider.getAttribute("data-interval"), 10) || 4000;
    var track = slider.querySelector(".poster-track");
    var prevBtn = slider.querySelector(".poster-arrow-prev");
    var nextBtn = slider.querySelector(".poster-arrow-next");
    var index = 0;
    var timer = null;

    files.forEach(function (name) {
      var slide = document.createElement("div");
      slide.className = "poster-slide";
      var img = document.createElement("img");
      img.src = folder + "/" + encodeURIComponent(name);
      img.alt = "Session poster";
      img.loading = "lazy";
      slide.appendChild(img);
      track.appendChild(slide);
    });

    function clampIndex(items) {
      var maxIndex = Math.max(files.length - items, 0);
      if (mode === "row") {
        if (index > maxIndex) index = 0;
        if (index < 0) index = maxIndex;
      } else {
        if (index >= files.length) index = 0;
        if (index < 0) index = files.length - 1;
      }
    }

    function render() {
      var items = itemsPerView(mode);
      track.style.setProperty("--items", items);
      clampIndex(items);
      var pct = (100 / items) * index;
      track.style.transform = "translateX(-" + pct + "%)";
    }

    function restartTimer() {
      if (timer) clearInterval(timer);
      if (files.length > itemsPerView(mode)) {
        timer = setInterval(function () {
          index += 1;
          render();
        }, interval);
      }
    }

    function go(delta) {
      index += delta;
      render();
      restartTimer();
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { go(1); });
    if (files.length <= itemsPerView(mode)) {
      if (prevBtn) prevBtn.hidden = true;
      if (nextBtn) nextBtn.hidden = true;
    }

    slider.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
    slider.addEventListener("mouseleave", restartTimer);

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(render, 150);
    });

    slider.hidden = false;
    render();
    restartTimer();
  }

  sliders.forEach(function (slider) {
    var manifestUrl = slider.getAttribute("data-manifest") || "SessionPosters/manifest.json";
    fetch(manifestUrl, { cache: "no-store" })
      .then(function (res) { return res.ok ? res.json() : []; })
      .then(function (files) {
        if (Array.isArray(files) && files.length) {
          initSlider(slider, files);
        }
      })
      .catch(function () { /* manifest missing or unreachable: leave slider hidden */ });
  });
});
