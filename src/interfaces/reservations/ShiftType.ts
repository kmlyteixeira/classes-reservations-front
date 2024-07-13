import { CheckboxOptionType } from "antd";
import dayjs, { Dayjs } from "dayjs";

export interface ShiftType {
    label: string;
    key: string;
}

export enum ShiftEnum {
    MORNING = '1',
    AFTERNOON = '2',
    NIGHT = '3',
};

export const ShiftLabels: Record<string, string> = {
    [ShiftEnum.MORNING]: 'Manhã',
    [ShiftEnum.AFTERNOON]: 'Tarde',
    [ShiftEnum.NIGHT]: 'Noite',
};

export const ShiftOptions: CheckboxOptionType[] = [
    {
        label: 'Manhã',
        value: ShiftEnum.MORNING,
    },
    {
        label: 'Tarde',
        value: ShiftEnum.AFTERNOON,
    },
    {
        label: 'Noite',
        value: ShiftEnum.NIGHT,
    },
];

export const ShiftTimes: Record<string, [Dayjs, Dayjs]> = {
    [ShiftEnum.MORNING]: [dayjs('08:00:00', 'HH:mm:ss'), dayjs('12:00:00', 'HH:mm:ss')],
    [ShiftEnum.AFTERNOON]: [dayjs('13:00:00', 'HH:mm:ss'), dayjs('17:00:00', 'HH:mm:ss')],
    [ShiftEnum.NIGHT]: [dayjs('19:00:00', 'HH:mm:ss'), dayjs('22:00:00', 'HH:mm:ss')],
};