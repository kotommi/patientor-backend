import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";


const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

patientRouter.get("/:id", (req, res) => {
    const patient = patientService.findById(req.params.id);
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
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