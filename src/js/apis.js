import {tabType} from "./store";

const BASE_URL = 'http://localhost:3000/api/'
export const FETCH_RESULT = {
    OK: 'ok',
    SERVER_ERROR: 'server_error',
    CLIENT_ERROR: 'client_error'
}


export const getMenuByCategory = async (category) => {

    const URL = `${BASE_URL}category/${category}/menu`
    try {
        const response = await fetch(URL)
        if (response.ok) {
            return {
                result: FETCH_RESULT.OK,
                data: await response.json()
            }
        }
    } catch (e) {
        return {
            result: FETCH_RESULT.FAIL,
            message: e
        }
    }
}

export const fetchMenus = async ()=>{
    const promiseAllList = await Promise.all(Object.values(tabType).map(getMenuByCategory))
    const isAllFetched = promiseAllList.every(({result})=>result===FETCH_RESULT.OK)
    if(isAllFetched){
        return promiseAllList
    }
}


export const postMenuByCategory = async (category, item) => {
    const URL = `${BASE_URL}category/${category}/menu`
    try {
        const response = await fetch(URL, {
            method: 'POST', body: JSON.stringify(item), headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            return {
                result: FETCH_RESULT.OK,
                data: await response.json()
            }
        }
        // server error
        return {
            result: FETCH_RESULT.SERVER_ERROR,
            ...await response.json()
        }
    } catch (e) {
        // unControlled error
        return {
            result: FETCH_RESULT.CLIENT_ERROR,
            message: e
        }
    }
}

export const putMenuByCategory = async (category, item) => {
    const URL = `${BASE_URL}category/${category}/menu/${item.id}`
    try {
        const response = await fetch(URL, {
            method: 'PUT', body: JSON.stringify(item), headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            return {
                result: FETCH_RESULT.OK,
                data: response.json()
            }
        }
        return {
            result: FETCH_RESULT.SERVER_ERROR,
            ...await response.json()
        }
    } catch (e) {
        return {
            result: FETCH_RESULT.CLIENT_ERROR,
            message: e
        }
    }
}

export const soldOutMenuByCategory = async (category, id) => {
    const URL = `${BASE_URL}category/${category}/menu/${id}/soldout`
    try {
        const response = await fetch(URL, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            return {
                result: FETCH_RESULT.OK,
                data: response.json()
            }
        }
        return {
            result: FETCH_RESULT.SERVER_ERROR,
            ...await response.json()
        }
    } catch (e) {
        return {
            result: FETCH_RESULT.CLIENT_ERROR,
            message: e
        }
    }
}