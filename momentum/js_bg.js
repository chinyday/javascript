

const body = document.querySelector('body');
const IMG_NUMBER = 5;

function paintImg(imgNum) {
    const image = new Image();
    image.src = `img/img${imgNum+1}.jpg`;
    image.classList.add('bg_img');
    body.appendChild(image);    
}
function randomImg() {    
    const bgImg = Math.floor(Math.random() * IMG_NUMBER);
    return bgImg;
}
function init() {    
    const randomNumber =  randomImg();
    paintImg(randomNumber);
}
init();