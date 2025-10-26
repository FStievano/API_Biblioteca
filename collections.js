import mongoose from "mongoose";
import dotenv from "dotenv";
import Author from "./src/models/Author.js";
import User from "./src/models/User.js";
import Book from "./src/models/Book.js";
import Loan from "./src/models/Loan.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Author.collection.drop().catch(() => {});
await User.collection.drop().catch(() => {});
await Book.collection.drop().catch(() => {});
await Loan.collection.drop().catch(() => {});

console.log("Coleções recriadas e vazias!");
await mongoose.disconnect();
