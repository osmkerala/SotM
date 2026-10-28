document.addEventListener("DOMContentLoaded", function () {
  var EVENT_URL = "https://kerala.stateofthemap.in";

  var shortText = "State of the Map Kerala 2026 is happening 14–15 Nov in Kottayam! Join mappers, GIS folks and the open-data community. Register: " + EVENT_URL + " #OpenStreetMap #SotMKerala";

  var longText = "State of the Map Kerala 2026 is happening on 14–15 November in Kottayam, Kerala! Join mappers, GIS professionals and the open-data community for two days of talks, workshops and mapping. Registration is open: " + EVENT_URL + "\n\n#OpenStreetMap #SotMKerala #FOSS";

  var emailSubject = "State of the Map Kerala 2026 — Registration is open";
  var emailBody = "Hi,\n\nState of the Map Kerala 2026 is happening on 14–15 November in Kottayam, Kerala. It brings together mappers, GIS professionals and the open-data community from across Kerala.\n\nRegistration is open: " + EVENT_URL + "\n\nHope to see you there!";

  var toggle = document.getElementById("shareToggle");
  var panel = document.getElementById("sharePanel");
  if (!toggle || !panel) return;

  function closePanel() {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }
  function openPanel() {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    if (panel.hidden) { openPanel(); } else { closePanel(); }
  });

  document.addEventListener("click", function (e) {
    if (!panel.hidden && !panel.contains(e.target) && e.target !== toggle) {
      closePanel();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePanel();
  });

  var shareX = document.getElementById("shareX");
  if (shareX) {
    shareX.href = "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent("State of the Map Kerala 2026 is happening 14–15 Nov in Kottayam! Join mappers, GIS folks and the open-data community.") +
      "&url=" + encodeURIComponent(EVENT_URL) +
      "&hashtags=OpenStreetMap,SotMKerala";
  }

  var shareTelegram = document.getElementById("shareTelegram");
  if (shareTelegram) {
    shareTelegram.href = "https://t.me/share/url?url=" + encodeURIComponent(EVENT_URL) +
      "&text=" + encodeURIComponent("📍 State of the Map Kerala 2026 is happening 14–15 Nov in Kottayam! Join Kerala's mappers, GIS professionals and open-data community.");
  }

  var shareEmail = document.getElementById("shareEmail");
  if (shareEmail) {
    shareEmail.href = "mailto:?subject=" + encodeURIComponent(emailSubject) + "&body=" + encodeURIComponent(emailBody);
  }

  var shareMastodon = document.getElementById("shareMastodon");
  if (shareMastodon) {
    shareMastodon.addEventListener("click", function () {
      var instance = window.prompt("Which Mastodon instance are you on? (e.g. mastodon.social)", "mastodon.social");
      if (!instance) return;
      instance = instance.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
      if (!instance) return;
      var text = "State of the Map Kerala 2026 is happening 14–15 November in Kottayam, Kerala! Join mappers, GIS professionals and the open-data community. Register: " + EVENT_URL + " #OpenStreetMap #SotMKerala #FOSS";
      window.open("https://" + instance + "/share?text=" + encodeURIComponent(text), "_blank", "noopener");
      closePanel();
    });
  }

  var shareLinkedIn = document.getElementById("shareLinkedIn");
  if (shareLinkedIn) {
    shareLinkedIn.addEventListener("click", function () {
      var caption = "State of the Map Kerala 2026 is happening on 14–15 November in Kottayam, Kerala — a great opportunity to connect with the geospatial, GIS and open-data community. Registration is open: " + EVENT_URL;
      copyText(caption, shareLinkedIn, "Caption copied — opening LinkedIn…");
      window.open("https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(EVENT_URL), "_blank", "noopener");
      setTimeout(closePanel, 400);
    });
  }

  var copyShort = document.getElementById("copyShort");
  if (copyShort) {
    copyShort.addEventListener("click", function () {
      copyText(shortText, copyShort, "Copied!");
    });
  }
  var copyLong = document.getElementById("copyLong");
  if (copyLong) {
    copyLong.addEventListener("click", function () {
      copyText(longText, copyLong, "Copied!");
    });
  }

  function copyText(text, btn, feedback) {
    function showFeedback() {
      var original = btn.textContent;
      btn.textContent = feedback;
      setTimeout(function () { btn.textContent = original; }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showFeedback, function () {
        fallbackCopy(text);
        showFeedback();
      });
    } else {
      fallbackCopy(text);
      showFeedback();
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }
});
