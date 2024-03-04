"use strict";
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.json({
        msg: "on /"
    });
});
app.post('/api/code', (req, res) => {
    const body = req.body;
    console.log(body.code);
});
app.listen(4000, () => console.log("Listening on Port 4000"));
