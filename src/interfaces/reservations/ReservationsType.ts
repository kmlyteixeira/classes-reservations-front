import { Dayjs } from 'dayjs';
import { ClassesType } from '../classes/ClassesType';

export type DataIndexReservationsType = keyof ReservationsType;

export type CreateUpdateReservationPayload = Omit<ReservationsType, 'previousId' | 'nextId' | 'date' | 'time' | 'class'>;

export interface ReservationsType {
    id: number;
    title: string;
    owner: string;
    dateStart: string;
    dateEnd: string;
    observation: string;
    isCompleted: boolean;
    previousId: number;
    nextId: number;
    class: ClassesType;
    date: Dayjs;
    time: Dayjs[];
}

export const attributeDescriptions: Record<DataIndexReservationsType, string> = {
    id: '',
    title: 'Título',
    owner: 'Responsável',
    dateStart: 'Data de início',
    dateEnd: 'Data de término',
    observation: 'Observação',
    isCompleted: 'Status',
    previousId: '',
    nextId: '',
    class: '',
    date: 'Data',
    time: 'Horário',
}
