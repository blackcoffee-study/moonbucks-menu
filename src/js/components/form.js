export default ($targetEl, state, events) => {
  const { addMenu } = events;
  const $newForm = $targetEl.cloneNode(true);

  $newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target.querySelector(".input-field");
    addMenu({ category: "coffee", name: target.value });
    target.value = "";
  });

  return $newForm;
};
