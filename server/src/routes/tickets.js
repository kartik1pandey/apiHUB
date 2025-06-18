const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const sendEmail = require('../utils/sendEmail');

router.post('/', async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    await sendEmail(ticket);
    res.status(201).json({ message: 'Ticket created', ticket });
  } catch (err) {
    console.error('Error creating ticket:', err);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

module.exports = router;