const twit = require('twit');
const config = require('../config/config.js');
const T = new twit(config);

const fav = function() {

    function ranDom(arr) {
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
    };

    const params = {
            q: '#Pokemon, Pokemon',
            result_type: 'recent',
            lang: 'pt'
        }
        // https://dev.twitter.com/rest/reference/get/search/tweets

    T.get('search/tweets', params, function(err, data) {

        // find tweets
        var tweet = data.statuses;
        var randomTweet = ranDom(tweet); // pick a random tweet

        // if random tweet exists
        if (typeof randomTweet != 'undefined') {
            // Tell TWITTER to 'favorite'
            T.post('favorites/create', { id: randomTweet.id_str }, function(err, response) {
                // if there was an error while 'favorite'
                if (err) {
                    console.log('CANNOT BE FAVORITE');
                } else {
                    console.log('FAVORITED!!!');
                }
            });
        }
    });
}

module.exports = fav