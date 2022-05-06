let dragItem = document.querySelector(".drag-joystick");
let container = document.querySelector(".container-joystick");
let board = document.querySelector(".sketch-board");
let resetButton = document.querySelector("#resetButton");

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;
let color = 'rgb(255,0,0)';
let size = 2;
let dotX = 0;
let dotY = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);


function dragStart(e) {
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  if (e.target === dragItem) {
    active = true;
  }
}

function dragEnd(e) {
  xOffset = 0;
  yOffset = 0;

  initialX = 0;
  initialY = 0;

  setTranslate(0,0, dragItem);
  active = false;
}

function drag(e) {
  if (active) {
    e.preventDefault();
   
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset, dotX = currentX;
    yOffset, dotY = currentY;
    


    makeADot(currentX,currentY,color,size);
    setTranslate(currentX, currentY, dragItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function makeADot(x,y,color,size) {
  let dot = document.createElement('div');
  dot.classList.add('dot');
  dot.style.backgroundColor = color;
  dot.style.height = `${size}px`;
  dot.style.width = `${size}px`;
  setTranslate(x,y,dot);
  board.appendChild(dot);
  ///setTranslate(0,0,dot);
}

resetButton.onclick = () => {
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
};