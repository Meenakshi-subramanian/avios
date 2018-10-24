
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
// const API_KEY = require('./apiKey');
console.log("Beginning")
const server = express();
server.use(bodyParser.urlencoded({
extended: true
}));

server.use(bodyParser.json());

// server.get('/', (res)=> {
//     console.log('this is a GET');
//     res.json({ user: 'tobi' })
//     res.end();
// });

server.post('/', (req,res) => {

// const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
const reqUrl = encodeURI("https://s3.ap-south-1.amazonaws.com/avioshack/aviosbalance/7.json");
console.log("before api")
https.get(reqUrl, (responseFromAPI) => {
    console.log("Hello")
    let completeResponse = '';
    responseFromAPI.on('data', (chunk) => {
        completeResponse += chunk;
    });
    responseFromAPI.on('end', () => {
        const avios = JSON.parse(completeResponse);
        let dataToSend = `your avios balance is ${avios.balance.amount}`;
        console.log(dataToSend)
return res.send({
        speech: dataToSend,
        displayText: dataToSend,
        source: 'get-avios-balance'
    })
        // return res.json({
        //     speech: dataToSend,
        //     displayText: dataToSend,
        //     source: 'get-avios-balance'
        // });
    });
}, (error) => {
    return res.send("error")
    // return res.json({
    //     speech: 'Something went wrong!',
    //     displayText: 'Something went wrong!',
    //     source: 'get-avios-balance'
    // });
});
});

server.listen((process.env.PORT || 8000), () => {
console.log("Server is up and running...");
});
