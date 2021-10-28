import { APIResult } from "./APIresult";
import { Category, menuItem } from "./types";

export class AddDTO {
  constructor(public category: Category, public name: string) {}
}

export class DeleteDTO {
  constructor(public category: Category, public id: string) {}
}

export class EditDTO {
  constructor(
    public category: Category,
    public id: string,
    public name: string
  ) {}
}

export class ToggleDTO {
  constructor(public category: Category, public id: string) {}
}
