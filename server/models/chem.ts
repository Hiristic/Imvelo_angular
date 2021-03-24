import * as mongoose from 'mongoose';

const chemSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  type: String
});

const Chem = mongoose.model('Chem', chemSchema);

export default Chem;
