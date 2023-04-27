import data from "../../data/diagnoses";

const getEntries = () => {
    return data;
};

const addDiagnosis = diag => {
    console.log(diag);
    return null;
}

export default {getEntries, addDiagnosis};