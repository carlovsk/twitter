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
var contAll = 1;

function BotInit() {
    let date = new Date();
    
    let year = date.getFullYear();
    let month = (date.getMonth()) + 1;
    let day = date.getDate();

    let query = {
        // q: `cave`,
        // q: `cave since:${year}-${month}-${day}`,
        q: `among us since:${year}-${month}-${day}`,
        count: 100000,
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
                            let curHour = date.getHours();
                            let curMinute = date.getMinutes();
                            let curSeconds = date.getSeconds();

                            console.log(`Bot retweeted: ${id.id} at ${curHour}:${curMinute}:${curSeconds}.`);
                            console.log(`Número de RTs: ${contRt} \n`);
                            contRt++;
                        }
                    } 
                }
            }
        }
    });

    console.log(`Contagem: ${contAll}`);
    contAll++;
}

console.clear();
console.log('Bot ligado!');

BotInit();
setInterval(BotInit, 3000);
