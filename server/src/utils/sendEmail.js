const nodemailer = require('nodemailer');

     const sendEmail = async (ticket) => {
       const transporter = nodemailer.createTransport({
         host: process.env.SMTP_HOST,
         port: process.env.SMTP_PORT,
         auth: {
           user: process.env.SMTP_USER,
           pass: process.env.SMTP_PASS,
         },
       });

       const mailOptions = {
         from: process.env.SMTP_USER,
         to: 'admin@apihub.com',
         subject: `New Support Ticket #${ticket.id}`,
         html: `
           <h2>New Support Ticket</h2>
           <p><strong>Ticket ID:</strong> ${ticket.id}</p>
           <p><strong>Query:</strong> ${ticket.query}</p>
           <p><strong>Contact:</strong> ${ticket.contact.email || 'N/A'}, ${ticket.contact.username || 'N/A'}</p>
           <p><strong>Timestamp:</strong> ${new Date(ticket.timestamp).toLocaleString()}</p>
           <p>Please review and respond within 30 minutes.</p>
         `,
       };

       await transporter.sendMail(mailOptions);
     };

     module.exports = sendEmail;