import { RecurrenceEnum } from "./RecurrenceType";

export interface RepetitionType {
    key: string;
    label: string;
};

export enum RepetitionEnum {
    DAY = '1',
    WEEK = '2'
};

export const RepetitionLabelSingular: Record<number, string> = {
    [RepetitionEnum.DAY]: 'dia',
    [RepetitionEnum.WEEK]: 'semana'
};

export const RepetitionLabelPlural: Record<number, string> = {
    [RepetitionEnum.DAY]: 'dias',
    [RepetitionEnum.WEEK]: 'semanas'
};

export const RepetitionOptionsSingular: RepetitionType[] = Object.values(RepetitionEnum).map(key => ({
    key: key,
    label: RepetitionLabelSingular[key]
}));

export const RepetitionOptionsPlural: RepetitionType[] = Object.values(RepetitionEnum).map(key => ({
    key: key,
    label: RepetitionLabelPlural[key]
}));

export const RecurrenceToRepetitionMap: { [key in RecurrenceEnum]: RepetitionEnum } = {
    [RecurrenceEnum.DAILY]: RepetitionEnum.DAY,
    [RecurrenceEnum.WEEKLY]: RepetitionEnum.WEEK,
    [RecurrenceEnum.NO_REPEAT]: RepetitionEnum.DAY,
    [RecurrenceEnum.CUSTOM]: RepetitionEnum.DAY,
};
