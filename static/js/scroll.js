const downIndicator = document.getElementById('scroll-down-indicator');

var lastScrollTop = 0;

window.addEventListener('scroll', () => {
  downIndicator.style.opacity = 1 - window.scrollY / 200;
});