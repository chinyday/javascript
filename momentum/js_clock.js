const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h2"); 

function getTime() {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${
        hour < 10 ? `0${hour}` : hour} : ${
            minutes < 10 ? `0${minutes}` : minutes}`
}

function init() {
    getTime(); 
    setInterval(getTime, 1000);
}
init();
