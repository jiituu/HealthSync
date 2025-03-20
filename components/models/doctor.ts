export interface DoctorModel {
    id:string;
    firstname: string;
    lastname: string;
    email: string;
    age: number;
    gender: "male" | "female";
    phoneNumber: string;
    specializations: string[];
    qualifications: string[];
    licenses: LicenseModel[];
    role?: string;
    password: string;
}

export interface LicenseModel {
    url: string;
    type: string;
    isVerified?: boolean;
}