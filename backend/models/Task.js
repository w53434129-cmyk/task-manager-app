const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: {
    type: String,
    enum: ["Todo", "In Progress", "Done"], // only allow these values
    default: "Todo"
  },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true }); // optional, adds createdAt and updatedAt

module.exports = mongoose.model('Task', TaskSchema);
