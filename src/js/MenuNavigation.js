import Component from "./Component";

export default class MenuNavigation extends Component{

    template(){
        return `
        <a href="/" class="text-black">
          <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
        </a>
        <nav class="d-flex justify-center flex-wrap">
          <button
                  data-category-name="espresso"
                  class="cafe-category-name btn bg-white shadow mx-1"
          >
            ☕ 에스프레소
          </button>
          <button
                  data-category-name="frappuccino"
                  class="cafe-category-name btn bg-white shadow mx-1"
          >
            🥤 프라푸치노
          </button>
          <button
                  data-category-name="blended"
                  class="cafe-category-name btn bg-white shadow mx-1"
          >
            🍹 블렌디드
          </button>
          <button
                  data-category-name="teavana"
                  class="cafe-category-name btn bg-white shadow mx-1"
          >
            🫖 티바나
          </button>
          <button
                  data-category-name="desert"
                  class="cafe-category-name btn bg-white shadow mx-1"
          >
            🍰 디저트
          </button>
        </nav>`
    }
    setEvent() {
        const {onClickNav} = this.props;
        this.addEvent("click", "button.cafe-category-name", (e)=>{
            const Name = e.target.dataset.category-name;
            onClickNav(Name);
        })
    }
}