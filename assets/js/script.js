// select elements on the page
const canvas = document.querySelector("#etch-a-sketch");

const ctx = canvas.getContext("2d");
const shake = document.querySelector(".shake");
const moveAmount = 10;
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`

// set up canvas for drawing
const {
  width,
  height
} = canvas;
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * width);
ctx.linejoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 10;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();
// write draw function
const draw = ({
  key
}) => {
  hue += 10;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`

  ctx.beginPath();
  ctx.moveTo(x, y);
  switch (key) {
    default:
      break;
    case "ArrowUp":
      y -= moveAmount;
      break;
    case "ArrowDown":
      y += moveAmount;
      break;
    case "ArrowLeft":
      x -= moveAmount;
      break;
    case "ArrowRight":
      x += moveAmount;
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();

}
// write handler for arrow keys
const handleKey = (event) => {
  if (event.key.includes("Arrow")) {
    event.preventDefault();
    draw({
      key: event.key
    });
  }
}
// clear shake function
const clearCanvas = () => {
  canvas.classList.add("shake");
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener("animationend", () => {
    canvas.classList.remove("shake");
  }, {once: true});
}

shake.addEventListener("click", clearCanvas)

// listen for arrow keys
window.addEventListener("keydown", handleKey);