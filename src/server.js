import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.js";
import authorsRoutes from "./routes/authors.js";
import booksRoutes from "./routes/books.js";
import loansRoutes from "./routes/loans.js";

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.log("Erro ao conectar ao MongoDB:", err));

app.use("/users", usersRoutes);
app.use("/authors", authorsRoutes);
app.use("/books", booksRoutes);
app.use("/loans", loansRoutes);

app.listen(process.env.PORT, () => console.log("API rodando na porta " + process.env.PORT));
