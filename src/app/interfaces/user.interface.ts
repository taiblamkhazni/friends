import { InteretInterface } from "./interet.interface";
import { UserviewInterface } from "./userview.interface";
export interface UserInterface {
  id?: number;
  email: string;
  lastName: string;
  firstName: string;
  birthDate: string;
  password?: string;
  isAdmin?: boolean;
  address?: string;
  phone?: string;
  interests?: InteretInterface[];
  interestsIds?: number[];
  friends?: UserviewInterface[];
  friendsIds?: number[];
}
