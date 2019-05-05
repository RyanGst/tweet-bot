const express = require("express");
const cron = require("node-cron");

require('dotenv').config()

const tweet = require('./controllers/tweet.js');
const getPoke = require('./controllers/poke');
const fav = require('./controllers/fav.js');
const _ = require('lodash')

const app = express()

var bot = function() {
    getPoke().then(res => {
        var name = _.capitalize(res.name)
        const text = `Name: ${name}, ID: #${res.id}, Heigth: ${res.height / 10}m, Weigth: ${res.weight / 10}kg #Pokemon #${name}`
        const image = res.sprites.front_default
        tweet(text, image, "#Pokemon")
    })
}

cron.schedule("0 * * * *", () => bot());

cron.schedule("* * * * *", () => fav());

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}...`);
});