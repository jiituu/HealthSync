export interface PatientLoginPayload {
    password: string;
    phone?: string;
    email?: string;
}


export interface PatientSignupPayload {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phoneNumber: string;
    age: number;
    birthDate?: Date | null;
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


export interface PatientResponse {
    bookmarks: any[];
    banned: boolean;
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    age: number;
    role: "patient";
    height: number;
    weight: number;
    blood: string;
    gender: "male" | "female"
    phoneNumber: string;
    medicalConditions: string[];
    pastTreatments: string[];
    majorAccidents: string[];
    allergies: string[];
    __v: number;
    createdAt: string;

}



export interface Prescription {
    visitId: string;
    doctor: string;
    startDate: string;
    endDate: string;
    status: string;
    prescription: Medication[];
}

export interface Medication {
    medication: string;
    dosage: string;
    instructions: string;
    frequency: string;
    _id: string;
}

export interface PrescriptionResponse {
    success: boolean;
    data: {
        prescriptions: Prescription[];
        totalCount: number;
        currentPage: number;
        totalPages: number;
    };
}