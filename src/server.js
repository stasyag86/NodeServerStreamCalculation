const csvStreamingParser = require('./parser/csvStreamingParser');
const csvUsersParser = require('./parser/csvUsersParser');
const calcSeconds = require('./calculation/secondsPerUser');
const tracksService = require('./services/tracksService');
const express = require('express');
const app = express();
const port = 9000;

let stream = {};
let usersInfo = {};

async function initStreamList() {

    stream = await csvStreamingParser();
    usersInfo = await csvUsersParser();
}

initStreamList();

app.get('/report', async (req, res) => {
    const calc = await tracksService(stream, usersInfo);
    res.send(calc);
});

app.get('/users/:user_id', (req, res) => {
    const calc = calcSeconds(req.params.user_id,stream);
    res.send(calc);
});


app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});