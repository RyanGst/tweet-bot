const express = require("express");
const cron = require("node-cron");

require('dotenv').config()

const app = express()

let robots = {
    pokeData: require('./controllers/poke'),
    imageDownloader: require('./controllers/image.js'),
    tweetPost: require('./controllers/tweet.js'),
    favoriteTweet: require('./controllers/fav.js'),
}



async function generateContent() {

    await robots.pokeData()

    await robots.imageDownloader()

    await robots.tweetPost()
}

generateContent()
let bot = async () => {

    // cron.schedule("* * * * *", () => robots.tweetPost('Estamos em manutenção', 'aa'));
    // cron.schedule("* * * * *", () => robots.favoriteTweet());
}

bot()

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}...`);
});