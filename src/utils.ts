import { newPatient } from "./types";

export const toNewPatient = (object: unknown): newPatient => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data object: " + object);
    }
    if (!("name" in object) || !("ssn" in object) || !("dateOfBirth" in object) || !("gender" in object) || !("occupation" in object)) {
        throw new Error("Missing data field in object: " + object);
    }
    const np: newPatient = {
        name: parseName(object.name),
        ssn: parseSSN(object.ssn),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };
    return np;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing ssn: " + ssn);
    }
    return ssn;
};

const parseOccupation = (occ: unknown): string => {
    if (!occ || !isString(occ)) {
        throw new Error("Incorrect or missing occupation:" + occ);
    }
    return occ ;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name:" + name);
    }
    return name ;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date )) {
        throw new Error("Incorrect or missing date:" + date);
    }
    return date ;
};

const parseGender = (gender: unknown): string => {
    if (!gender || !isString(gender)) {
        throw new Error("Incorrect or missing gender:" + gender);
    }
    return gender ;
};

const isString = (s: unknown): s is string => {
    return typeof s === "string" || s instanceof String;
};

const isDate = (d: string): boolean => {
    return Boolean(Date.parse(d));
};