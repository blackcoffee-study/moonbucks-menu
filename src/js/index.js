function EspressoMenuApp() {
    this.espressoMenuItems = [];
}

function EspressoMenuForm() {
    this.espressoMenuInput = new EspressoMenuInput();

    const $espressoMenuForm = document.getElementById('espresso-menu-form');
    const $espressoMenuSubmitButton = document.getElementById('espresso-menu-submit-button');

    $espressoMenuForm.addEventListener('submit', this.onEspressoMenuSubmit);
    $espressoMenuSubmitButton.addEventListener('click', this.onEspressoMenuSubmitButtonClick);

    this.onEspressoMenuSubmit = event => {
        event.preventDefault();
        this.handleEspressoMenuSubmit();
    
        // for Customized submit event
        return false;
    }

    this.onEspressoMenuSubmitButtonClick = event => {
        event.preventDefault();
        this.handleEspressoMenuSubmit();
    }

    this.handleEspressoMenuSubmit = () => {
        if (!this.espressoMenuInput.isValidValue()) {
            return; 
        }

        const typedValue = this.espressoMenuInput.getValue();
        console.log(typedValue);

        this.espressoMenuInput.resetInput();
        this.espressoMenuInput.focusOnInput();
    }
}

function EspressoMenuInput() {
    const $espressoMenuNameInput = document.getElementById('espresso-menu-name');

    this.isValidValue = () => {
        const inputValue = $espressoMenuNameInput.value;

        // Check if false, falsy value ('', undefined, null)
         return !inputValue;
    }

    this.getValue = () => {
        return $espressoMenuNameInput.value;
    }

    this.resetInput = () => {
        $espressoMenuNameInput.value = '';
    }

    this.focusOnInput = () => {
        $espressoMenuNameInput.focus();
    }
}

function EspressoMenuItem({ key, item }) {
    this.key = key;
    this.item = item;

    this.getTemplateString = () => {
        return '';
    }
}

function EspressoMenuList() {

}
