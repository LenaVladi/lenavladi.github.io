var click_delay = 500,
  click_delayTimer = null,
  header_toggle = document.querySelector('.header__burger'),
  menu = document.querySelector('.links');


header_toggle.addEventListener('click', function () {
  
  if(click_delayTimer === null) {
    
    var burger = this;
    burger.classList.toggle('active');
    menu.classList.toggle('opened');
    
    if(!burger.classList.contains('active')) {
      burger.classList.contains('closing');
    }
    
    click_delayTimer = setTimeout(function () {
      burger.classList.remove('closing');
      clearTimeout(click_delayTimer);
      click_delayTimer = null;
    }, click_delay);
  }
});