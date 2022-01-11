const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("colors");
const range = document.querySelector("#rangeBrush");
const mode = document.querySelector("#fillMode");
const saveBtn = document.querySelector("#saveBtn");
const resetBtn = document.querySelector("#reBtn")

const INITIAL_COLOR = "#000000";

const CANVAS_SIZE = 400;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let reset= false;

function stopPainting(){
  painting = false;
}
function startPainting(){
  painting = true;
}
function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  else{
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function handleCM(event){
  event.preventDefault();
} 

function handleColorClick(event){
  const chooseColor = event.target;
  const color = chooseColor.style.backgroundColor;
  Array.from(colors).forEach( col => {col.classList.remove("selete")});
  chooseColor.classList.add("selete");
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}
function handleModeClick(){
  if(filling === true){
    filling = false;
    mode.innerText = "Fill";
  }
  else {
    filling = true;
    mode.innerText = "Paint";
  }
}
function handleSaveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "Paint";
  link.click();
}

function handleResetClick(){
  ctx.fillStyle = `#ffffff`;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.beginPath();
}

if(mode) {
  mode.addEventListener("click", handleModeClick);
}
if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}
if(range){
  range.addEventListener("input", handleRangeChange);
}
if(resetBtn) {
  resetBtn.addEventListener("click", handleResetClick);
}
Array.from(colors).forEach(color => {
  color.addEventListener("click", handleColorClick);
})

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting); // 마우스 클릭 O
  canvas.addEventListener("mouseup", stopPainting); // 마우스 클릭 X
  canvas.addEventListener("mouseleave", stopPainting); // canvas 영역에서 벗어남
  canvas.addEventListener("contextmenu", handleCM); // 마우스 오른쪽 클릭
  canvas.addEventListener("click", handleCanvasClick);
}