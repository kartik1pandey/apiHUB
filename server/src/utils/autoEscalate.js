const cron = require('cron');
const Ticket = require('../models/Ticket');
const sendEmail = require('./sendEmail');

const startAutoEscalation = () => {
  const job = new cron.CronJob('*/30 * * * *', async () => {
    try {
      const tickets = await Ticket.find({ status: 'open', lastChecked: { $lt: new Date(Date.now() - 30 * 60 * 1000) } });
      for (const ticket of tickets) {
        await sendEmail(ticket);
        ticket.lastChecked = new Date();
        await ticket.save();
      }
    } catch (err) {
      console.error('Auto-escalation failed:', err);
    }
  });
  job.start();
};

module.exports = startAutoEscalation;