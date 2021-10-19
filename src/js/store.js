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

const getMenuList = (category) => {
  const data = JSON.parse(localStorage.getItem('menu'));
  switch(category){
    case 'espresso'     : return  data.espresso;
    case 'frappuccino'  : return  data.frappuccino;
    case 'blended'      : return  data.blended;
    case 'teavana'      : return  data.teavana;
    case 'desert'       : return  data.desert;
  }
}

const setMenuList = (category, list) => {
  const data = getLocalStorage('menu');

  switch(category){
    case 'espresso'     : data.espresso = list; break;
    case 'frappuccino'  : data.frappuccino = list; break;
    case 'blended'      : data.blended = list; break;
    case 'teavana'      : data.teavana = list; break;
    case 'desert'       : data.desert = list; break;
  }
  setLocaStorage('menu', data);
}

export {setLocaStorage, getLocalStorage, initLocalStorage, getMenuList, setMenuList};

