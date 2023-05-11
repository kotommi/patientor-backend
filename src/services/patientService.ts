import { Patient, nonSensitivePatient, newPatient, Entry } from "../types";
import data from "../../data/patients-full";
import {v1 as uuid} from "uuid";

const getPatients = (): Patient[] => {
    return data;
};

const findById = (id: string): Patient | undefined => {
    return data.find(p => p.id === id);
};

const getNonSensitivePatients = (): nonSensitivePatient[] => {
    return data.map(({id, name, occupation, gender, dateOfBirth}) => {
        return {
            id,
            name,
            occupation,
            gender,
            dateOfBirth
        };
    });
};

const addPatient = (np: newPatient) => {
    const id = uuid();
    const p = {id, ...np};
    data.push(p);
};

const addEntry = (id: string, entry: Entry) => {
    const patient = data.find(p => p.id === id);
    if (!patient) throw new Error("Patient not found");
    patient.entries.push(entry);
};



export default {getPatients, getNonSensitivePatients, addPatient, findById, addEntry};