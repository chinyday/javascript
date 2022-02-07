let canvas = document.getElementById('jsCanvas');
let ctx = canvas.getContext('2d');
let colors = document.getElementsByClassName('color_btn');
let range = document.getElementById('jsRange');
let btn_wrap = document.querySelector('.btn_wrap');

ctx.width = 600;
ctx.height = 600;
ctx.fillStyle = "#fff";
ctx.strokeStyle = "#2d3436";
ctx.fillStyle = "#2d3436";
ctx.lineWidth = 2.5;
ctx.fillRect(0, 0, ctx.width, ctx.height);

let controll = {
	painting : false,
	filling : false
}

function startPainting() {
	controll.painting = true;
}

function stopPainting() {
	controll.painting = false;
}

function onMouseMove(event) {
	let x = event.offsetX;
	let y = event.offsetY;

	if (!controll.painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function handleFillClick(event) {
	if (controll.filling === true) {
		controll.filling = false;
		event.innerText = "fill";
	} else {
		controll.filling = true;
		event.innerText = "paint";
	}
}

function handleSaveImg() {
	let image = canvas.toDataURL('image/png');
	let link = document.createElement('a');
	link.href = image;
	link.download = 'image';
	link.click();
}

function handleCanvasClick() {
	if (controll.filling) {
		ctx.fillRect(0, 0, ctx.width, ctx.height);
	}
}

if (canvas) {
	canvas.addEventListener('mousemove', onMouseMove);
	canvas.addEventListener('mouseup', stopPainting);
	canvas.addEventListener('mousedown', startPainting);
	canvas.addEventListener('mouseleave', stopPainting);
	canvas.addEventListener('click', handleCanvasClick);
	canvas.addEventListener('contextmenu', event => event.preventDefault() );
}

Array.from(colors).forEach(function (color) {
	color.addEventListener('click', (event) => {
		ctx.strokeStyle = event.target.style.backgroundColor;
		ctx.fillStyle = event.target.style.backgroundColor;
	});
});

range.addEventListener('input', (event) => {
	range.setAttribute('value', event.target.value);
	ctx.lineWidth = event.target.value;
});

btn_wrap.addEventListener('click', (event) => {
	let target = event.target;

	if(target.id === "jsFill"){
		handleFillClick(target);
	}else if(target.id === "jsSave"){
		handleSaveImg();
	}
});
