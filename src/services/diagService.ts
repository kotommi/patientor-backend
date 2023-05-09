import data from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
    return data;
};

const addDiagnosis = (diag: Diagnosis) => {
    console.log(diag);
    return null;
};

export default {getEntries, addDiagnosis};