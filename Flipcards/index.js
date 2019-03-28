

const flipWrap = document.querySelector('.flipWrap');

const hori = 4;
const verti = 4;
const imgArr = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg'];
let ranArr = [];


function handleClickCard(card) {
    
    const thisCard = card.path[2];
   
    if (thisCard.classList.contains('flip')) {
        thisCard.classList.remove('flip');
    }else{
        thisCard.classList.add('flip');
    }
}

// 이미지 랜덤으로 섞기 
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
        divBack.style.backgroundImage = `url(img/${ranArr[index]})` ;

        cardInner.appendChild(divFront);
        cardInner.appendChild(divBack);
        card.appendChild(cardInner);
        flipWrap.appendChild(card);

        card.addEventListener('click', handleClickCard,true); 
    }    
}






function init() {
    paintCards(hori,verti);
    // gameStart();
}
init();