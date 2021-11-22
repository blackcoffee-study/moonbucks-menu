import '../css/index.css';
import Form from './form';
import blockRefresh from './module/blockRefresh';
import HandleList from './handleList';

// 전역 상태를 위한 스토어
const store = {
    menuList: [],
};

function App() {
    blockRefresh();

    const form = new Form();
    form.submit(store.menuList);

    HandleList(store.menuList);
}
App();
