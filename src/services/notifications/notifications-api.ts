import { NotificationType } from "@/interfaces/notifications/NotificationsType";
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export function useGetNotifications(): {
    notifications: NotificationType[];
    loading: boolean;
    error: string | null;
} {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/_fakedata_/notifications.json');
                const data = await response.json();
                setNotifications(mapFakeDataToNotifications(data));
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch notifications');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { notifications, loading, error };
}

function mapFakeDataToNotifications(data: any): NotificationType[] {

    console.log(data);

    return data.map((item: any) => {
        var action = undefined;

        if (item.action !== undefined) {

            var classe = {
                id: item.action.reservation.classe.id,
                name: item.action.reservation.classe.name,
                floor: item.action.reservation.classe.floor
            }

            var reservation = {
                title: item.action.reservation.title,
                owner: item.action.reservation.owner,
                date: dayjs(item.action.reservation.date),
                time: item.action.reservation.time.map((time: string) => dayjs(time, 'HH:mm')),
                recurrence: item.action.reservation.recurrence,
                shift: item.action.reservation.shift,
                classe: classe,
                observation: item.action.reservation.observation,
                user: item.action.reservation.user
            }
    
            action = {
                reservation: reservation,
                sugestedClassroom: item.action.sugestedClassroom
            }
        }

        return {
            message: item.message,
            unread: item.unread,
            action: action
        };
    });
}