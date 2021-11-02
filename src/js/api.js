export default class Api {
    constructor() {
        this.url = 'http://localhost:3000/api/category';
    }

    async request({url, method, body, header}) {
        try {
            const response = await fetch(url ,{
                method: method,
                body: JSON.stringify(body),
                headers: header
            });
            return await response.json();
        }
        catch(err) {
            alert(err);
        }
    }

    async createMenu({category, data}) {
        return await this.request({
            url: `${this.url}/${category}/menu`, 
            method: 'POST',
            body: {name: data},
            header: {"Content-Type": "application/json",}
        });
    }

    async getMenuList(category) {
        return await this.request({
            url: `${this.url}/${category}/menu`, 
            method: 'GET'
        });
    }

    async editMenu({category, id, data}) {
        return await this.request({
            url: `${this.url}/${category}/menu/${id}`, 
            method: 'PUT',
            body: {name: data},
            header: {"Content-Type": "application/json",}
        });
    }

    async soldOutMenu({category, id}) {
        return await this.request({
            url: `${this.url}/${category}/menu/${id}/soldout`, 
            method: 'PUT'
        });
    }

    async deleteMenu({category, id}) {
        return await this.request({
            url: `${this.url}/${category}/menu/${id}`, 
            method: 'DELETE'
        });
    }
}
