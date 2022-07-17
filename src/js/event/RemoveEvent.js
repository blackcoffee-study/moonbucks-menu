function RemoveEvent() {
    this.$removeButton = document.getElementsByClassName("menu-remove-button");
    this.removeEvent;

    this.setEvent = (event) => {
        this.removeEvent = event;
        this.render();
    }

    this.render = () => {
        for(let i = 0 ; i < this.$removeButton.length ; i++) {
            this.$removeButton[i].addEventListener('click', (event) => this.removeEvent(event));
        }
    }
}

export default RemoveEvent;