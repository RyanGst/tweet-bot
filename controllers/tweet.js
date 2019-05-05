const twit = require('twit');
const config = require('../config/config.js');
const T = new twit(config);
const request = require('request').defaults({ encoding: null });
const fs = require('fs')
const path = require('path')

var tweet = function(text, img, alt) {

    const tweetObj = {
        img_link: img,
        content: text,
    };

    const localname = `tempIMG-${Date.now()}.png`;
    const PATH = path.join(
        __dirname,
        `../folder/${localname}`
    );
    const mediaUrl = tweetObj.img_link;

    request.get(mediaUrl, function(error, response, body) {

        fs.writeFile(PATH, body, function(error) {

            T.postMediaChunked({ file_path: PATH }, function(err, data, response) {

                const mediaIdStr = data.media_id_string;
                const meta_params = { media_id: mediaIdStr, alt_text: { text: alt } };

                T.post('media/metadata/create', meta_params, function(err, data, response) {

                    if (!err) {

                        const params = { status: tweetObj.content, media_ids: [mediaIdStr] };

                        T.post('statuses/update', params, function(err, tweet, response) {

                            console.log('Novo tweet as: ' + tweet.created_at);
                            fs.unlinkSync(PATH);

                        });

                    } // end if(!err)

                });

            });

        });

    });
}

module.exports = tweet