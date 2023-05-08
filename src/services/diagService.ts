import data from "../../data/diagnoses";
import { Entry } from "../types";

const getEntries = (): Entry[] => {
    return data;
};

const addDiagnosis = (diag: Entry) => {
    console.log(diag);
    return null;
};

export default {getEntries, addDiagnosis};