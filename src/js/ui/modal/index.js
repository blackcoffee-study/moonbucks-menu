const $modalTriggerBtn = document.querySelector(".modal-trigger-btn");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
//added variables
var total = 0;
const $addMenuBtn = document.getElementById('espresso-menu-submit-button');
const $menuForm = document.getElementById('espresso-menu-form');
const $editBtns = document.getElementsByClassName("menu-edit-button");
const $removeBtns = document.getElementsByClassName("menu-remove-button");


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

  countMenuUp();

  $('#espresso-menu-form')[0].reset();
};

const countMenuUp = () => {
  $('.menu-count').eq(0).text("총 "+ ++total +"개");
  console.log(total);
}

const countMenuDown = () => {
  $('.menu-count').eq(0).text("총 "+ --total +"개");
  console.log(total);
}

/**function pressedBtn(btns) {
  for(let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
       console.log(i);
       console.log(btn[i].className);
       return btns[i];
    }, false)
  }
}

const editMenu = (e) =>{
  console.log("여기까지오니?");
  //var button = pressedBtn($editBtns);
  var change = prompt("메뉴 명을 수정해주세요.", "");
  var parentLi = $(e).parent();
  $(parentLi).find('span').eq(0).text(change);
  console.log("제발 바뀌어라ㅏㅏ");
}
**/

$(document).ready(function(){
  $(".menu-remove-button").on('click', function() {  
      if(confirm("삭제하시겠습니까?")) {  
        console.log($(this).parents('li'));
         $(this).parents('li').remove(); 
         countMenuDown();
      }
  });
});

$(document).ready(function(){
  $(".menu-edit-button").on('click', function() {  
      if(confirm("수정하시겠습니까?")) {  
         var change = prompt("메뉴 명을 수정해주세요.", "");
         var parentLi = $(this).parents('li');
         $(parentLi).find('span').eq(0).text(change);
      }
  });
});

//------------------------------------------------

$addMenuBtn.addEventListener('click', function(e){
  e.preventDefault();
  addMenu();
});

$menuForm.addEventListener('submit', function (e){
  e.preventDefault();
  addMenu();
});

/**Array.from($editBtns).forEach((e, i) => e.addEventListener('click', function(){
  console.log("wpqkf");
  editMenu(e);
}, false));
**/

$modalTriggerBtn.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);

