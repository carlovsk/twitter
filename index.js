let Twit = require('twit');
require('dotenv').config();

const Bot = new Twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
    timeout_ms:           60 * 1000,
});

var contRt = 1;
var contTudo = 1;

function BotInit() {
    let query = {
        q: 'mano',
        count: 100000
    }

    Bot.get('search/tweets', query, function(err, data, response) {
        for (let i in data) {
            if (!data.hasOwnProperty(i)) continue;

            let obj = data[i];

            for (let prop in obj) {
                if (!obj.hasOwnProperty(prop)) continue;

                if (err) {
                    console.log(`Bot could not find latest tweet, : ` + err);
                } else {
                    var id = {
                        id : data.statuses[0].id_str
                    }
                    
                    Bot.post(`statuses/retweet/:id`, id, BotRetweeted);
        
                    function BotRetweeted(error, response) {
                            if (error) {
                            // console.log(`Bot could not retweet, : ` + error);
                        } else {
                            console.log(`Bot retweeted: ` + id.id);
                            console.log('Número de RTs: ' + contRt);
                            contRt++;
                        }
                    }
                }
            }
        }
    });

    console.log('Número de vezes que o programa tá rodando: ' + contTudo);
    contTudo++
}

console.clear();
console.log('O estúpido tá online!');
BotInit();
setInterval(BotInit, 60000);
