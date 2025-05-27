export interface PatientNotification {
    metadata: {
        visit: string;
        doctor: {
            _id: string;
            firstname: string;
            lastname: string;
        };
    };
    _id: string;
    patient: string;
    type: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface PatientNotificationsResponse {
    notifications: PatientNotification[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    success: boolean;
}