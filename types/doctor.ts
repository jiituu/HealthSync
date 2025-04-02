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

interface License {
    url: string;
    type: string;
    isVerified: boolean;
    _id: string;
  }
  
  interface Address {
    street: string;
    city: string;
    region: string;
    country: string;
    postalCode: string;
  }
  
  interface Hospital {
    address: Address;
    _id: string;
    name: string;
    branch: number;
    __v: number;
  }
  
export interface DoctorResponse {
    bookmarks: any[]; 
    status: "pending" | "approved" | "rejected"; 
    banned: boolean;
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    age: number;
    gender: "male" | "female"
    role: string;
    phoneNumber: string;
    specializations: string[];
    qualifications: string[];
    licenses: License[];
    hospital: Hospital;
    createdAt: string; 
    updatedAt: string;
    __v: number;
  }
  