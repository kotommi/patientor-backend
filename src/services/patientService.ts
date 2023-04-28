import { Patient, nonSensitivePatient, newPatient } from "../types";
import data from "../../data/patients";
import {v1 as uuid} from "uuid";

const getPatients = (): Patient[] => {
    return data;
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



export default {getPatients, getNonSensitivePatients, addPatient};