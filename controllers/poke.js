const axios = require('axios')
const state = require('./state.js');


//funny stuff
const cool = require('cool-ascii-faces');
const colors = require('colors');

async function getPoke() {

    console.log(`[poke-chooser] > process starting... ${cool()}`.white.bold);

    function randomNumber(min, max) {
        const number = Math.floor(Math.random() * (max - min + 1) + min);
        return number
    }

    function sanitize(arr) {
        ['stats', 'moves', 'held_itens', 'game_indices', 'abilities'].forEach(key => {
            delete arr[key];
        });
    }

    const q = randomNumber(1, 804)
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${q}/`)

    const poke = res.data

    sanitize(poke);

    const text = `Name: ${poke.name}, \nID: #${poke.id}, Heigth: ${poke.height / 10}m, Weigth: ${poke.weight / 10}kg #Pokemon #${poke.name}`;

    poke.twitter = text

    console.log(`[poke-chooser] > process finished ${cool()}`.white.bold);

    state.save(poke)

}

module.exports = getPoke;