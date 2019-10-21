'use strict';

(function() {
    const selectArrow = document.querySelectorAll('.ui-select-arrow')
    const selectInputList = document.querySelectorAll('.ui-select .ui-input')
    let select = null;
    let selectList = null;
    let selectInput = null;

    function toggleSelect(elem) {
        elem.classList.contains('active') ?  elem.classList.remove('active') :  elem.classList.add('active');
    }

    function checkNewOption(event) {
        selectList.forEach(el => el.classList.remove('active'))
        event.target.classList.add('active');
        selectInput.value =  event.target.textContent;
        toggleSelect(select);
    }

    function showSelectList(event) {
        select = event.target.parentElement;
        selectInput = select.querySelector('.ui-input');
        selectList = select.querySelectorAll('.ui-option');

        toggleSelect(select);
        selectList.forEach(el => el.addEventListener('click', checkNewOption));
    }

    selectArrow.forEach(el => el.addEventListener('click', showSelectList))
    selectInputList.forEach(el => el.addEventListener('focus', showSelectList))
})()
