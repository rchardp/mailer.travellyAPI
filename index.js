require('dotenv').config();

const router = require('./routes');
const express = require('express');

const app = express();

app.use(express.json());
app.use(router);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});