
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

export interface Visit {
    _id: string;
    patient: string;
    doctor: string;
    preferredDate: string;
    reason: string;
    diagnosis?: string;
    notes?: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled'; // Add other possible statuses
    approval: 'Approved' | 'Pending' | 'Rejected'; // Add other possible approval statuses
    prescription: Prescription[];
    labResults: LabResult[];
    createdAt: string;
    updatedAt: string;
    __v?: number;
    endDate?: string;
    startDate?: string;
}

export interface VisitsResponse {
    data: {
        visits: Visit[];
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