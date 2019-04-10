const KEY = "259f948bd0f70ddfc62dec2ff72991ea";
let TYPE = "searchDailyBoxOfficeList";

let ul = document.querySelector('.tab_box'),
    lis = ul.getElementsByTagName('li');
let span = document.querySelector('.search_date');
let txt = document.querySelector('.txt');
let rank_table = document.querySelector('.ranking_box'),
    rank_thead = rank_table.querySelector('thead'),
    rank_body = rank_table.querySelector('tbody');

function getToday() {
    //어제
    let date = new Date();
    let yesterday = date.getTime() - (1*24*60*60*1000);
    date.setTime(yesterday);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();

    month = month >= 10 ? month : '0' + month;
    day =  day >= 10 ? day : '0' + day;

    let today = year.toString()+month.toString()+day.toString();

    return today;
}

function getLastweek() {
    // 지난주
    let lastdate = new Date();
    let lastweek = lastdate.getTime() - (7*24*60*60*1000);
    lastdate.setTime(lastweek);
    let weekyear = lastdate.getFullYear();
    let weekmonth = lastdate.getMonth()+1;
    let weekday = lastdate.getDate();

    weekmonth = weekmonth >= 10 ? weekmonth : '0' + weekmonth;
    weekday =  weekday >= 10 ? weekday : '0' + weekday;
    
    let lastweekend = weekyear.toString()+weekmonth.toString()+weekday.toString();
   
    return lastweekend;
}

function getMovie(day,TYPE) {
    
    fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/${TYPE}.json?key=${KEY}&targetDt=${day}&weekGb=0`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        
        if(TYPE === 'searchDailyBoxOfficeList'){
            makeBoxOffice(json.boxOfficeResult.dailyBoxOfficeList);
            span.innerText =  `기준 : ${day}`;
            txt.innerText = '당일 기준, 전 날의 통계로 나열됩니다.';
        }else{
            makeBoxOffice(json.boxOfficeResult.weeklyBoxOfficeList); 
            span.innerText = `기준 : ${json.boxOfficeResult.showRange}`; 
            txt.innerText = '당일 기준, 전 주의 통계로 나열됩니다.';  
        }  
    });
}


function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function makeBoxOffice(json) {
    let movInfo = "";

    movInfo += '<tr><th>순위</th><th>영화명</th><th>개봉일</th><th>누적관객수</th></tr>';
    rank_thead.innerHTML = movInfo;
    movInfo = '';
    movInfo += `<tr style="height: 15px;"></tr>`;

    for (let i = 0; i < json.length; i++) {  
       let audiAcc = numberWithCommas(json[i].audiAcc);
      
        movInfo += `<tr><td class="rank">${json[i].rank}</td>`;
        movInfo += `<td class="movie_name">${json[i].movieNm}</td>`;
        movInfo += `<td class="open_day">${json[i].openDt}</td>`;
        movInfo += `<td class="audiAcc">${audiAcc}명</td></tr>`;   
    }  
    rank_body.innerHTML = movInfo;
}

function changeBoxofficeType(event) {
    event.preventDefault();
    if(event.target.classList.contains('btn_today')){
        //일별
        event.target.classList.add('on');
        event.target.nextElementSibling.classList.remove('on');
        
        let day = getToday();
        TYPE = "searchDailyBoxOfficeList";
        getMovie(day, TYPE);
        
    }else if (event.target.classList.contains('btn_weekend')){
        //주별
        event.target.classList.add('on');
        event.target.previousElementSibling.classList.remove('on');

        let day = getLastweek();
        TYPE = "searchWeeklyBoxOfficeList";
        getMovie(day, TYPE);
       
    }
}
for (let i of lis) {
    i.addEventListener('click',changeBoxofficeType);
}


function init() {
   let today =  getToday();
    getMovie(today, TYPE);
}
init();
