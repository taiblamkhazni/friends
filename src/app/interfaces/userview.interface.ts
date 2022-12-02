import { InteretInterface } from "./interet.interface";

export interface UserviewInterface {
  id?: number;
  email?: string;
  lastName: string;
  firstName?: string;
  birthDate?: string;
  password?: string;
  isAdmin?: boolean;
  address?: string;
  phone?: string;
  interests?: InteretInterface[];
}
