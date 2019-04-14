const tweet = require('./controllers/tweet.js')
const getPoke = require('./controllers/poke')
const _ = require('lodash')


var bot = function () {
    getPoke().then(res => {        
        var name = _.capitalize(res.name)
        const text = `Name: ${name}, ID: #${res.id}, Heigth: ${res.height / 10}m, Weigth: ${res.weight / 10}kg`
        const image = res.sprites.front_default

        tweet(text)
        
    })
    setTimeout(bot, 600000);
}

bot();
