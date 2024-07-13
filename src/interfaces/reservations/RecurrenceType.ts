
export interface RecurrenceType {
    label: string;
    key: string;
}

export enum RecurrenceEnum {
    NO_REPEAT = '1',
    DAILY = '2',
    WEEKLY = '3',
    CUSTOM = '5',
};

export const RecurrenceLabels: Record<string, string> = {
    [RecurrenceEnum.NO_REPEAT]: 'Não Repete',
    [RecurrenceEnum.DAILY]: 'Diariamente', 
    [RecurrenceEnum.WEEKLY]: 'Semanalmente',
    [RecurrenceEnum.CUSTOM]: 'Personalizar',
};

export const RecurrenceOptions: RecurrenceType[] = Object.values(RecurrenceEnum).map(key => ({
    label: RecurrenceLabels[key],
    key: key,
}));

export type WeekDay = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
type RecurrenceStringType = 'daily' | 'weekly' | 'monthly';

export const getRecurrenceType = (type: RecurrenceEnum): RecurrenceStringType => {
    switch (type) {
        case RecurrenceEnum.DAILY:
            return 'daily';
        case RecurrenceEnum.WEEKLY:
            return 'weekly';
        default:
            return 'daily';
    }
}

interface RecurrenceDetails {
    days_of_week: WeekDay[];
}

interface Recurrence {
    type: RecurrenceStringType;
    details: RecurrenceDetails;
}

export interface RecurrenceReservationType {
    room_id: string;        
    user_id: string;        
    title: string;          
    recurrence: Recurrence; 
    start_date: string;     
    end_date: string;       
    period: string;         
    hour_start: string;     
    hour_end: string;       
    interval: number;       
}