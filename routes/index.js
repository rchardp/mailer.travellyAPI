const router = require('express').Router();
const mailer = require('../mailer');

router.get('/', (req, res) => {
  res.send(`Hello from ${process.env.RY_HOST || 'nowhere'}`);
});

router.post('/contact-us', (req, res) => {
  let mail = {
    from: `"Travelly API" <${process.env.MAILER_USER}>`,
    to: process.env.SV_EMAIL,
    subject: "Travelly - Contact Us",
    text: `
    Name: ${req.body.name}
    Email: ${req.body.mail}
    Phone: ${req.body.telephone}
    Message: ${req.body.message}
    `
  };
  
  mailer.sendMail(mail)
  .then((info) => {
    console.log('Message sent: %s', info.messageId);
    return res.status(202).send({ message: 'Accepted', success: true });
  })
  .catch((err) => {
    console.log('ERROR:', err);
    return res.status(503).send({ message: 'Failed', success: false });
  });
})

module.exports = router;