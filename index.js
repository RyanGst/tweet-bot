const express = require("express");
const cron = require("node-cron");

require('dotenv').config()

const app = express()

let robots = {
    pokeData: require('./controllers/poke'), 
    favoriteTweet: require('./controllers/fav.js'),
    tweetPost: require('./controllers/tweet.js')
}

let bot = async () => {

    cron.schedule("* * * * *", () => robots.tweetPost('Estamos em manutenção', 'aa'));
    cron.schedule("* * * * *", () => robots.favoriteTweet());
}

bot()

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}...`);
});