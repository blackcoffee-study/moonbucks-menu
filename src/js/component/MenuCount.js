function MenuCount() {
    this.$menuCount = document.getElementsByClassName("menu-count")[0];

    this.state = 0;

    this.setState = (count) => {
        this.state = count;
        this.render();
    }

    this.render = () => {
        this.$menuCount.textContent = `총 ${this.state}개`
    }
}

export default MenuCount;