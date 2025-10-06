
document.addEventListener("DOMContentLoaded", function() {
    const logo = document.getElementById("logo");

    const duration = 2000;      // 4 Sekunden
    const totalRotation = 360;  // 2 volle Umdrehungen
    let animating = false;      // verhindert Doppelstarts

    // Sanfte Beschleunigungs-/Abbremskurve
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function rotateOnce() {
      if (animating) return; // wenn schon läuft → nichts tun
      animating = true;

      let start = null;

      function animate(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);

        const angle = totalRotation * eased;
        logo.style.transform = `rotate(${angle}deg)`;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          animating = false; // nach Ende wieder freigeben
        }
      }

      requestAnimationFrame(animate);
    }


    

    if (logo) {
        logo.addEventListener("click", () => {
            rotateOnce();
        });
    }
});    