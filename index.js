import Twit from 'twit';
import auth from 'dotenv';
import fs from 'fs';
import { randomInt } from 'crypto';

auth.config();

const Bot = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

const images = [
  './images/capivara-1.jpg',
  './images/capivara-2.jpeg',
  './images/capivara-3.jpg',
  './images/capivara-4.jpg',
  './images/capivara-5.jpg',
  './images/capivara-6.jpg',
  './images/capivara-7.jpg',
  './images/capivara-8.jpg',
  './images/capivara-9.jpeg',
  './images/capivara-10.jpg',
  './images/capivara-11.jpg',
  './images/capivara-12.jpeg',
  './images/capivara-13.jpeg',
  './images/capivara-14.jpg',
  './images/capivara-15.png',
  './images/capivara-16.jpeg',
  './images/capivara-17.jpg',
  './images/capivara-18.jpg',
  './images/capivara-19.jpg',
  './images/capivara-20.jpg',
  './images/capivara-21.jpg',
  './images/capivara-22.png',
  './images/capivara-23.png',
  './images/capivara-24.png',
  './images/capivara-25.png',
  './images/capivara-26.png',
];

const BotInit = () => {

  const random = randomInt(0, images.length);
  const image = fs.readFileSync(images[random], { encoding: 'base64' });

  Bot.post('media/upload', { media_data: image }, (err, data) => {
    const mediaIdStr = data.media_id_string
    const altText = "Small flowers in a planter on a sunny balcony, blossoming."
    const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

    Bot.post('media/metadata/create', meta_params, (err, data, response) => {
      if (err) console.log(err);

      const params = { status: '', media_ids: [mediaIdStr] };

      Bot.post('statuses/update', params, (err, data) => {
        if (err) console.log(err);

        console.log('postei')
      });
    })
  });

  console.log('opa');
}

setInterval(BotInit, 1000);