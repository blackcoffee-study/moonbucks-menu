'use strict';

const submitMenu = document.querySelector('#espresso-menu-submit-button');
submitMenu.addEventListener("click", addMemuList);

function addMemuList (){
    let inputMemuName = document.querySelector('#espresso-menu-name').value;
    const li = document.createElement("li");

    if (inputMemuName){
        li.setAttribute('id',inputMemuName);
        const textNode = document.createTextNode(inputMemuName);
        li.appendChild(textNode);

        document.querySelector('#espresso-menu-list').appendChild(li);
        document.querySelector('#espresso-menu-list').focus();

        document.querySelector('#espresso-menu-name').value = null;
    }
    
};
