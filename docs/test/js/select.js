'use strict';

(function () {
  var selectArrow = document.querySelectorAll('.ui-select-arrow');
  var selectInputList = document.querySelectorAll('.ui-select .ui-input');
  var select = null;
  var selectList = null;
  var selectInput = null;

  function toggleSelect(elem) {
    elem.classList.contains('active') ? elem.classList.remove('active') : elem.classList.add('active');
  }

  function checkNewOption(event) {
    selectList.forEach(function (el) {
      return el.classList.remove('active');
    });
    event.target.classList.add('active');
    selectInput.value = event.target.textContent;
    toggleSelect(select);
  }

  function showSelectList(event) {
    select = event.target.parentElement;
    selectInput = select.querySelector('.ui-input');
    selectList = select.querySelectorAll('.ui-option');
    toggleSelect(select);
    selectList.forEach(function (el) {
      return el.addEventListener('click', checkNewOption);
    });
  }

  function onKeydown(keyCode) {
    switch (keyCode) {
      case 40:
        console.dir(selectInput);
        console.log(selectInput.nextSibling);
    }
  }

  selectArrow.forEach(function (el) {
    return el.addEventListener('click', showSelectList);
  });
  selectInputList.forEach(function (el) {
    return el.addEventListener('focus', showSelectList);
  });
})();