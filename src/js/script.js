"use strict"

const figure = $(".figure");
const input = $(".input");
const select = $(".select");
const DELAY = 100;

function transform(width, height, radius) {
  figure.fadeOut(DELAY);
  setTimeout (() => {
    figure.width(`${width}px`);
    figure.height(`${height}px`);
    figure.css("border-radius", `${radius}%`);
  }, DELAY);
  figure.fadeIn(DELAY);
} 

function changeBackground(color) {
  figure.fadeOut(DELAY);
  setTimeout (() => {
    figure.css("background-color", color);
  }, DELAY);
  figure.fadeIn(DELAY);
} 

input.change(() => {
  changeBackground(input.val());
});

select.change(() => {
  switch (select.val()) {
    case "square": {
      transform(300, 300, 0);
      break;
    }
    case "rect": {
      transform(200, 300, 0);
      break;
    }
    default: {
      transform(300, 300, 50);
      break;
    }
  }
});