import axios, { AxiosResponse } from "axios";
import { menuItem } from "./type";

const baseURL = `http://localhost:3000`;
const instance = axios.create({
  baseURL,
});

export const GetMenu = async (category: string) => {
  try {
    const response = await instance.get<menuItem[]>(
      `/api/category/${category}/menu`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    alert(error);
  }
};

export async function AddMenu({ category, name }) {
  try {
    const response = await instance.post<menuItem>(
      `/api/category/${category}/menu`,
      {
        name,
      }
    );
    return await response.data;
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

export async function EditMenu({ category, menuId, name }) {
  try {
    const response = await instance.put<menuItem>(
      `/api/category/${category}/menu/${menuId}`,
      { name }
    );
    return await response.data;
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

export async function ToggleSoldOutMenu({ category, menuId }) {
  try {
    const response = await instance.put<menuItem>(
      `/api/category/${category}/menu/${menuId}/soldout`
    );
    return await response.data;
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

export async function DeleteMenu({ category, menuId }) {
  try {
    const response = await instance.delete<menuItem>(
      `/api/category/${category}/menu/${menuId}`
    );
    return await response.data;
  } catch (error) {
    console.error(error);
    alert(error);
  }
}
