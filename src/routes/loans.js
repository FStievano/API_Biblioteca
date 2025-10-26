import User from "../models/User.js";
import Book from "../models/Book.js";
import Loan from "../models/Loan.js";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ message: "userId e bookId são obrigatórios" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Livro não encontrado" });

    const now = new Date();

    if (!book.isAvailable && book.expectedReturnDate > now) {
      return res.status(400).json({ message: "Livro não está disponível" });
    }

    const loanDate = now;
    const returnDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 dias depois

    const loan = await Loan.create({
      user: user.name,
      book: book.title,
      loanDate,
      returnDate
    });

    book.isAvailable = false;
    book.expectedReturnDate = returnDate;
    await book.save();

    res.status(201).json(loan);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao realizar empréstimo", error: error.message });
  }
});

// Listar empréstimos
router.get("/", async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao listar empréstimos", error: error.message });
  }
});

export default router;
