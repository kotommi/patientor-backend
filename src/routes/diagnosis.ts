import express from "express";

const diagRouter = express.Router();

diagRouter.get("/", (_req, res) => {
    res.send("fetch");
});

diagRouter.post("/", (_req, res) => {
    res.send("saved");
});

export default diagRouter;