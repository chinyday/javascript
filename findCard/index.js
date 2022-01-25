const GAME_MINIMUM_COUNT = 2;  // 1개면 맞출게 없기 때문에 최소 2개 이상의 카드를 선택해야지 게임이 진행되도록 초기 설정
let clickedCards = [];

let startBtn = document.querySelector(".gameStart");
let reloadBtn = document.querySelector(".gameReload");

let clickedCardControl = {
    
    getGameCnt : 0,
    clickedCnt : 0,
    completeCnt : 0,

    increaseCompleteCnt : function (cnt) {
        this.completeCnt = cnt+1;
        clickedCardControl.isCompleted();
        return this.completeCnt;
    },
    increaseClickedCnt : function (cnt) {
        this.clickedCnt = cnt+1;
        return this.clickedCnt;
    },
    isCompleted : function (){
        console.log(this.completeCnt, this.getGameCnt);
       if (this.completeCnt === this.getGameCnt){
           alert('성공');
       }
    },
    iscompared : function (){
        if(this.clickedCnt == 2){
            checkClickedCards(clickedCards, this.getGameCnt);
        }  
    },
    makeZero : function () {
        this.clickedCnt = 0;
        clickedCards = [];
    }
}

function random(gameNumber) {
    let arr = []; 
    for (let i = 0; i < gameNumber; i++) {
        arr[i] = i+1;
        arr[i+gameNumber] = i+1;
    }
    //이거는 구글링한거라서 사용법은 대충 알았는데 정확하게 이해가 안되어 있음 이 부분에 대해서는 재확인 예정
    arr.sort(function(a, b){
        return 0.5 - Math.random();
    });
    
    return arr;
}

// 게임 갯수를 가지고 와서 배열안에 게임을 랜덤으로 넣어주는 프로세스 
function getRandomNum(gameNumber) {
    clickedCardControl.getGameCnt = gameNumber;
    let getRandomArr = random(gameNumber);
    printUi(getRandomArr, gameNumber); 
}

// 전달받은 데이터를 화면에 출력해주는 프로세스
function printUi(arr, gameNumber) {
    let ul = document.querySelector('.ul');
    
    ul.style.width = (115*gameNumber)+'px';
    
    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = `
        <div class="cardWrap">
            <div class="card front" data-num="`+arr[i]+`"><img src="img/back.jpg"/></div>
            <div class="card card_num back"><img src="img/`+arr[i]+`.jpg"/></div>
        </div>`; 
        ul.appendChild(li);
        li.addEventListener("click", function () {clickCard(this, gameNumber);}, true);
    }
}

function inputCardValue(card) {
    clickedCardControl.increaseClickedCnt(clickedCardControl.clickedCnt);
    card.classList.remove('off');
    card.querySelector('.cardWrap').classList.add('on');       
    clickedCards.push({
        card : card,
        num : card.querySelector('.front').dataset.num
    }); 
}

// 두개의 카드를 선택하고 비교하는 프로세스
function clickCard(card) {
    if(card.querySelector('.cardWrap').classList.contains('on')){
        return false;
    }
    inputCardValue(card);
    clickedCardControl.iscompared();
}

// 선택된 두개의 카드를 비교하는 프로세스
function checkClickedCards(clickedCard) {
    let FRIST_CLICKED_CARD = 0, // 첫번째 카드
        SECOND_CLICKED_CARD = 1; //두번째 카드 
        
    setTimeout(function(){ 
        if(clickedCard[FRIST_CLICKED_CARD].num != clickedCard[SECOND_CLICKED_CARD].num){
            clickedCard[FRIST_CLICKED_CARD].card.classList.add('off');
            clickedCard[SECOND_CLICKED_CARD].card.classList.add('off');
            clickedCard[FRIST_CLICKED_CARD].card.querySelector('.cardWrap').classList.remove('on');
            clickedCard[SECOND_CLICKED_CARD].card.querySelector('.cardWrap').classList.remove('on');   
        }else{
            clickedCardControl.increaseCompleteCnt(clickedCardControl.completeCnt);
        }  
       
    }, 500);
    clickedCardControl.makeZero();
}

// 게임 시작 버튼을 눌렀을 때 실행되는 프로세스 
function startGame() {

    let getInputNum= document.querySelector(".gameNumber").value;
    
    if(getInputNum == ""){
        alert('1~10까지의 숫자를 넣어주세요.');
        return;
    }

    let gameNumber = parseInt(getInputNum);
    startBtn.classList.add('off');
        
    if (gameNumber < GAME_MINIMUM_COUNT) {
        startBtn.classList.remove('off');
        document.querySelector(".gameNumber").value = null;
        alert('최소 2 이상의 숫자를 넣어야지 게임이 동작합니다.');
        return;
    }
    reloadBtn.classList.remove('off');
    getRandomNum(gameNumber); 
}

// 리로드 버튼을 눌렀을 때 실행되는 프로세스 
function reloadGame() {
    location.reload();
}

startBtn.addEventListener('click', startGame); 
reloadBtn.addEventListener('click', reloadGame); 

