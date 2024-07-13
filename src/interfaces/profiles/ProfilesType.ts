export type DataIndexProfileType = keyof ProfilesType;

export type Profiles = 'admin' | 'comum' | 'master';

export const profilesTagColor: Record<Profiles, string> = {
    admin: 'orange',
    comum: 'geekblue',
    master: 'lime',
};

export interface ProfilesType {
    value: Profiles;
    label: string;
}

export const profiles: ProfilesType[] = [
    { value: 'admin', label: 'Administrador' },
    { value: 'comum', label: 'Comum' },
    { value: 'master', label: 'Administrador Salas' },
];