import 'next-auth';
import {DoctorModel} from '@/components/models/doctor';
import {PatientModel} from '@/components/models/patient';
import {AdminModel} from '@/components/models/admin';

declare module 'next-auth' {
    interface User {
        role:'doctor'|'patient'|'admin';
        user: (DoctorModel & PatientModel & AdminModel)
    }

    interface Session {
        lastLogin: string;
        role:'doctor'|'patient'|'admin';
        user: (DoctorModel & PatientModel & AdminModel)
    } 
}

declare module "next-auth/jwt" {
    interface JWT {
        lastLogin: string;
        role:'doctor'|'patient'|'admin';
        user: (DoctorModel & PatientModel & AdminModel)
    }
}
