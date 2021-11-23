import '../css/index.css';
import Form from './form';
import blockRefreshWhenSubmit from './module/blockRefreshWhenSubmit';
import handleList from './handleList';

// 전역 상태를 위한 스토어
const store = {
    menuList: [],
};

function App() {
    // form에 대한 e.preventDefault 적용
    blockRefreshWhenSubmit();

    // form에 대한 로직 -> <input> || <button>
    const form = new Form();
    form.submit(store.menuList);

    // 리스트의 수정 및 변경에 관련된 로직
    handleList(store.menuList);
}

App();
