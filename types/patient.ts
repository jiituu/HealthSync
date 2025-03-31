export interface PatientLoginPayload {
    password: string;
    phone?: string;
    email?:string;
}


export interface PatientSignupPayload {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phoneNumber: string;
    age: number;
    gender: 'male' | 'female';
    height: number;
    weight: number;
    blood: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    nationality: string;
    medicalConditions?: string[];
    allergies?: string[];
    pastTreatments?: string[];
    majorAccidents?: string[];
}


