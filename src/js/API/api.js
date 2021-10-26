import { HTTP_REQUEST } from "./util.js";

const baseURL  = 'http://localhost:3000/api/category';

export const coffeeAPI = {
  async getMenuList(category){
    return await fetch(`${baseURL}/${category}/menu`)
      .then(data => data.json());
  },
  //메뉴 생성하기
  async postMenu(category, data){
    return await fetch(`${baseURL}/${category}/menu`, HTTP_REQUEST.POST(data))
  },
  //메뉴 수정하기
  async updateMenu(catrgory, id, data){
    return await fetch(`${baseURL}/${catrgory}/menu/${id}`,
      HTTP_REQUEST.PUT(data)).then(data =>data.json())
  },
  //메뉴 soldout 하기
  async soldoutMenu(category, id){
    return await fetch(`${baseURL}/${category}/menu/${id}/soldout`,
      HTTP_REQUEST.PUT()).then(data =>data.json())
  },
  //메뉴삭제하기
  async deleteMenu(category, id){
    return await fetch(`${baseURL}/${category}/menu/${id}`, HTTP_REQUEST.DELETE());
  }

 
} 