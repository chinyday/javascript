
jQuery(document).ready(function() {
    
    let categoryWrap = document.querySelector('.category_wrap');
    let AllradioBtn = categoryWrap.getElementsByTagName('input');
    let sendBtn = document.querySelector('.send_btn');
    let txtArea = document.querySelector('.txt_area');
    let list = document.querySelector('.js-list');

    const LIST_LOCAL = 'sendTxt';
    let listArr = [];

    let listInLocal = localStorage.getItem(LIST_LOCAL);
    let loadListInLacal = JSON.parse(listInLocal);


    // 로컬에 데이터 저장
    function saveListLocal() {
        localStorage.setItem(LIST_LOCAL,JSON.stringify(listArr));
    }

    // li 출력
    function paintLI(data) {
        document.querySelector('.subtitle').classList.remove('off');

        let li = document.createElement('li');
        let to = document.createElement('span');
        let txt = document.createElement('span');
        to.classList.add('to');
        to.innerText = data.radioBtn;
        txt.innerText = data.txt;
        li.appendChild(to);
        li.appendChild(txt);
        list.appendChild(li);
        list.insertBefore(list.lastChild, list.childNodes[0]);
    }

    //  list를 출력하고, 로컬에 데이터를 저장
    function paintList(text) {
        paintLI(text);
        listArr.push(text);
        saveListLocal(); // 데이터 저장
    }

    // 라디오버튼을 클릭했을 때 카테고리별로 정렬
    function sortList(data) {
        list.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            paintLI(data[i]);
        }
    }

    // send 버튼을 눌렀을 때 발생
    function handleSumit(event) { 
        let radioBtnValue = '';
        for (let i = 0; i < AllradioBtn.length; i++) {  
            if(AllradioBtn[i].checked == true){
                radioBtnValue = AllradioBtn[i].value;
            } 
        }

        let currValueObj = {
            radioBtn : radioBtnValue,
            txt : txtArea.value,
        } 

        if (txtArea.value != "" && radioBtnValue != "") {   
            paintList(currValueObj);
        }
        txtArea.value = '';
    }

    //선택된 버튼에 checked 설정
    function checkedRadioBtn(event) {
        let clickedBtn = event.target;
        jQuery(clickedBtn).attr('checked',true).siblings().removeAttr('checked');
        let sameList = []; 

        if(listInLocal !== null){
            loadListInLacal.forEach(function(listArr){
                if(clickedBtn.value == listArr.radioBtn){
                    sameList.push(listArr);   
                }
            });      
        }
        sortList(sameList);
    }

    //만약 로컬에 저정되어 있는 정보가 있을 때 출력
    function loadList() {
        if(listInLocal !== null){
            loadListInLacal.forEach(function(listArr){
                paintList(listArr);
            });   
        }else{
           document.querySelector('.subtitle').classList.add('off');
        }
    }

    function init() {
        loadList();
        for (let i of AllradioBtn) {
            i.addEventListener('click',checkedRadioBtn);   
        }
        sendBtn.addEventListener('click', handleSumit); 
    }
    init();

});