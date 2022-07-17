function EditEvent() {
    this.$editButton = document.getElementsByClassName("menu-edit-button");
    this.editEvent;

    this.setEvent = (event) => {
        this.editEvent = event;
        this.render();
    }

    this.render = () => {
        for(let i = 0 ; i < this.$editButton.length ; i++) {
            this.$editButton[i].addEventListener('click', (event) => this.editEvent(event));
        }
    }

}

export default EditEvent;