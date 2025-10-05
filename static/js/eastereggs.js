
document.addEventListener("DOMContentLoaded", function() {
    var logo = document.getElementById("logo");
    let clickCount = 0;

    if (logo) {
        logo.addEventListener("click", () => {
            clickCount++;
            if (clickCount === 5) {
                clickCount = 0; // Reset count after triggering the Easter egg
                window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            }
        });
    }
});

