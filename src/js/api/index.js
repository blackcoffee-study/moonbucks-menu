import { BASE_URL, PUT, POST, DELETE } from "../constant/api.js";

const request = async (url = "", options) => {
    try {
        const res = await fetch(`${BASE_URL}/${url}`, options);

        if(!res.ok) throw res.json();
        return await((options && options.method) !== DELETE ? res.json() : {});     
    } catch(error) {
        error.then(e => {
            alert(e.message);
        });
    }
};

const options = (method, body) =>  {
    return {
        method, 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    }
}

export const http = {
    get: (url) => {return request(url)},
    post: (url, body) => {
        return request(url, options(POST, body));
    },
    put: (url, body) => {
        return request(url, options(PUT, body));
    },
    delete: (url) => request(url, options(DELETE)),
};