import { UserTypes } from "../enums/UserTypes";

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  user_types: UserTypes[];
}

export const emptyUser: User = { first_name: "", last_name: "", email: "", user_types: []};
