import { UserTypes } from "../enums/UserTypes";

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  registered_courses: string[],
  semester: string,
  student_id: string,
  user_types: UserTypes[];
}

export const emptyUser: User = {
  first_name: "", last_name: "", email: "", username: "", registered_courses: [], user_types: [],
  semester: "",
  student_id: ""
};
