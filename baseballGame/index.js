var inputNumAmount = 3; // 입력 되는 숫자 수
var num_arr = [];
var insert_number = document.querySelector('.insert_number'),
    game_num = document.querySelector('.game_num');

var numberObj = {
    ball : 0,
    strike : 0,
    out : 0,
    count : 10
}
 
// input 오직 숫자만 받아오는 프로세스
function isNumberKey(evt){
    var num0 = 48, num9 = 57;
    if(evt.keyCode<= num0 || evt.keyCode <= num9){
        return true
    }
    return false;
}
insert_number.addEventListener("keydown", isNumberKey);


// 중복되지 않는 숫자를 받아와서 배열에 넣는 프로세스
function setNumberinArr() { 
    for (var i = 0; i < inputNumAmount; i++) {
        var num = isUniqueNum(); // 이름이 올바르지 않게 느껴지기 때문에 이름을 변경하자!
        num_arr[i] = num;    
     }    
    game_num.setAttribute('value', num_arr.join('') );   
}

// 배열에 중복되지 않는 숫자가 나올 때까지 랜덤의 숫자를 뽑아내는 프로세스
function isUniqueNum(){
    var isDubCheck = true;
    while (isDubCheck) {
        random_num = Math.floor(Math.random()*10);
        if(!num_arr.includes(random_num)) {
            isDubCheck = false; 
        }
    }
    return random_num;
}

// 정답과 내가 선택한 숫자가 Strike, Ball 인지 관리하는 프로세스
var gameType = {    
    isStrike: function(i, my_value_arr, game_value_arr) {
        if(my_value_arr[i] == game_value_arr[i]){
            return true;
        }
        return false;
    },
    isBall: function(i, my_value_arr, game_value_arr) { 
        for (let j = 0; j < game_value_arr.length; j++) {
            if(my_value_arr[i] == game_value_arr[j]){
                return true;
            }
        } 
        return false;
    }   
}

// 전달받은 데이터를 그려주는 프로세스
function drowingUlProcess(data) {
    var ul = document.querySelector('.ul'),
        li = document.createElement('li');
        
    li.classList.add("li");
    li.innerHTML = '<span class="my_data"> 입력한 숫자 : ' + data.num+'</span><span class="state"> strike ' + data.strike + ', ball ' + data.ball + ', out ' + data.out + '</span>'; 
    ul.appendChild(li); 
}

// 게임 카운팅을 관리하는 프로세스
var gameCount = {
    count : function () {
        return numberObj.count;
    },
    increaseCounting : function () {
        numberObj.count = numberObj.count-1;
        return numberObj.count;
    },
    decreaseCounting : function () {
        numberObj.count = numberObj.count+1;
        return numberObj.count;
    }      
}

// 비교한 숫자의 상태값을 (strike, ball, out 인지 여부 체크) 리턴하는 프로세스
function checkDataReturnType(i, my_value_arr, game_value){
    var game_value_arr = game_value.split("");
    
    if(gameType.isStrike(i, my_value_arr, game_value_arr)){
        return 'strike';
    } 
    if(gameType.isBall(i, my_value_arr, game_value_arr)){
        return 'ball';
    }
    return 'out';
}

// 입력받은 숫자와 정답을 비교하는 프로세스 
function compareDataProcess(my_value_arr, game_value) { 
    for (let i = 0; i < my_value_arr.length; i++) {
        var resultType = checkDataReturnType(i, my_value_arr, game_value);  
          
        if(resultType == 'out'){
            numberObj.out++;
        }else if(resultType == 'ball'){
            numberObj.ball++;
        }else if(resultType == 'strike'){
            numberObj.strike++;
        } 
    }
    return {
        num : insert_number.value,
        strike : numberObj.strike,
        ball : numberObj.ball,
        out : numberObj.out
    };         
}

// 게임 횟수 차감 및 횟수에 따른 실행 동작 리턴
function validatecheck(count) {
    var my_value_arr = insert_number.value.split("");

    if(count==0){
        gameCount.decreaseCounting();
        insertStateTxt('실패 게임 횟수가 끝났습니다.');
        return false;
    }
    
    if(insert_number.value == ''){
        gameCount.decreaseCounting();
        insertStateTxt('숫자를 입력하세요.');  
        return false;
    }else if(my_value_arr.length != inputNumAmount){
        gameCount.decreaseCounting();
        insertStateTxt('세자리의 숫자를 입력해 주세요.');  
        return false; 
    }else if(my_value_arr[0] == my_value_arr[1] || my_value_arr[0] == my_value_arr[2] || my_value_arr[1] == my_value_arr[2]){  
        gameCount.decreaseCounting();
        insertStateTxt('중복된 숫자를 사용했습니다.');        
        return false;
    }

    return true;    
    
}

// 정답을 맞췄을 경우 실행되는 프로세스
function isRightAnswer(data) {
    if(data.strike === 3){ // 게임이 올바르게 진행될 수 있고 게임이 끝나야하는 상태
        insertStateTxt('숫자 맞추기 성공!');
        document.querySelector('.insert_number').disabled = true;
    }     
}

// 오케스트레이션 하는 프로세스
function baseballProcess() {  
    // 안에 내용이 너무 복잡하게 되어 있어서 이해하는 부분이 조금 어렵기 때문에 이 부분은 좀 더 댑스를 나누자 
    var my_value_arr = insert_number.value.split("");
    var game_value = game_num.getAttribute('value');  
    numberObj.ball = 0, numberObj.strike = 0, numberObj.out = 0;   
    insertStateTxt('');
    var gameCounting = gameCount.increaseCounting();
    var isGameState = validatecheck(gameCounting); // 타입이라고 하면 정의되어 있는 값이 넘어가기 때문에 이름이 올바르지 않음
 
    if(isGameState == true){ // 게임이 올바르게 진행될 수 있는 상태
        var resultDrowingData = compareDataProcess(my_value_arr, game_value);
        drowingUlProcess(resultDrowingData);
        isRightAnswer(resultDrowingData);
    }
    
    insert_number.value = '';   
}

// 정상적으로 게임이 진행되지 않았을 경우에 어떠한 메시지를 노출해주는 프로세스
function insertStateTxt(txt) {
    document.querySelector('.end_text').innerText = txt;
}

// 현재 그러져있는 ui를 지우는 프로세스
function reSetUi() {
    var ul = document.querySelector('.ul');
    game_num.setAttribute('value','');
    document.querySelector('.end_text').innerText = '';
    document.querySelector('.insert_number').disabled = false;
    
    while (ul.firstChild) {
        ul.removeChild(ul.lastChild);
    }
}

function reSet() { 
    reSetUi();
    init();
}
function init(){
    setNumberinArr();   
    count=10;
}

document.querySelector('.startBtn').addEventListener('click', init);
document.querySelector('.resetBtn').addEventListener('click', reSet);
document.querySelector('.submitBtn').addEventListener('click', baseballProcess);



