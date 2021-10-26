import { menuItem, RequestProps } from "./type";
import axios, { AxiosError } from "axios";
import { APIResult } from "./APIresult";

const baseURL = `http://localhost:3000`;
const instance = axios.create({
  baseURL,
});

export const GetMenu = async (category: string) => {
  try {
    const response = await instance.get<menuItem[]>(
      `/api/category/${category}/menu`
    );
    const data = response.data;
    return new APIResult<menuItem[]>(true, data, undefined);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return new APIResult(false, undefined, error.message);
    }
  }
};

export async function AddMenu({ category, name }: RequestProps) {
  try {
    const response = await instance.post<menuItem>(
      `/api/category/${category}/menu`,
      {
        name,
      }
    );

    const data = response.data;
    return new APIResult<menuItem>(true, data, undefined);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return new APIResult(false, undefined, error.message);
    }
  }
}

export async function EditMenu({ category, id, name }: RequestProps) {
  try {
    const response = await instance.put<menuItem>(
      `/api/category/${category}/menu/${id}`,
      { name }
    );
    const data = response.data;
    return new APIResult<menuItem>(true, data, undefined);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return new APIResult(false, undefined, error.message);
    }
  }
}

export async function ToggleSoldOutMenu({ category, id }: RequestProps) {
  try {
    const response = await instance.put<menuItem>(
      `/api/category/${category}/menu/${id}/soldout`
    );

    const data = await response.data;
    return new APIResult<menuItem>(true, data, undefined);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return new APIResult(false, undefined, error.message);
    }
  }
}

export async function DeleteMenu({ category, id }: RequestProps) {
  try {
    const response = await instance.delete<menuItem>(
      `/api/category/${category}/menu/${id}`
    );
    console.log(response);
    return new APIResult<menuItem>(true);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return new APIResult(false, undefined, error.message);
    }
  }
}
