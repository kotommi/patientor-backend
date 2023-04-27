import data from "../../data/diagnoses";
import { diagnosisEntry } from "../types";

const getEntries = (): diagnosisEntry[] => {
    return data;
};

const addDiagnosis = (diag: diagnosisEntry) => {
    console.log(diag);
    return null;
};

export default {getEntries, addDiagnosis};