import Component from "./Component";

export default class MenuList extends Component{

    template() {
        const {MenuItems,selected,} = this.props;
       return MenuItems.map(menu=>`<li class="menu-list-item d-flex items-center py-2" data-id=${menu.id}>
  <span class="w-100 pl-2 menu-name ${menu.completed? "sold-out": null}">${menu.text}</span>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
  >
    품절
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  >
    수정
  </button>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  >
    삭제
  </button>
</li>`).join('');
    }
    setEvent() {
        const { onEditMenu, onUpdateMenu, onDeleteMenu, onToggleMenuSoldOut} =this.props;
        this.addEvent("click", "button.menu-edit-button", (e)=>{
            const li = e.target.closest("li");
            let newText = window.prompt("메뉴명을 입력하세요");
            onUpdateMenu(li.dataset.id, newText);
        })
        this.addEvent("click", "button.menu-remove-button", (e)=>{
            const li = e.target.closest("li");
            if(window.confirm("정말 삭제하시겠습니까?")) {
                onDeleteMenu(li.dataset.id);
            }else return false;
        })
        this.addEvent("click, button.menu-sold-out-button", (e)=>{
            const id = e.target.closest("li");
            onToggleMenuSoldOut(id);
        })

    }
}