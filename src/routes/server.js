import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRoutes from "./users.js";
import authorsRoutes from "./authors.js";
import booksRoutes from "./books.js";
import loansRoutes from "./loans.js";

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/users", usersRoutes);
app.use("/authors", authorsRoutes);
app.use("/books", booksRoutes);
app.use("/loans", loansRoutes);

app.listen(process.env.PORT, () => console.log("API rodando na porta " + process.env.PORT));
