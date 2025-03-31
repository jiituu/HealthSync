export interface UserModel{
    _id:string;
    email:string;
    password:string;
    phoneNumber:string;
    role:'doctor'|'patient'|'admin';
}