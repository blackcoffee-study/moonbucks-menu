'use strict';

const submitMenu = document.querySelector('#espresso-menu-submit-button');
submitMenu.addEventListener("click", addItem);

function addItem (){
    let item = document.querySelector('#espresso-menu-name').value;
    const p = document.createElement("p");

    if (item){
        p.setAttribute('id',item);
        const textNode = document.createTextNode(item);
        p.appendChild(textNode);

        document.querySelector('#espresso-menu-list').appendChild(p);
        document.querySelector('#espresso-menu-list').focus();

        document.querySelector('#espresso-menu-name').value = null;
    }
};

