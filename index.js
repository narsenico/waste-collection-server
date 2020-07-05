const express = require('express');
const cors = require('cors');
const fs = require('fs');

// porta server
const PORT = process.env.PORT;
// percorso del contenuto statico
const WEBPATH = process.env.WEBPATH;
// percorso di destinazione di westdata
const WASTEDATADEST = process.env.WASTEDATADEST;

const app = express();
app.use(cors());
app.use(express.static(WEBPATH));
app.use(express.json());

app.get('/hello', (req, res) => {
    res.status(200).end();
});

app.put('/copywastedata', async (req, res) => {
    if (req.body && req.body.types && req.body.calendar) {
        fs.writeFile(
            WASTEDATADEST,
            JSON.stringify(req.body),
            'utf-8',
            (err) => {
                if (err) {
                    res.status(500).send(e.message).end();
                } else {
                    res.status(200).end();
                }
            }
        );
        res.status(200).end();
    } else {
        res.status(400).send('wastedata not found').end();
    }
});

app.post('/restartrednode', (req, res) => {
    // TODO: riavviare rednode
    res.status(200).end();
});

app.listen(PORT, () => console.log('Listening on port', PORT));
