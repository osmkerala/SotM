document.addEventListener("DOMContentLoaded", function () {
  var el = document.getElementById("venue-map");
  if (!el) return;

  var venueLngLat = [76.534364, 9.658120]; // MapLibre takes [lng, lat]

  // Loaded as an ES module via dynamic import so this file can stay a
  // plain classic script like the rest of the site's JS, and so this
  // still works when the page is opened directly (file://) for testing.
  import("https://unpkg.com/maplibre-gl@6.16.0/dist/maplibre-gl.mjs")
    .then(function (maplibregl) {
      var map = new maplibregl.Map({
        container: el,
        style: "https://tiles.openfreemap.org/styles/positron",
        center: venueLngLat,
        zoom: 16,
        scrollZoom: false,
        attributionControl: { compact: true },
      });

      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

      new maplibregl.Marker({ color: "#c0392b" })
        .setLngLat(venueLngLat)
        .setPopup(
          new maplibregl.Popup({ offset: 24, focusAfterOpen: false }).setHTML(
            "Dr. R. Satheesh Centre for Remote Sensing and GIS<br>School of Environmental Sciences, Mahatma Gandhi University<br>Athirampuzha, Kottayam, Kerala"
          )
        )
        // focusAfterOpen is disabled above: MapLibre's default popup
        // behaviour calls .focus() on the popup's close button when it
        // opens, and browsers scroll a newly-focused element into view.
        // Since this popup auto-opens on page load (togglePopup below),
        // that was forcing the whole page to jump down to the venue map
        // on every load.
        .addTo(map)
        .togglePopup();

      // Re-enable scroll-to-zoom once the visitor has clicked into the
      // map, so the page can still be scrolled normally over it otherwise.
      el.addEventListener(
        "click",
        function () {
          map.scrollZoom.enable();
        },
        { once: true }
      );
    })
    .catch(function () {
      // CDN import failed (offline, blocked, etc.) — leave the section
      // as a plain placeholder rather than throwing.
      el.setAttribute("aria-label", el.getAttribute("aria-label") + " (map failed to load)");
    });
});
