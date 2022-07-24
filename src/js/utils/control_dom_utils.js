export function getById(id) {
  return document.getElementById(id);
}

export function appendHtml(parentId, htmlTemplate, event) {
  const $ = getById(`${parentId}`);
  $.insertAdjacentHTML("beforeend", htmlTemplate);

  if (event) {
    const { eventName, callback } = event;
    $.lastChild[eventName] = callback;
  }
}
