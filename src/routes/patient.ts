import express from "express";
import patientService from "../services/patientService";


const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

patientRouter.post("/", (req, res) => {
    const {name, ssn, dateOfBirth, gender, occupation} = req.body;
    const newPatient = {name, ssn, dateOfBirth, gender, occupation};
    patientService.addPatient(newPatient);
    res.status(200).json(newPatient);
});

export default patientRouter;