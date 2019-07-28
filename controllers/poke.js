const axios = require('axios')


async function getPoke() {
    function randomNumber(min, max) {
        const number = Math.floor(Math.random() * (max - min + 1) + min);
        return number
    }

    const q = randomNumber(1, 804)
    
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${q}/`)
    const poke = res.data
    const text = `Name: ${poke.name}, \nID: #${poke.id}, Heigth: ${poke.height / 10}m, Weigth: ${poke.weight / 10}kg #Pokemon #${poke.name}`;

    return text
}

module.exports = getPoke;