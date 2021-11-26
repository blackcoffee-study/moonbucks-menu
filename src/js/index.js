import '../css/index.css';
import handleSubmit from './features/handleSubmit';
import preventAction from './utils/preventAction';
import handleList from './features/handleList';

const store = {
    menuList: [],
};

preventAction('#espresso-menu-form');

function App() {
    handleSubmit(store.menuList);

    handleList(store.menuList);
}

App();
