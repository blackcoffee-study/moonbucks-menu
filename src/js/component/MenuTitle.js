import component from '../core/component.js';

export default class MenuTitle extends component {
  setup() {
    console.log(this.$props);
    this.$state = this.$props.$state;
    console.log(this.$state.category)
  }
  template() {
    const category = this.getCategory(this.$state.category)
    const totalNum = this.getLength(this.$state.category);
    return `
        <h2 class="mt-1">${category} 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${totalNum}개</span>
    `;
  }
  getCategory(category){
    switch(category){
      case 'espresso' : return  '☕ 에스프레소'; 
      case 'frappuccino' : return '🥤 프라푸치노';
      case 'blended' : return ' 🍹 블렌디드';
      case 'teavana' : return ' 🫖 티바나';
      case 'desert' :  return '🍰 디저트';
    }
  }
  getLength(category){
    switch(category){
      case 'espresso' : return  this.$state.espresso.length; 
      case 'frappuccino' : return this.$state.frappuccino.length;
      case 'blended' : return this.$state.blended.length;
      case 'teavana' : return this.$state.teavana.length;
      case 'desert' :  return this.$state.desert.length;
    }
  }
}
