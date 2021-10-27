export default function MenuCategory({ onCategoryChange, $nav }) {
  $nav.addEventListener('click', e => {
    onCategoryChange(e.target);
  });
}
