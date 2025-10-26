import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  synopsis: { type: String, required: true },
  year: { type: Number, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
  isAvailable: { type: Boolean, default: true },
  expectedReturnDate: { type: Date, default: null }
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
