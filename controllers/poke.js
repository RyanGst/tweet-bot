const axios = require('axios')


async function getPoke() {
    function randomNumber(min, max) {
        const number = Math.floor(Math.random() * (max - min + 1) + min);
        return number
    }

    const q = randomNumber(1, 804)
    
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${q}/`)
    return res.data
}

module.exports = getPoke;