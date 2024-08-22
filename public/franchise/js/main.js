"use strict";
"use strict";

var clickBurger = document.querySelectorAll(".btn-discuss");
var dropMenuOverlay = document.querySelector(".modal-overlay");
var dropMenu = document.querySelectorAll(".modal");
var dropMenuClose = document.querySelectorAll(".modal__close");

if (clickBurger) {
  clickBurger.forEach(function (el) {
    el.addEventListener("click", function (e) {
      var burger = e.currentTarget.getAttribute("data-btn");
      dropMenu.forEach(function (el) {
        el.classList.remove("modal--visible");
      });
      document.querySelector('[data-btn-modal="'.concat(burger, '"]')).classList.add("modal--visible");
      dropMenuOverlay.classList.add("modal-overlay--visible");
      document.body.classList.add("body-hidden");
    });
  });
}

if (dropMenuOverlay) {
  dropMenuOverlay.addEventListener("click", function (e) {
    if (e.target == dropMenuOverlay) {
      dropMenuOverlay.classList.remove("modal-overlay--visible");
      dropMenu.forEach(function (el) {
        el.classList.remove("modal--visible");
        document.body.classList.remove("body-hidden");
      });
    }
  });
}

if (dropMenuClose) {
  dropMenuClose.forEach(function (el) {
    el.addEventListener("click", function (e) {
      dropMenuOverlay.classList.remove("modal-overlay--visible");
      dropMenu.forEach(function (el) {
        el.classList.remove("modal--visible");
        document.body.classList.remove("body-hidden");
      });
    });
  });
}
//# sourceMappingURL=main.js.map
