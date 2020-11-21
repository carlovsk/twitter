import Twit from 'twit';
import auth from 'dotenv';

auth.config();

const Bot = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

let contRt = 1;
let contAll = 1;

Bot.post('statuses/update', { status: `i'm online!` });

function BotInit() {
  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth()) + 1;
  const day = date.getDate();

  const query = {
    q: `javascript since:${year}-${month}-${day}`,
    count: 10000,
  }

  Bot.get('search/tweets', query, function (err, data, response) {
    for (let i in data) {
      if (!data.hasOwnProperty(i)) continue;

      let obj = data[i];

      for (let prop in obj) {
        if (!obj.hasOwnProperty(prop)) continue;

        if (err) {
          console.log('\x1b[32m', `Bot could not find latest tweet, : ` + err);
        } else {
          var id = {
            id: data.statuses[0].id_str
          }

          Bot.post(`statuses/retweet/:id`, id, BotRetweeted);

          function BotRetweeted(error, response) {
            if (error) {
              // console.log(`Bot could not retweet, : ` + error);
            } else {
              const zeroFill = n => {
                return ('0' + n).slice(-2);
              }

              let curHour = zeroFill(date.getHours());
              let curMinute = zeroFill(date.getMinutes());
              let curSeconds = zeroFill(date.getSeconds());


              console.log('\x1b[32m', `Bot retweeted: ${id.id} at ${curHour}:${curMinute}:${curSeconds}.`);
              console.log('\x1b[32m', `Número de RTs: ${contRt} \n`);
              contRt++;
            }
          }
        }
      }
    }
  });

  console.log('\x1b[32m', `Contagem: ${contAll}`);
  contAll++;
}

console.clear();
console.log('\x1b[32m', 'Bot ligado!');

setInterval(BotInit, 30000);
