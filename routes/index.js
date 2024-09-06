// backend/routes/index.js

import express from "express";
import multer from "multer";
import { getUsers, addUsers, deleteUsers, patchUsers } from "../controller/index.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router
    .get("/", getUsers)
    .post("/", upload.single("image"), addUsers)
    .delete("/:id", deleteUsers)
    .patch("/:id", upload.single("image"), patchUsers);

export default router;
