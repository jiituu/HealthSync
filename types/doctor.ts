export interface DoctorLoginPayload {
    phone?: string;
    email?: string;
    password: string;
}
// export type DoctorSignupPayload = Omit<Doctor, "_id"> & { password: string };
//since the DoctorSignupPayload is the same as Doctor but with an additional password field, we can use Omit to create the type

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
    export interface Doctor {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    age: number;
    gender: string;
    phoneNumber: string;
    specializations: string[];
    qualifications: string[];
    licenses: {
      url: string;
      type: string;
      isVerified: boolean;
      _id: string;
    }[];
  }
  
  export interface DoctorApiResponse {
    success: boolean;
    data: Doctor;
    message?: string;
  }