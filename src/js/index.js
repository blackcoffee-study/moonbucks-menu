import '../css/index.css';
import Form from './form';
import blockRefresh from './module/blockRefresh';

function App() {
    blockRefresh();

    const temp = new Form();
    temp.submit();
}
App();
