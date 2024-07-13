import { ClassesType } from "../classes/ClassesType";

export type DataIndexUserType = keyof UsersType;

export interface UsersType {
    id: number;
    status: string;
    name: string;
    email: string;
    profile: string;
    classes?: ClassesType[];
}

export const attributeDescriptions: Record<DataIndexUserType, string> = {
    id: "Id",
    status: "Status",
    name: "Nome",
    email: "E-mail",
    profile: "Perfil",
    classes: "Salas"
};

