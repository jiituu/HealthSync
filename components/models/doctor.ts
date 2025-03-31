import { UserModel } from "./user";

export interface DoctorModel extends Omit<UserModel,'role'> {
    firstname: string;
    lastname: string;
    age: number;
    gender: "male" | "female";
    specializations: string[];
    qualifications: string[];
    licenses: LicenseModel[];
    role: string;
}

export interface LicenseModel {
    url: string;
    type: string;
    isVerified?: boolean;
}