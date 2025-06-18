const mongoose = require('mongoose');

     const ticketSchema = new mongoose.Schema({
       id: { type: String, required: true, unique: true },
       query: { type: String, required: true },
       contact: {
         email: { type: String },
         username: { type: String },
       },
       sessionId: { type: String, required: true },
       status: { type: String, enum: ['open', 'closed'], default: 'open' },
       timestamp: { type: Date, default: Date.now },
       lastChecked: { type: Date, default: Date.now },
     });

     module.exports = mongoose.model('Ticket', ticketSchema);