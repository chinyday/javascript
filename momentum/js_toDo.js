


const toDoArea = document.querySelector('.js-toDoArea'),
    toDoform = toDoArea.querySelector('.js-toDoForm'),
    toDoInput = toDoArea.querySelector('input'),
    toDoList = toDoArea.querySelector('.js-toDoList');

const TODOLIST_LOCAL = 'todo';
let toDoArr = [];


function delTodo(event){
    const btn = event.target; 
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const resetToDoList = toDoArr.filter(function(toDO) {
        return toDO.id !== parseInt(li.id)
    });
    toDoArr = resetToDoList;
    saveToDoToLocal(toDoArr);
}

function saveToDoToLocal() {
    localStorage.setItem(TODOLIST_LOCAL,JSON.stringify(toDoArr));
}

function paintToDo(text) {
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newLiID = toDoArr.length+1;
    delBtn.value = 'X';
    delBtn.addEventListener('click', delTodo);
    span.innerText = text;
    li.id = newLiID;
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);

    const toDoObj = {
        text : text,
        id : newLiID
    }
    toDoArr.push(toDoObj);
    saveToDoToLocal();
}

function handleSumit(event) {
    event.preventDefault();
    const currValue = toDoInput.value;
    if(currValue.length != 0 ){
        paintToDo(currValue);
    }
    toDoInput.value ='';
}

function loadTodoList() {
    const toDoListInLocal = localStorage.getItem(TODOLIST_LOCAL);
    if(toDoListInLocal !== null){
        const loadToDoInLacal = JSON.parse(toDoListInLocal);
        loadToDoInLacal.forEach(function(toDoArr){
            paintToDo(toDoArr.text);
        });   
    }
}

function init() {
   loadTodoList();
   toDoform.addEventListener('submit', handleSumit);
}
init();