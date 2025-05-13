export interface VisitModel {
    _id: string,
    patient: string,
    doctor: string,
    preferredDate: Date,
    startDate: Date,
    endDate: Date
    reason: string,
    diagnosis?: string,
    prescription?: PrescriptionModel[],
    notes?: string,
    labResults?: LabResultsModel[],
    status: "Scheduled" | "Completed" | "Cancelled",
    approval: "Approved" | "Denied" | "Scheduled",
    createdAt: string
}

export interface PrescriptionModel {
    medication: string,
    dosage: string,
    instructions: string
}

export interface LabResultsModel {
    testName: string,
    result: string,
    normalRange: string,
    unit: string
}

export interface Prescription {
    medication: string;
    dosage: string;
    instructions: string;
    _id: string;
}

export interface LabResult {
    testName: string;
    result: string;
    normalRange: string;
    unit: string;
    _id: string;
}

// export interface Visit {
//     _id: string;
//     patient: string;
//     doctor: string;
//     preferredDate: string;
//     reason: string;
//     diagnosis?: string;
//     notes?: string;
//     status: 'Scheduled' | 'Completed' | 'Cancelled'; 
//     approval: 'Approved' | 'Pending' | 'Rejected'; 
//     prescription: Prescription[];
//     labResults: LabResult[];
//     createdAt: string;
//     updatedAt: string;
//     __v?: number;
//     endDate?: string;
//     startDate?: string;
// }

export interface VisitsResponse {
    data: {
        visits: VisitModel[];
        totalCount: number;
        currentPage: number;
        totalPages: number;
    };
    success: boolean;
}

export interface PrescriptionWithStatus extends Prescription {
    status: 'Taken' | 'Missed'; // Add other possible medication statuses
    visitDate?: string;
}