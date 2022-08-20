import express from "express";
import { deleteUser, getUser, update } from "../controllers/user-controller.js";
import verifyToken from "../verifyToken.js";

const router = express.Router();

router.put("/:id", verifyToken, update);

router.delete("/:id", verifyToken, deleteUser);

router.get("/:id", getUser);

export default router;
