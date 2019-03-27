const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h2"),
    greetingsWrap = document.querySelector(".js-name"),
    greetingsTitle = greetingsWrap.querySelector('.greetings_txt');

function changeGreetings(hour) {
    if(0< hour && hour< 12 ){
        greetingsTitle.innerText = 'Gooooood morning! ';
    }else if(12<= hour && hour< 18){
        greetingsTitle.innerText = 'have a nice day! ';
    }else if(18<= hour && hour< 24){
        greetingsTitle.innerText = 'good night! ';
    }
}

function getTime() {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${
        hour < 10 ? `0${hour}` : hour} : ${
        minutes < 10 ? `0${minutes}` : minutes} : ${
        seconds < 10 ? `0${seconds}` : seconds}`;
    
    return changeGreetings(hour);
}

function init() {
    getTime(); 
    setInterval(getTime, 1000);
}
init();

