const $modalTriggerBtn = document.querySelector(".modal-trigger-btn");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

$modalTriggerBtn.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
