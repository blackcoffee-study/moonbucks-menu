import Component from "./Component";

export default class MenuCount extends Component{

    template(){
        const{MenuCount} = this.props;
        return `총 ${MenuCount}개`
    }
}