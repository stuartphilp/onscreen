var OnScreen = (function() {

  function OnScreen() {}

  OnScreen.prototype.trackElementById = function(id) {
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
      hidden = "mozHidden";
      visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }
    elementVisible = false;
    hasFocus = true;
    function handleVisibilityChange() {
      if (document[hidden]) {
        hasFocus = false;
      } else {
        hasFocus = true;
      }
      checkElementVisible()
    }
    function blurHandler() {
      hasFocus = false;
      checkElementVisible();
    }
    function focusHandler() {
      hasFocus = true;
      checkElementVisible();
    }
    window.onblur = blurHandler;
    window.onfocus = focusHandler;
    function handleScrollChange() {
      checkElementVisible();
    }
    function checkElementVisible() {
      el = document.getElementById(id);
      if (((el.offsetTop - window.innerHeight) > window.scrollY) ||
        ((el.offsetTop + el.offsetHeight) < window.scrollY) ||
        ((el.offsetLeft - window.innerWidth) > window.scrollX) ||
        ((el.offsetLeft + el.offsetWidth) < window.scrollX))
      {
        elementVisible = false;
      } else {
        elementVisible = true;
      }
      if (!hasFocus || document[hidden]) {
        elementVisible = false;
      }
      return elementVisible;
    }
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
    document.addEventListener("scroll", handleScrollChange, false);
    window.onload = function() {
      checkElementVisible();
    }
    window.onresize = function() {
      checkElementVisible();
    }
  };
  return OnScreen;
})();
