import { Patient, nonSensitivePatient } from "../types";
import data from "../../data/patients";

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



export default {getPatients, getNonSensitivePatients};