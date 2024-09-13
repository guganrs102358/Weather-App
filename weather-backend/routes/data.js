const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  loc: { type: String, required: true }
});
const Data = mongoose.model('Data', dataSchema);
module.exports = Data;



