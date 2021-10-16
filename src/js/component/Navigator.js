export default function Navigator($target, { onClick }) {
  const $nav = $target;
  $nav.addEventListener('click', e => handleNavClick(e));

  const handleNavClick = e => {
    if (!isButton(e.target)) return;
    onClick(e.target.dataset.categoryName);
  };

  const isButton = target => target.tagName === 'BUTTON';
}
