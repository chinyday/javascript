const LOTTONUMBER = 7;
let lotto_arr = []; //로또를 담을 배열

function startLotto() {
    let lotto_num;
    lotto_arr = [];
    for (let i = 0; i < LOTTONUMBER; i++) {
        lotto_num = randomNumber();
        lotto_arr[i] = lotto_num;
    }
    setLottoUI();
}

function randomNumber() {
    let num;
    let flg = true;
    while (flg) {
        num = Math.floor(Math.random() * 46) + 1; 
        if (lotto_arr.indexOf(num) == '-1') {       
            flg = false;
        }
    }
    return num;
}

// 로또 당첨 숫자 화면에 출력
function setLottoUI() {
    let ul_wrap = document.getElementById('today_lotto');
    let ul = document.createElement('ul');
    let li;

    if(ul_wrap.childNodes.length > 0){
        ul_wrap.innerHTML = '';
    }

    for (let i = 0; i < lotto_arr.length; i++) {
        li = paintLi(lotto_arr[i]);
        ul.insertAdjacentHTML('beforeend', li);
    }

    ul_wrap.appendChild(ul);
}

function paintLi(num) {
    let point_color;

    if (num <= 10) { point_color = 'num10'; }
    else if (10 < num && num <= 20) { point_color = 'num20'; }
    else if (20 < num && num <= 30) { point_color = 'num30'; }
    else if (30 < num && num <= 40) { point_color = 'num40'; }
    else if (40 < num) { point_color = 'num50'; }

    return `<li class="${point_color}">${num}</li>`;
}

function btn_lotto() {   
    startLotto();
}
