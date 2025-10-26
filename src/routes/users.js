import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const exists = await User.findOne({ name: req.body.name });
    if (exists) return res.status(400).json({ message: "Usuário já existe" });
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch {
    res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;
