const flipWrap = document.querySelector('.flipWrap');
const resetBtn = document.querySelector('.resetBtn');
const hori = 4;
const verti = 4;
let clickflag = true;
let clickedCard = [];

function timeOut() {
    let cards = document.querySelectorAll('.card');
    for(let i=0; i<cards.length; i++){
        cards[i].classList.remove('flip');
    }
}

function checkSameImg() {
    if(clickedCard.length === 2){
        if(clickedCard[0].path[2].classList[1] === clickedCard[1].path[2].classList[1]){   
            setTimeout(function() {
                clickedCard[0].path[2].classList.add('done');
                clickedCard[1].path[2].classList.add('done');
                clickedCard[0].path[2].classList.remove('flip');
                clickedCard[1].path[2].classList.remove('flip');
                clickedCard = [];
            },500);
        }else{
            setTimeout(function() {
                clickflag = false;
                timeOut();
                clickflag = true;
                clickedCard = [];
            },700);
        }
    }  
}

function handleClickCard(card) { 
    card.path[2].classList.toggle('flip');
    clickedCard.push(card);
    checkSameImg();
}

function randomImg() {
    let imgArr = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
    let ranArr = [];
    while (imgArr.length > 0) {
        let img = imgArr.splice(Math.floor(Math.random()*imgArr.length),1)[0];
        ranArr.push(img);
    }
    return ranArr;
}

function paintCards(ranArr) {
    for (let index = 0; index < hori*verti; index++) {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card_inner');
        const divFront = document.createElement('div');
        divFront.classList.add('front');
        const divBack = document.createElement('div');
        divBack.classList.add('back');
        card.classList.add(`${ranArr[index]}`);
        const divImg = document.createElement('img');
        divImg.src =  `img/${ranArr[index]}.jpg`;
        
        cardInner.appendChild(divFront);
        cardInner.appendChild(divBack);
        divBack.appendChild(divImg);
        card.appendChild(cardInner);
        flipWrap.appendChild(card);

        card.addEventListener('click', handleClickCard, true); 
    }    
}

resetBtn.addEventListener('click',reStartBtn);
function reStartBtn() {
    flipWrap.innerHTML = '';
    clickedCard = [];
    let randomArr = randomImg();
    paintCards(randomArr);
}

function init() {
    let randomArr = randomImg();
    paintCards(randomArr);
}
init();


