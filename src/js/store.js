const setLocaStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getLocalStorage = (key) => {
  const menuList =  localStorage.getItem(key);
  return JSON.parse(menuList);
}

const initLocalStorage = () =>{
  const data = {
    'category' : 'espresso',
    'espresso' : [],
    'frappuccino' :[],
    'blended' : [],
    'teavana' :[],
    'desert' :[]
  }
  return  getLocalStorage('menu')?? setLocaStorage('menu', data);
}

export {setLocaStorage, getLocalStorage, initLocalStorage};

