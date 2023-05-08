export interface Entry {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
    Female = "female",
    Male = "male",
    Other = "other",
}

export type nonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export type newPatient = Omit<Patient, "id">;