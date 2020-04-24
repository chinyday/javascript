/*  
야구게임 
1. 랜덤으로 중복되지 않는 세자리의 숫자(a)를 받아온다.
2. 게이머가 임의의 세자리 숫자(b)를 넣고 확인
3. a의 숫자와 b의 숫자를 비교하여, 
    3-1 a의 숫자중 b의 숫자가 동일한게 있으면(단순 숫자만 비교) 1b
    3-2 a의 숫자중 b의 숫자가 동일한 위치에 있으면(숫자 및 위치 비교) 1s
4. 게임은 총 10번의 기회가 있다.
5. a와 b가 동일한 숫자가 나오면 게임 끝

1. 게임시작 -> 랜덤 숫자 3개 출력해서 배열에 넣기 start()
2. 게이머가 숫자를 입력하고 전송 클릭 했을 때 - 라운드 10번이내 3개 숫자를 다 맞추면 게임승리! 라운드 10번이 넘으면 게임 실패 send()
3. 밸리데이션 체크 validationChk()
4. 입력한 숫자 3개 배열에 넣기 send()
5. 랜덤숫자 3개 배열과 입력한 숫자의 배열 비교 compareValue
배열끼리 값이 같을때, 배열 인덱스가 같으면 스트라이크
배열끼리 값이 같을때, 배열 인덱스가 다르면 볼
스트라이크와 볼이 아니면 아웃
6. 라운드 별 결과를 html로 그리기 gameRoundHtml()

*/ 


var inputNumAmount = 3; // 입력 되는 숫자 수
var num_arr = [];
var insert_number = document.querySelector('.insert_number'),
    game_num = document.querySelector('.game_num');
var ball=0, strike=0, out=0, count=10;
 
 
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
        var num = checkDebleNumber();
        num_arr[i] = num;    
     }    
    game_num.setAttribute('value', num_arr.join('') );   
}

// 배열에 중복되지 않는 숫자가 나올 때까지 랜덤의 숫자를 뽑아내는 프로세스
function checkDebleNumber(){
    var isDupCheck = true;
    while (isDupCheck) {
        random_num = Math.floor(Math.random()*10);
        if(!num_arr.includes(random_num)) {
            isDupCheck = false; 
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
    li.innerText = data.num+' : strike ' + data.strike + ', ball ' + data.ball + ', out ' + data.out; 
    ul.appendChild(li); 
}

// 게임 카운팅을 관리하는 프로세스
var gameCount = {
    count : function () {
        return count;
    },
    increaseCounting : function () {
        count = count-1;
        return count;
    },
    decreaseCounting : function () {
        count = count+1;
        return count;
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
            out++;
        }else if(resultType == 'ball'){
            ball++;
        }else if(resultType == 'strike'){
            strike++;
        } 
    }
    return {
        num : insert_number.value,
        strike : strike,
        ball : ball,
        out : out
    };         
}

// 게임 횟수 차감 및 횟수에 따른 실행 동작 리턴
function gameTimesProcess(count) {
    var my_value_arr = insert_number.value.split("");
    
    while(count>=0){
        for (let i = 0; i < 1; i++) {
            if(insert_number.value == ''){
                insertStateTxt('숫자를 입력하세요.');  
                return false;
            }else if(my_value_arr.length != inputNumAmount){
                insertStateTxt('세자리의 숫자를 입력해 주세요.');  
                return false; 
            }else if(my_value_arr[i] == my_value_arr[i+1] || my_value_arr[i] == my_value_arr[i+2] || my_value_arr[i+1] == my_value_arr[i+2]){  
                insertStateTxt('중복된 숫자를 사용했습니다.');        
                return false;
            }
            return true;    
        }
    }
    gameCount.decreaseCounting();
    insertStateTxt('실패 게임 횟수가 끝났습니다.');
    return false;
}

function baseballProcess() {   
    var my_value_arr = insert_number.value.split("");
    var game_value = game_num.getAttribute('value');  
    ball = 0, strike = 0, out = 0;   
    insertStateTxt('');
    var gmaeCounting = gameCount.increaseCounting();
    var myNumStateType = gameTimesProcess(gmaeCounting);
 
    if(myNumStateType == true){
        var resultDrowingData = compareDataProcess(my_value_arr, game_value);
        drowingUlProcess(resultDrowingData);
    }
    if(strike === 3){
        insertStateTxt('숫자 맞추기 성공!');
        document.querySelector('.insert_number').disabled = true;
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



