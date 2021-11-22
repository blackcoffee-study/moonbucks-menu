'use strict';

const submitMenu = document.querySelector('#espresso-menu-submit-button');
submitMenu.addEventListener("click", addMemuList);

function addMemuList (){
    let inputMemuName = document.querySelector('#espresso-menu-name').value;
    const p = document.createElement("p");

    if (inputMemuName){
        p.setAttribute('id',inputMemuName);
        const textNode = document.createTextNode(inputMemuName);
        p.appendChild(textNode);

        document.querySelector('#espresso-menu-list').appendChild(p);
        document.querySelector('#espresso-menu-list').focus();

        document.querySelector('#espresso-menu-name').value = null;
    }
    
};

