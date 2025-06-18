const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  messageId: { type: String, required: true },
  isPositive: { type: Boolean, required: true },
  sessionId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', feedbackSchema);