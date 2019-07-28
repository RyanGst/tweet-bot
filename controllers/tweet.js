const twit = require('twit');
const config = require('../config/config.js');
const T = new twit(config);


var tweet = function (text, alt) {

    T.postMediaChunked({ file_path: './folder/download.png' }, function (err, data) {

        const mediaIdStr = data.media_id_string;
        const meta_params = { media_id: mediaIdStr, alt_text: { text: alt } };

        T.post('media/metadata/create', meta_params, function (err) {

            if (!err) {

                const params = { status: text, media_ids: [mediaIdStr] };

                T.post('statuses/update', params, function (err, tweet) {

                    console.log('Novo tweet as: ' + tweet.created_at);
                });

            } else {
                console.error(err);
            }

        });


    });

}

module.exports = tweet