const GAME_SIZE = 10;
const BUMB_NUM = 10;
let bumb = '*';
let game_arr = new Array(GAME_SIZE); // GAME_SIZE에 맞는 빈 배열 생성 


// 게임 테이블 작성
function init() {
   for (let row  = 0; row  < game_arr.length; row ++) {       
        game_arr[row] = new Array(GAME_SIZE); // 각 요소마다 또다시 GAME_SIZE의 갯수만큼의 요소를 가지는 배열을 생성 
        for (let column  = 0; column  < game_arr[row].length; column ++) {
            game_arr[row][column] = 0; //기본 0으로 초기화  
        }
    }    
}

// 랜덤으로 폭탄 설치할 위치 선정
function checkBumbLocation() {  
    let x = parseInt(Math.random()*10);
    let y = parseInt(Math.random()*10);
    return {
        'x' : x,
        'y' : y
    };
}

// 선정된 위치에 폭탄이 있는지 확인
function thisLocationisValue(x,y) {
    let bumbLocation = checkBumbLocation();    
    if(game_arr[bumbLocation.x][bumbLocation.y] == bumb){
        thisLocationisValue();
    }
    return bumbLocation;
}

// 폭탄을 갯수만큼 설치
function setBumb() {
    for(let i=0; i< BUMB_NUM; i++){
        let bumbLocation = thisLocationisValue();
        game_arr[bumbLocation.x][bumbLocation.y] = bumb;  
    }
}

// 폭탄이 있으면 주변에 박스에 숫자값을 증가
function increaseCount(box) {   
    game_arr[box.x][box.y] = game_arr[box.x][box.y] +1;        
}

function isVaild(box) {
    return (box.x >= 0 && box.x < BUMB_NUM) &&(box.y >= 0 && box.y < BUMB_NUM) && game_arr[box.x][box.y] != bumb ;
}

// 폭탄일 경우 주변에 박스의 위치를 확인 및 증가
function increaseCountPro(x,y) {   
    checkNearBox(x,y).forEach(box => {  
        if( isVaild(box)){
            increaseCount(box);
        }
    });
}


// 현재 위치가 폭탄일 경우 주변의 값을 저장
function checkNearBox(x,y) {
    return[
        { 'x' : x-1,'y' : y-1 },
        { 'x' : x-1, 'y' : y },
        { 'x' : x-1, 'y' : y+1 },
        { 'x' : x, 'y' : y-1 },
        { 'x' : x, 'y' : y+1 },
        { 'x' : x+1, 'y' : y-1 },
        { 'x' : x+1, 'y' : y },
        { 'x' : x+1, 'y' : y+1 }
    ]; 
}

// 현재 위치가 폭탄인지를 확인
function countBumb() {
    for (let x = 0; x < BUMB_NUM; x++) {
        for (let y = 0; y < BUMB_NUM; y++) {
            if( game_arr[x][y] === bumb){
                increaseCountPro(x,y);
            }
        }
    } 
    setUI();
}

// 화면에 출력
function setUI() {

    let findbumb_wrap = document.getElementById('findbumb_wrap');
    
    let innerUi = '<ul id="findbumb">';
    for(let x = 0; x < GAME_SIZE; x++){
        for(let y = 0; y < game_arr[x].length; y++){
            innerUi += "<li onclick='click_box()' value='" + game_arr[x][y] + "'>" + game_arr[x][y] + "</li>";
        }  
    }
    innerUi += '</ul>';
    findbumb_wrap.innerHTML = innerUi;
}

// 클릭했을 때, 지뢰인지 확인
function click_box() {
    let this_value = event.target.getAttribute('value');
    if(this_value == '*'){
        alert('find bumb!');
        return;
    }else{
        event.target.setAttribute('class','on');        
    }
}

function start() {
    init();
    setBumb();
    countBumb();
    document.querySelector('.btn_start button').classList.add('disabled');
    document.querySelector('.btn_reset button').classList.remove('disabled');
}

function reset() {
    init();
    setBumb();
    countBumb();
}

