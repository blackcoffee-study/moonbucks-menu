export default function CategoryNav({ initialState, changeCategory }) {
  this.$categoryNav = document.querySelector('.category-nav');

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    // 카테고리별 css 추가하기
  };
  this.setEvent = () => {
    this.$categoryNav.addEventListener('click', (e) => {
      // 이벤트 위치 확인 필요
      changeCategory(e.target.closest('button').dataset.categoryName);
    });
  };

  this.render();
  this.setEvent();
}
