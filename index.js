const express = require('express');
const cors = require('cors');

const WEBPATH = process.env.WEBPATH;
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.static(WEBPATH));

app.listen(PORT, () => console.log('Listening on port', PORT));