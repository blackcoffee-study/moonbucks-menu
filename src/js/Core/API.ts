import { menuItem, APIdto, Category } from "./types";
import axios, { AxiosError } from "axios";
import { APIResult } from "./APIresult";
import { AddDTO, DeleteDTO, EditDTO, ToggleDTO } from "./DTO";

const baseURL = `http://localhost:3000`;
const instance = axios.create({
  baseURL,
});

export const GetMenu = async (
  category: string
): Promise<APIResult<menuItem> | undefined> => {
  try {
    const response = await instance.get<menuItem>(
      `/api/category/${category}/menu`
    );
    const data = response.data;
    return new APIResult<menuItem>(true, data, undefined);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new APIResult<menuItem>(false, undefined, error.message);
    }
  }
};

export const AddMenu = async (
  addDTO: AddDTO
): Promise<APIResult<menuItem> | undefined> => {
  const { category, name } = addDTO;
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
      throw new APIResult<menuItem>(false, undefined, error.message);
    }
  }
};

export const EditMenu = async (editDTO: EditDTO) => {
  const { category, id, name } = editDTO;
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
};

export async function ToggleSoldOutMenu(toggleDTO: ToggleDTO) {
  const { category, id } = toggleDTO;
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

export const DeleteMenu = async (deleteDTO: DeleteDTO) => {
  const { category, id } = deleteDTO;
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
};
