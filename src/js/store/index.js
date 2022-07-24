    const defaultMenuCategory = {
        espresso : [],
        frappuccino: [],
        blended: [],
        teavana: [],
        desert: []
    }

export function fetchMenu() {
    let menuItem = JSON.parse(localStorage.getItem("menu"));
    if(!menuItem) {
        menuItem = defaultMenuCategory
        localStorage.menu = JSON.stringify(menuItem);
    };
        
    return menuItem;
}

export function storeMenu(menu, category) {
    let savedMenus =  JSON.parse(localStorage.getItem('menu'));
    savedMenus[category].push({name : menu});
    localStorage.menu = JSON.stringify(savedMenus);
}

export function removeStoreMenu(index, category){
    const savedMenus =  JSON.parse(localStorage.getItem('menu'));
    savedMenus[category].splice(index,1);
    localStorage.menu = JSON.stringify(savedMenus);
}

export function updateStoreMenu(index,item, category){
    const savedMenus =  JSON.parse(localStorage.getItem('menu'));
    savedMenus[category][index] = item;
    localStorage.menu = JSON.stringify(savedMenus);
}

export function updateSoldOutInfoMenu(index, category){
    const savedMenus =  JSON.parse(localStorage.getItem('menu'));

}