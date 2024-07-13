export interface ClassesType {
    id: number;
    name: string;
    floor: number;
}

export enum FloorsEnum {
    TERREO = 0,
    ANDAR1 = 1,
    ANDAR2 = 2,
    ANDAR3 = 3,
    ANDAR4 = 4
}

export const FloorsLabels: Record<string, string> = {
    [FloorsEnum.TERREO]: 'TÉRREO',
    [FloorsEnum.ANDAR1]: '1º ANDAR',
    [FloorsEnum.ANDAR2]: '2º ANDAR',
    [FloorsEnum.ANDAR3]: '3º ANDAR',
    [FloorsEnum.ANDAR4]: '4º ANDAR'
};