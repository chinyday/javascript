const canvas = document.getElementById('jsCanvas');
const ctx =  canvas.getContext('2d');
let colors = document.getElementsByClassName('color_btn');
let range = document.getElementById('jsRange');
let fill = document.getElementById('jsFill');
let saveBtn = document.getElementById('jsSave');

ctx.width = 600;
ctx.height = 600;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, ctx.width, ctx.height); 

ctx.strokeStyle = "#2d3436";
ctx.fillStyle = "#2d3436";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;                    

function onMouseMove(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting(event) {
    painting = true;
}

function stopPainting(event) {
    painting = false;
}

function handleChangeColor(event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
}

function handleChangeRange(event) {
    range.setAttribute('value', event.target.value);
    ctx.lineWidth = event.target.value;
}

function handleFillClick() {
    if(filling === true){
        filling = false;
        fill.innerText = "fill";
    }else{
        filling = true;
        fill.innerText = "paint";
    }
}

function handleCanvasClick() {
    if(filling){
        ctx.fillRect(0, 0, ctx.width, ctx.height); 
    }
}

function handleClickCM(event) {
    event.preventDefault();
}

function handleSaveImg() {
    let image = canvas.toDataURL('image/png');
    let link = document.createElement('a');

    link.href = image;
    link.download = 'image';
    link.click();
}

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleClickCM);
}
 
Array.from(colors).forEach(function(color) {
    color.addEventListener('click', handleChangeColor);
});

if(range){
    range.addEventListener('input', handleChangeRange);
}
if(fill){
    fill.addEventListener('click', handleFillClick);
}
if(saveBtn){
    saveBtn.addEventListener('click', handleSaveImg);
}