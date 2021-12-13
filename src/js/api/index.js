const BASE_URL = 'http://localhost:3000/api';
const Api = {
    async getAllMenuByCategory(category) {
        const response = await fetch(`${BASE_URL}/category/${category}/menu`);
        if(!response.ok){
            alert('잘못된 값을 입력하였습니다.');
        }
        return response.json();
    },
    async createMenu(category, name){
        const response = await fetch(`${BASE_URL}/category/${category}/menu`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({name: name}),
        });
        if(!response.ok){
            alert('잘못된 값을 입력하였습니다.');
        }
        return response.json();
    },
    async updateMenu(category, name, menuId){
        const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`,{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({name}),
        });
        if(!response.ok){
            alert('잘못된 값을 입력하였습니다.');
        }
        return response.json();
    },
    async toggleSoldOutMenu(category,menuId){
        const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}/soldout`,{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
            },
        });
        if(!response.ok){
            alert('잘못된 값을 입력하였습니다.');
        }
        return response.ok;
    },
    async deleteMenu(category, menuId){
        const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`,{
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
            },
        });
        if(!response.ok){
            alert('잘못된 값을 입력하였습니다.');
        }
        return response.ok;
    }
}
export {Api};