var lotto_arr = new Array(6); //로또를 담을 배열
var lotto_num;// = Math.floor(Math.random()*46 )+1; //1~466까지 랜덤으로 숫자 뽑기 
var count;


//로또 담기
function setLottoNumber(count){
    lotto_arr[count] = lotto_num;
}

//숫자 랜덤으로 받기
function randomNumber() {
    lotto_num = Math.floor(Math.random()*46 )+1; //배열에 넣기
    return lotto_num;
}

//배열에 동일한 값이 있는지 확인
function checkExist(lotto_num) {  
    if(lotto_arr.indexOf(lotto_num) != '-1'){
        lotto_num = randomNumber();
    }
    setLottoNumber(count);
}

// 
function startLotto() {
    for (let i = 0; i < lotto_arr.length; i++) {
        count = i;
        lotto_num = randomNumber(); 
        checkExist(lotto_num);  
    }
}

// 로또 당첨 숫자 화면에 출력
function setLottoUI() {
    // 오름 차순으로 숫자 정렬
    lotto_arr.sort(function(a, b) { 
        return a - b;
    });

    var ul_wrap = document.getElementById('today_lotto');
    var ul ='<ul>';
    var point_color;
    for (let i = 0; i < lotto_arr.length; i++) {
        if (lotto_arr[i] <=10) {
            point_color = 'num10';
        }else if (10 < lotto_arr[i] && lotto_arr[i] <= 20) {
            point_color = 'num20';
        }else if (20 < lotto_arr[i] && lotto_arr[i] <= 30) {
            point_color = 'num30';
        }else if (30 < lotto_arr[i] && lotto_arr[i] <= 40) {
            point_color = 'num40';
        }else if (40 < lotto_arr[i]) {
            point_color = 'num50';
        }
        ul += "<li class="+ point_color +" >" + lotto_arr[i] + "</li>";  
    }
    ul += '</ul>' 
    ul_wrap.innerHTML = ul;
}

function btn_lotto() {
    startLotto();
    setLottoUI();
}
  