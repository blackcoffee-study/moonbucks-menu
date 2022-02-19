
const localStorageHandler = {
    saveLocalStorage (beverageCategory) {
        localStorage.setItem('categories', JSON.stringify(beverageCategory))
    },
    getLocalStorage(){
        return JSON.parse(localStorage.getItem('categories'))
    }
}


export default localStorageHandler