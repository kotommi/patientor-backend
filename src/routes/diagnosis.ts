import express from "express";
import diagService from "../services/diagService";

const diagRouter = express.Router();

diagRouter.get("/", (_req, res) => {
    res.send(diagService.getEntries());
});

diagRouter.post("/", (_req, res) => {
    res.send("saved");
});

export default diagRouter;