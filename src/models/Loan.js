import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  user: { type: String, required: true },
  book: { type: String, required: true },
  loanDate: { type: Date, required: true },
  returnDate: { type: Date, required: true }
});

const Loan = mongoose.model("Loan", loanSchema);
export default Loan;
