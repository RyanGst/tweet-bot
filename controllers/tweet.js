var twit = require('twit');
var config = require('../config/config.js');

var T = new twit(config);

var tweet = function (data) {
    T.post('statuses/update', { status: data }, function(err, data) {
        if (err) {
          console.log(err);
          
          process.exit()
        } 
        console.log('Tweet feito com sucesso em: ' + data.created_at);
      })
} 

module.exports = tweet