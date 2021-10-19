
export default class Component{
    state;
    props;
    target;

    constructor(target,props) {
        this.props=props;
        this.target=target;
        this.init();
        this.render();
        this.setEvent();
    }
    init(){};
    setEvent(){};
    render(){
        this.target.innerHTML=this.template();
        this.mount();
    };
    template(){
        return``;
    };
    mount(){

    };
    setState(newState){
        this.state={...this.state,newState};
        this.render();
    };

    addEvent(event,selector,callback){
        const children = [...document.querySelectorAll(selector)];
        this.target.addEventListener(event, (e)=>{
            if(!e.target.closest(selector) || !children.includes(e.target))return false;
            callback(event);
        })
    }
}