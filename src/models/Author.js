import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  birthDate: { type: Date, required: true },
  sex: { type: String, required: true },
  writingGenre: { 
    type: String, 
    required: true, 
    enum: ["Novel", "Poetry", "Fantasy", "Fiction", "Mystery", "Suspense"]
  }
});

const Author = mongoose.model("Author", authorSchema);

export default Author;
