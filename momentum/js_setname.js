const nameArea = document.querySelector('.js-name'),
    form = nameArea.querySelector('form'),   
    input = nameArea.querySelector('input'),    
    name = nameArea.querySelector('.js-greeting');


const USER_LOCALS = 'currName';
const SHOWING_OFF = 'dp_off';
const SHOWING_ON = 'dp_on';

function saveName(text) {
    localStorage.setItem(USER_LOCALS, text);
}

function handleSumit(event) {
    event.preventDefault();
    const currValue = input.value;
    paintGreeting(currValue);
    saveName(currValue);
    input.value ='';
}

function askingName() {
    form.addEventListener("submit", handleSumit)
}

function paintGreeting(text) {
    input.classList.add(SHOWING_OFF);
    name.classList.remove(SHOWING_OFF);
    name.innerText = `Hello, ${text}`;
    saveName(text); 
}

function loadName(){
    const currName = localStorage.getItem(USER_LOCALS);
    if(currName === null){
        askingName();
    }else{
        paintGreeting(currName);
    }
}

function init() {
    loadName();
}
init();


