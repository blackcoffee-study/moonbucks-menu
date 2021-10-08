const $modalTriggerBtn = document.querySelector(".modal-trigger-btn");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");


const $addMenuBtn = document.getElementById('espresso-menu-submit-button');


const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

const addMenu = (e) => {

  var name = document.getElementById('espresso-menu-name').value;
  if(name === "") {
    return;
  }
  console.log(name);

  console.log("돌아ㅏ");
  alert("submitted!");
  e.preventDefault();
  
  var ul = $('#espresso-menu-list');
  var clone = $('#espresso-menu-list').find('li:first').clone(true);
  $(clone).show();
  $(clone).find('span').eq(0).text(name);
  clone.appendTo(ul);

  $('#espresso-menu-form')[0].reset();
};

$addMenuBtn.addEventListener("click", addMenu);
$modalTriggerBtn.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);

