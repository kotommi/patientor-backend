import { Entry, Diagnosis, Gender, newEntry, newPatient, discharge, HealthCheckRating, sickLeave, newBaseEntry } from "./types";

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
        occupation: parseOccupation(object.occupation),
        entries: []
    };
    return np;
};

// baseEntry
// id: string;
// description: string;
// date: string;
// specialist: string;
// diagnosisCodes?: Array<Diagnosis["code"]>;

export const toNewEntry = (object: unknown): newEntry => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data object: " + object);
    }
    if (!("description" in object) || !("date" in object) || !("specialist" in object) || !("type" in object)) {
        throw new Error("Missing data field in object: " + object.toString());
    }

    const type = parseType(object.type);
    const base: newBaseEntry =  {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist)
    };
    if ("diagnosisCodes" in object) {
        base.diagnosisCodes = parseDiagnosisCodes(object);
    }
    switch (type) {
        case ("Hospital"):
            if (!("discharge" in object)) throw new Error("Missing discharge field in object of type " + type);
            const hospitalEntry: newEntry = {
                type: type,
                discharge: parseDischarge(object.discharge),
                ...base
            };
            return hospitalEntry;
        case ("HealthCheck"):
            if (!("healthCheckRating" in object)) throw new Error("Missing HealthCheckRating field in object: " + object);
            const checkEntry: newEntry = {
                type: type,
                healthCheckRating: parseHCR(object.healthCheckRating),
                ...base
            };
            return checkEntry;
        case ("OccupationalHealthcare"):
            if (!("employerName" in object)) throw new Error("Missing employername field in object of type " + type);
            const occEntry: newEntry = {
                type: type,
                employerName: parseEmployer(object.employerName),
                ...base
            };
            if ("sickLeave" in object) {
                occEntry.sickLeave = parseSickLeave(object.sickLeave);
            }
            return occEntry;
            
    }
};

const parseSickLeave = (sl: unknown): sickLeave => {
    if (!isSickLeave(sl)) throw new Error("Incorrect or missing sickLeave: " + sl);
    const tmp: sickLeave = {
        startDate: sl.startDate,
        endDate: sl.endDate
    };
    return tmp;
};

const isSickLeave = (sl: unknown): sl is sickLeave => {
    if (!sl || typeof sl !== "object") return false;
    if (!("startDate" in sl) || !("endDate" in sl)) return false;
    if (!isString(sl.startDate) || !isDate(sl.startDate) || !isString(sl.endDate) || !isDate(sl.endDate)) return false;
    return true;
}; 

const parseEmployer = (em: unknown): string => {
    if (!em || !isString(em)) throw new Error("Incorrect or missing employername: " + em);
    return em;
};

const parseHCR = (hcr: unknown): HealthCheckRating => {
    if (!isHCR(hcr)) throw new Error("Incorrect or missing healthcheckrating: " + hcr);
    return hcr;
};

const isHCR = (hcr: unknown): hcr is HealthCheckRating => {
    if (!hcr || typeof hcr !== "number" ) return false;
    return Object.values(HealthCheckRating).includes(hcr);
};

const parseDischarge = (dis: unknown): discharge => {
    if (!dis || !isDischarge(dis)) {
        throw new Error("Incorrect or missing discharge object: " + dis);
    }
    const nd: discharge = {
        date: dis.date,
        criteria:  dis.criteria
    };
    return nd;
};

const isDischarge = (dis: unknown): dis is discharge=> {
    if (!dis || typeof dis !== "object") {
        return false;
    }
    if (!("date" in dis) || !("criteria" in dis)) {
        return false;
    }
    if (!isString(dis.criteria) || !isString(dis.date) || !isDate(dis.date)) {
        return false;
    }
    return true;
};

const parseType = (type: unknown): Entry["type"] => {
    if (!type || !isString(type)) {
        throw new Error("");
    }
    if (type === "OccupationalHealthcare" || type === "Hospital" || type === "HealthCheck") {
        return type;
    }
    throw new Error("Type not in OccupationalHealthcare | Hospital | HealthCheck");
};

const parseDescription = (desc: unknown): string => {
    if (!desc || !isString(desc)) {
        throw new Error("Incorrect or missing description: " + desc);
    }
    return desc;
};

const parseSpecialist = (spec: unknown): string => {
    if (!spec || !isString(spec)) {
        throw new Error("Incorrect or missing id: " + spec);
    }
    return spec;
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

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender:" + gender);
    }
    return gender ;
};

const isGender = (g: string): g is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(g);
};

const isString = (s: unknown): s is string => {
    return typeof s === "string" || s instanceof String;
};

const isDate = (d: string): boolean => {
    return Boolean(Date.parse(d));
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        console.log("asd");
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }
    console.log(object.diagnosisCodes);
    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };