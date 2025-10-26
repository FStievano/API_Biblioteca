import express from "express";
import Book from "../models/Book.js";
import Author from "../models/Author.js";

const router = express.Router();

// Cadastrar Livro
router.post("/", async (req, res) => {
  try {
    const { title, synopsis, year, author } = req.body;

    if (!title || !synopsis || !year || !author) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const authorExists = await Author.findById(author);
    if (!authorExists) {
      return res.status(400).json({ message: "Autor não encontrado" });
    }

    const book = await Book.create({ title, synopsis, year, author });
    res.status(201).json(book);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao cadastrar livro", error: error.message });
  }
});

// Listar todos os livros
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("author", "name");
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao listar livros", error: error.message });
  }
});

export default router;
