document.addEventListener("DOMContentLoaded", function () {
  var el = document.getElementById("venue-map");
  if (!el || typeof L === "undefined") return;

  var venue = [9.658120, 76.534364];

  var map = L.map(el, {
    scrollWheelZoom: false,
  }).setView(venue, 17);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(venue)
    .addTo(map)
    .bindPopup("Dr. R. Satheesh Centre for Remote Sensing and GIS<br>Mahatma Gandhi University, Athirampuzha, Kottayam")
    .openPopup();

  // Re-enable scroll-to-zoom once the visitor has clicked into the map,
  // so the page can still be scrolled normally over it otherwise.
  map.on("click", function () {
    map.scrollWheelZoom.enable();
  });
});
