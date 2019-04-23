



var date = new Date();

var yyyy = date.getFullYear();
var dd = date.getDate();
var mm = date.getMonth()+1; //January is 0!


if(mm <10){
    mm = '0'+mm;
}

if(dd <10){
    dd = '0'+dd;
}


var now =  String(yyyy)+String(mm)+String(dd);
var then = '20191114';
var today = Number(then) - Number(now);
today = Math.floor(today);





window.onload = function(){
    document.getElementsByClassName('day')[0].innerHTML = today;

}



