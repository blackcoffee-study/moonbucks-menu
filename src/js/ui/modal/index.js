const $modalTriggerBtn = document.querySelector(".modal-trigger-btn");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
var total = 0;

const $addMenuBtn = document.getElementById('espresso-menu-submit-button');
const $menuForm = document.getElementById('espresso-menu-form');


const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

const addMenu = () => {
 
  var name = document.getElementById('espresso-menu-name').value;
  if(name === "") {
    return;
  }
  console.log(name);

  alert("added!");
  
  var ul = $('#espresso-menu-list');
  var clone = $('#espresso-menu-list').find('li:first').clone(true);
  $(clone).show();
  $(clone).find('span').eq(0).text(name);
  clone.appendTo(ul);

  countMenu();

  $('#espresso-menu-form')[0].reset();
};

const countMenu = () => {
  $('.menu-count').eq(0).text("총 "+ ++total +"개");
  console.log(total);
}

$addMenuBtn.addEventListener('click', function(e){
  e.preventDefault();
  addMenu();
});
$menuForm.addEventListener('submit', function (e){
  e.preventDefault();
  addMenu();
});
$modalTriggerBtn.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);

