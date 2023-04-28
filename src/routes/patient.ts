import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";


const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

patientRouter.post("/", (req, res) => {
    try {
        const np = toNewPatient(req.body);
        patientService.addPatient(np);
        res.status(200).json(np);
    } catch (error: unknown) {
        let emsg = "Something went wrong: ";
        if (error instanceof Error) {
            emsg += "Error: " + error.message;
        }
        res.status(400).send(emsg);
    }
});

export default patientRouter;