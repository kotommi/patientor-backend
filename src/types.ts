export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface discharge {
    date: string;
    criteria: string;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: discharge;
}

export interface sickLeave {
    startDate: string;
    endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: sickLeave;
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

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

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type newEntry = UnionOmit<Entry, 'id'>;
export type newBaseEntry = UnionOmit<BaseEntry, "id">;
