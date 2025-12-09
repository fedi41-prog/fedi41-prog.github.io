document.addEventListener("DOMContentLoaded", function() {
  const logo = document.getElementById("logo");

  let rotation = 0;
  let speed = 0;
  let accelerating = false;
  let animating = false;
  let holdStart = null;
  let easterEggTriggered = false;

  // Smooth easing, optional für Auslaufen
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function triggerEasterEgg() {
    console.log("🎉 Easter Egg!");
    // hier kannst du dein Easter Egg einbauen
    // z.B.:
    // alert("Secret unlocked!");
  }

  function animate() {
    if (!animating) return;
    rotation += speed;
    logo.style.transform = `rotate(${rotation}deg)`;
    requestAnimationFrame(animate);
  }

  function startSpin() {
    if (animating) return;
    animating = true;
    requestAnimationFrame(animate);
  }

  function stopSpin() {
    // sanft abbremsen
    const initialSpeed = speed;
    const duration = 1000;
    const start = performance.now();

    function decelerate(timestamp) {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = easeOutCubic(progress);
      speed = initialSpeed * (1 - eased);
      rotation += speed;
      logo.style.transform = `rotate(${rotation}deg)`;

      if (progress < 1) {
        requestAnimationFrame(decelerate);
      } else {
        animating = false;
        speed = 0;
      }
    }

    requestAnimationFrame(decelerate);
  }

  if (logo) {
    logo.addEventListener("mousedown", () => {
      accelerating = true;
      holdStart = performance.now();
      easterEggTriggered = false;

      // Beschleunigungsschleife
      function accelerateLoop() {
        if (!accelerating) return;
        if (!animating) startSpin();

        // Geschwindigkeitszuwachs mit Limit
        speed = Math.min(speed + 0.06, 30);

        // Prüfen auf Easter Egg
        const heldFor = performance.now() - holdStart;
        if (heldFor >= 1000 && !easterEggTriggered) {
          easterEggTriggered = true;
          triggerEasterEgg();
        }

        requestAnimationFrame(accelerateLoop);
      }

      accelerateLoop();
    });

    logo.addEventListener("mouseup", () => {
      accelerating = false;
      stopSpin();
    });

    logo.addEventListener("mouseleave", () => {
      // Falls man die Maus rausbewegt, abbremsen
      if (accelerating) {
        accelerating = false;
        stopSpin();
      }
    });
  }
});
