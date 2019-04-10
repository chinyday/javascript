const KEY = "259f948bd0f70ddfc62dec2ff72991ea";
let TYPE = "searchDailyBoxOfficeList";

let ul = document.querySelector('.tab_box'),
    lis = ul.getElementsByTagName('li');
let span = document.querySelector('.search_date');
let rank_table = document.querySelector('.ranking_box'),
    rank_body = rank_table.querySelector('tbody');

function getData() {
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

function getMovie() {
    var day = getData();

    fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/${TYPE}.json?key=${KEY}&targetDt=${day}&weekGb=0`
    /* 
    searchWeeklyBoxOfficeList 주말/주간
    searchDailyBoxOfficeList 일별
    */
    ).then(function(response){
        return response.json();
    }).then(function(json){
        span.innerText = json.boxOfficeResult.showRange;
        makeBoxOffice(json.boxOfficeResult.dailyBoxOfficeList);
    });
}


function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function makeBoxOffice(json) {
    console.log(json);
    let movInfo = "";
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

function setdate(params) {
}


function changeBoxofficeType(event) {
    event.preventDefault();
    console.log(this);
}
for (let i of lis) {
    i.addEventListener('click',changeBoxofficeType);
}

function init() {
    getMovie();
    getData();

    
}
init();
