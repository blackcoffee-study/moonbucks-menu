import component from '../core/component.js';

export default class MenuTitle extends component {
  setup() {
    this.$state = this.$props;
  }
  template() {
    const category = this.$props.category;
    const categoryName = this.getCategory(category);
    const totalNum = this.$props.$state.length;
    return `
        <h2 class="mt-1">${categoryName} 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${totalNum}개</span>
    `;
  }
  getCategory(category){
    switch(category){
      case 'espresso' :  return  '☕ 에스프레소'; 
      case 'frappuccino' : return '🥤 프라푸치노';
      case 'blended' : return ' 🍹 블렌디드';
      case 'teavana' : return ' 🫖 티바나';
      case 'desert' :  return '🍰 디저트';
  }
}
}
