const express = require('express');
const cors = require('cors');
const fs = require('fs');

// ! NON usare fs.promises perché la versione di node su raspberry non le supporta

// porta server
const PORT = process.env.PORT;
// percorso del contenuto statico
const WEBPATH = process.env.WEBPATH;
// percorso di destinazione di westdata
const WASTEDATAPATH = process.env.WASTEDATAPATH;

const app = express();
app.use(cors());
app.use(express.static(WEBPATH));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.all('/hello', (req, res) => {
    console.log(`hello method=${req.method}`);
    res.status(200).end();
});

app.get('/wastedata', (req, res) => {
    fs.readFile(WASTEDATAPATH, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).end();
        } else {
            if (data) {
                res.status(200).json(data).end();
            } else {
                res.status(204).end();
            }
        }
    });
});

app.put('/wastedata', async (req, res) => {
    if (req.body && req.body.types && req.body.calendar) {
        fs.writeFile(
            WASTEDATAPATH,
            JSON.stringify(req.body),
            'utf-8',
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).end();
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
