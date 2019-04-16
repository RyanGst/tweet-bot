const express = require("express");
const cron = require("node-cron");

require('dotenv').config()

const tweet = require('./controllers/tweet.js')
const getPoke = require('./controllers/poke')
const _ = require('lodash')


const app = express()

var bot = function () {
    getPoke().then(res => {        
        var name = _.capitalize(res.name)
        const text = `Name: ${name}, ID: #${res.id}, Heigth: ${res.height / 10}m, Weigth: ${res.weight / 10}kg`
        const image = res.sprites.front_default

        tweet(text)
        
    })
}

cron.schedule("0 * * * *", () => bot());

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}...`);
});