const twit = require('twit');
const config = require('../config/config.js');
const T = new twit(config);

const state = require("./state.js")

//funny stuff
const cool = require('cool-ascii-faces');
const colors = require('colors');

var tweet = function () {

    const poke = state.load()

    console.log(`[Twitter post] > process starting... ${cool()}`.blue.bold);

    T.postMediaChunked({ file_path: `./content/${poke.name}.png` }, function (err, data) {

        const mediaIdStr = data.media_id_string;
        const meta_params = { media_id: mediaIdStr, alt_text: { text: 'Pkmn_alt' } };

        T.post('media/metadata/create', meta_params, function (err) {

            if (!err) {

                const params = { status: poke.twitter, media_ids: [mediaIdStr] };

                T.post('statuses/update', params, function (err, tweet) {

                    console.log(`[Twitter post] > Novo tweet as: ${tweet.created_at}`.blue.bold);
                });

            } else {
                console.error(colors.yellow(err));
            }
        });

    });
    console.log(`[Twitter post] > process finished ${cool()}`.blue.bold);
}

module.exports = tweet