import Component from "./Core/Component";
import { store } from "./MenuStore";

export default class MenuCount extends Component {
  template() {
    const { menuList } = store.state;
    return `총 ${menuList.length}개`;
  }
}
