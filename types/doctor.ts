export interface DoctorLoginPayload {
    phone?: string;
    email?: string;
    password: string;
}

export interface DoctorSignupPayload {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phoneNumber: string;
    age: number
    hospital?: string
    gender: 'male' | 'female';
    role: string;
    specializations: string[];
    qualifications: string[];
    licenses: DoctorLicense[];
}


interface DoctorLicense {
    url: string;
    type: string;
    isVerified: boolean;
}