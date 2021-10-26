const BASE_URL = "http://localhost:3000/api/";
export class ServerMenuAPI {
    async getCategories() {
        return [
            {
                name: "에스프레소",
                icon: "☕",
                key: "espresso",
            },
            {
                name: "프라푸치노",
                icon: "🥤",
                key: "frappuccino",
            },
            {
                name: "블렌디드",
                icon: "🍹",
                key: "blended",
            },
            {
                name: "티바나",
                icon: "🫖",
                key: "teavana",
            },
            {
                name: "디저트",
                icon: "🍰",
                key: "desert",
            },
        ];
    }

    _convert(serverMenu) {
        return {
            id: serverMenu.id,
            content: serverMenu.name,
            soldout: serverMenu.isSoldOut,
        };
    }

    async getMenu(categoryKey) {
        const newMenu = await this._request("GET", `category/${categoryKey}/menu`);
        return newMenu.map(this._convert);
    }

    async createMenu(categoryKey, menuName) {
        const newMenu = await this._request("POST", `category/${categoryKey}/menu`, { name: menuName });

        return this._convert(newMenu);
    }

    async editMenu(categoryKey, menu) {
        const newMenu = await this._request("PUT", `category/${categoryKey}/menu/${menu.id}`, { name: menu.content });
        return this._convert(newMenu);
    }

    async soldOutMenu(categoryKey, menu) {
        const newMenu = await this._request("PUT", `category/${categoryKey}/menu/${menu.id}/soldout`);
        return this._convert(newMenu);
    }

    async deleteMenu(categoryKey, menu) {
        await this._request("DELETE", `category/${categoryKey}/menu/${menu.id}`);
    }

    async _request(method, url, data = null) {
        let res;

        res = await fetch(BASE_URL + url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: data ? JSON.stringify(data) : undefined,
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new APIFailError(res.status, errorData);
        }

        const resultRaw = await res.text();
        if (resultRaw[0] === "{" || resultRaw[0] === "[") {
            const resultData = JSON.parse(resultRaw);
            return resultData;
        } else {
            return null;
        }
    }
}

class APIFailError extends Error {
    constructor(statusCode, errorData) {
        super(`API ERROR ${statusCode}`);
        this.data = errorData;
    }
}
