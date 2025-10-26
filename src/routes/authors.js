import express from "express";
import Author from "../models/Author.js";

const router = express.Router();

// Cadastrar Autor
router.post("/", async (req, res) => {
  try {
    const { name, birthDate, sex, writingGenre } = req.body;


    if (!name || !birthDate || !sex || !writingGenre) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const allowedGenres = ["Novel", "Poetry", "Fantasy", "Fiction", "Mystery", "Suspense"];
    if (!allowedGenres.includes(writingGenre)) {
      return res.status(400).json({ message: `writingGenre deve ser um dos seguintes valores: ${allowedGenres.join(", ")}` });
    }

    // Verifica se já existe autor com o mesmo nome
    const existingAuthor = await Author.findOne({ name });
    if (existingAuthor) {
      return res.status(400).json({ message: "Autor já cadastrado" });
    }

    // Cria o autor
    const author = new Author({ name, birthDate, sex, writingGenre });
    await author.save();

    res.status(201).json(author);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao cadastrar autor", error: error.message });
  }
});

// Listar todos os autores
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao listar autores", error: error.message });
  }
});

export default router;
