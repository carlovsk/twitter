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

function BotInit() {
  let date = new Date();

  let year = date.getFullYear();
  let month = (date.getMonth()) + 1;
  let day = date.getDate();

  let query = {
    q: `among us since:${year}-${month}-${day}`,
    count: 100000,
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
              let curHour = date.getHours();
              let curMinute = date.getMinutes();
              let curSeconds = date.getSeconds();

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

  setTimeout(BotInit, 10000);
}

console.clear();
console.log('\x1b[32m', 'Bot ligado!');

BotInit();
