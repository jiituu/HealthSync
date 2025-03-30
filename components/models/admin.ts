import { UserModel } from "./user";

export interface AdminModel extends Omit<UserModel,"phoneNumber"|"role"> {
    _id:string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    password: string;
}