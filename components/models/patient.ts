import { UserModel } from "./user";

export interface PatientModel extends Omit<UserModel,'role'> {
    firstname: string;
    lastname: string;
    age: number;
    height: number;
    weight: number;
    nationality: string;
    blood: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    gender: "male" | "female";
    medicalConditions?: string[];
    pastTreatments?: string[];
    majorAccidents?: string[];
    allergies?: string[];
    role?: string;
}