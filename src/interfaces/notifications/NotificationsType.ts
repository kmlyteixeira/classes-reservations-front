import { ReservationsType } from "../reservations/ReservationsType";

export interface NotificationType {
    message: string;
    unread: boolean;
    action?: NotificationActionType;
}

export interface NotificationActionType {
    reservation: ReservationsType;
    sugestedClassroom: string;
}