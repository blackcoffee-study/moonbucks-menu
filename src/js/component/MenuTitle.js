import component from '../core/component.js';

export default class MenuTitle extends component {
  setup() {
    this.$state = this.$props;
    console.log(this.$state);
  }
  template() {
    const category = this.$props.category;
    const categoryName = this.getCategory(category);
    const totalNum = this.$props.$state.length;
    //console.log(totalNum);
    return `
        <h2 class="mt-1">${categoryName} 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${totalNum}개</span>
    `;
  }
  getCategory(category){
    console.log(category);
    switch(category){
      case 'espresso' :  return  '☕ 에스프레소'; 
      case 'frappuccino' : return '🥤 프라푸치노';
      case 'blended' : return ' 🍹 블렌디드';
      case 'teavana' : return ' 🫖 티바나';
      case 'desert' :  return '🍰 디저트';
  }
}
  // getLength(category){
  //   switch(category){
  //     case 'espresso' : return  this.$state.length; 
  //     case 'frappuccino' : return this.$state.frappuccino.length;
  //     case 'blended' : return this.$state.blended.length;
  //     case 'teavana' : return this.$state.teavana.length;
  //     case 'desert' :  return this.$state.desert.length;
  //   }
  // }
}
