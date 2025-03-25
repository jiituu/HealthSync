export interface VisitModel{
    id:string,
    timestamp:Date,
    patient:string,
    doctor:string,
    preferredDate:Date,
    reason:string,
    diagnosis?:string,
    prescription?: PrescriptionModel[],
    notes?:string,
    labResults?: LabResultsModel[],
    status: "Scheduled"|"Completed"|"Cancelled",
    approval: "Approved"|"Denied"|"Scheduled",
}

export interface PrescriptionModel{
    medication:string,
    dosage:string,
    instructions:string
}

export interface LabResultsModel{
    testName:string,
    result:string,
    normalRange:string,
    unit:string
}