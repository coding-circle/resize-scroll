////////////////////////////////////////////////////////////////////////////////
// Setup
/* 
   when the window fires a 'load' event (meaning all assets have finished 
   parsing/loading), run my 'main' function below.
 */
window.addEventListener('load', main);

/*  
   I've set up all functionality that specifically has to happen 
   after the page is loaded to go here. 
 */
function main() {
  /* when window hears a 'scroll', run 'handleScrollFramerate' */
  window.addEventListener('scroll', handleScrollFramerate);
  /* run my onScroll() method once on load to set up our dynamic styles/content */
  onScroll();

  /* 
     tell window to run 'handleScrollFramerate' when it hears a 'resize'
     - when the browser window changes shape (also affected by opening dev tools)
   */
  window.addEventListener('resize', handleResizeFramerate);
  /* run my onResize() method once on load to set up our dynamic styles/content */
  onResize();

  /* select the button with the up-arrow emoji by its id */
  var scrollUpButton = document.getElementById('scroll-up');
  /* tell that selected button to run 'scrollToStart' when it hears a 'click' */
  scrollUpButton.addEventListener('click', scrollToStart);

  /* select the button with the down-arrow emoji by its id */
  var scrollDownButton = document.getElementById('scroll-down');
  /* tell that selected button to run 'scrollToEnd' when it hears a 'click' */
  scrollDownButton.addEventListener('click', scrollToEnd);
}

////////////////////////////////////////////////////////////////////////////////
// Scroll
/* 
   this runs when window hears a 'scroll'. Instead of window directly calling
   'onScroll' to update the DOM, it wraps the call to onScroll in this
   'window.requestAnimationFrame(<function name>)' function.

   This ensures that any calls to my 'onScroll' method don't happen any faster 
   than 60 frames per second -- scrolls and resizes can trigger a lot of events 
   in a short span of time, and can cause display lag/redraw issues if your page
   is complex and/or too many events are firing at once.
 */
function handleScrollFramerate() {
  window.requestAnimationFrame(onScroll);
}

/* 
   onScroll just triggers two smaller functions: one to update the scroll
   position displayed in #info, and one to update the background color of #info
 */
function onScroll() {
  updateScrollPosition();
  updateInfoBackground();
}

function updateScrollPosition() {
  /* find the span element with id="offset" */
  var offset = document.getElementById('offset');
  /* insert current vertical scroll distance into that span as text */
  offset.textContent = window.scrollY;
} 

function updateInfoBackground() {
  /* 
     define a value that means 'the height of the entire document, 
     minus one screenful' 
   */
  var bodyHeight = document.body.clientHeight - window.innerHeight;
  /* 
     define a value that means 'the percentage of progress through bodyHeight'
  */
  var scrollPercentage = window.scrollY / bodyHeight;
  /* find the #info div */
  var info = document.getElementById('info');
  /* 
     change the background color CSS of #info with javascript, by accessing the
     'style' attribute of #info. this creates an 'inline style' visible on #info
     
     the 'hsl(<0-360>, <0-100%>, <0-100%>)' CSS function is a different
     color model, 'Hue, Saturation, Lightness'

     - the first value is like a radial position on a color wheel, 
     so 0 == 360 == red.
     
     - the second value is for saturation
     - the third value is for 'lightness' -- setting it to 50% means 'not dark,
     not light'. 100% would be white, 0% would be black

   */
  info.style.background = `hsl(${parseInt(360 * scrollPercentage)}, 100%, 50%)`;
}

////////////////////////////////////////////////////////////////////////////////
// Resize
/* 
   this follows the same pattern as the handleScrollFramerate and 
   onScroll functions above 
*/
function handleResizeFramerate() {
  window.requestAnimationFrame(onResize);
}

function onResize() {
  updateWindowDimensions();
  updateWindowBackground();
}

function updateWindowDimensions() {
  /* select span element with id="width" */
  var width = document.getElementById('width');
  /* select span element with id="height" */
  var height = document.getElementById('height');
  
  /* add the value of window's current width into #width as text */
  width.textContent = window.innerWidth;
  /* add the value of window's current height into #height as text */
  height.textContent = window.innerHeight;
} 

function updateWindowBackground() {
  /* scale the 'background-size' CSS with javascript */
  document.body.style.backgroundSize = `${window.innerWidth / 10}px`;
}

////////////////////////////////////////////////////////////////////////////////
// Click
function scrollToStart() {
  /* window.scroll() accepts an object parameter with these three keys:
     - 'top' is new vertical scroll position
     - 'left' is new horizontal scroll position
     - 'behavior' is either 'auto' or 'smooth' -- instant or smoothly animated
     
     scrolls to the beginning.
   */
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

function scrollToEnd() {
  /* 
     scrolls to the end -- precisely to the point where the top edge of your
     browser window is one screenful away from the bottom of the entire page.
     
     if you scroll farther than the end, it will just stop, so you could set
     this to '10000000'. I'm just being accurate again since I needed to be
     for the scroll/colorwheel effect to have a perfect loop :)
   */
  var bodyHeight = document.body.clientHeight - window.innerHeight;
  window.scroll({
    top: bodyHeight,
    left: 0,
    behavior: 'smooth'
  });
}
