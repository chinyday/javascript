const flipWrap = document.querySelector('.flipWrap');
const resetBtn = document.querySelector('.resetBtn');
const hori = 4;
const verti = 4;
const imgArr = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
let ranArr = [];
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
            },1000);
        }else{
            setTimeout(function() {
                clickflag = false;
                timeOut();
                clickflag = true;
                clickedCard = [];
            },500);
        }
    }
    
}

function handleClickCard(card) { 
    card.path[2].classList.toggle('flip');
    clickedCard.push(card);
    checkSameImg();
}

function randomImg() {
    while (imgArr.length > 0) {
        let img = imgArr.splice(Math.floor(Math.random()*imgArr.length),1)[0];
        ranArr.push(img);
    }
}

function paintCards(hori, verti) {
    randomImg();
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

        card.addEventListener('click', handleClickCard,true); 
    }    
}

// function reStartBtn() {
//     init();
// }

// resetBtn.addEventListener('click',reStartBtn);
function init() {
    paintCards(hori,verti);
}
init();


