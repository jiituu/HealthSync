export type notificationType = 'visitRequest'|'noAction'

export interface NotificationModel {
    id: string;
    targetID:string;
    triggerID?: string;
    message: string;
    time: string;
    type: notificationType;
}