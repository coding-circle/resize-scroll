window.addEventListener('load', main);

function main() {
  window.addEventListener('scroll', handleScrollFramerate);

  updateScrollPosition();
  updateInfoBackground();

  window.addEventListener('resize', handleResizeFramerate);

  updateWindowDimensions();
  updateWindowBackground();

  var scrollUpButton = document.getElementById('scroll-up');
  scrollUpButton.addEventListener('click', scrollToStart);

  var scrollDownButton = document.getElementById('scroll-down');
  scrollDownButton.addEventListener('click', scrollToEnd);
}

////////////////////////////////////////////////////////////////////////////////
// Scroll
function handleScrollFramerate() {
  window.requestAnimationFrame(onScroll);
}

function onScroll() {
  updateScrollPosition();
  updateInfoBackground();
}

function updateScrollPosition() {
  var offset = document.getElementById('offset');
  offset.textContent = window.scrollY;
} 

function updateInfoBackground() {
  var bodyHeight = document.body.clientHeight;
  var scrollPercentage = window.scrollY / bodyHeight;
  var info = document.getElementById('info');
  info.style.background = `hsl(${parseInt(360 * scrollPercentage)}, 100%, 50%)`;
}

////////////////////////////////////////////////////////////////////////////////
// Resize
function handleResizeFramerate() {
  window.requestAnimationFrame(onResize);
}

function onResize() {
  updateWindowDimensions();
  updateWindowBackground();
}

function updateWindowDimensions() {
  var width = document.getElementById('width');
  var height = document.getElementById('height');
  width.textContent = window.innerWidth;
  height.textContent = window.innerHeight;
} 

function updateWindowBackground() {
  document.body.style.backgroundSize = `${window.innerWidth / 10}px`;
}

////////////////////////////////////////////////////////////////////////////////
// Click
function scrollToStart() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

function scrollToEnd() {
  var bodyHeight = document.body.clientHeight;
  window.scroll({
    top: bodyHeight - window.innerHeight,
    left: 0,
    behavior: 'smooth'
  });
}
