const Twit = require('twit');
const fs = require('fs-extra');
const { randomInt } = require('crypto');
require('dotenv').config();

module.exports.bot = async () => {
  const Bot = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
  });

  const images = [
    './src/images/capivara-1.jpg',
    './src/images/capivara-2.jpeg',
    './src/images/capivara-3.jpg',
    './src/images/capivara-4.jpg',
    './src/images/capivara-5.jpg',
    './src/images/capivara-6.jpg',
    './src/images/capivara-7.jpg',
    './src/images/capivara-8.jpg',
    './src/images/capivara-9.jpeg',
    './src/images/capivara-10.jpg',
    './src/images/capivara-11.jpg',
    './src/images/capivara-12.jpeg',
    './src/images/capivara-13.jpeg',
    './src/images/capivara-14.jpg',
    './src/images/capivara-15.png',
    './src/images/capivara-16.jpeg',
    './src/images/capivara-17.jpg',
    './src/images/capivara-18.jpg',
    './src/images/capivara-19.jpg',
    './src/images/capivara-20.jpg',
    './src/images/capivara-21.jpg',
    './src/images/capivara-22.png',
    './src/images/capivara-23.png',
    './src/images/capivara-24.png',
    './src/images/capivara-25.png',
    './src/images/capivara-26.png',
    './src/images/capivara-27.jpg',
    './src/images/capivara-28.jpg',
    './src/images/capivara-29.jpg',
  ];

  const random = randomInt(0, images.length);
  const image = fs.readFileSync(images[random], { encoding: 'base64' });

  await Bot.post('media/upload', { media_data: image }, async (error, data) => {
    if (error) throw error;
    const mediaIdStr = data.media_id_string;
    const altText = 'Capivara shot.';
    const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

    await Bot.post('media/metadata/create', meta_params, async () => {
      const params = { status: '', media_ids: [mediaIdStr] };

      await Bot.post('statuses/update', params, () => {
        console.log('New photo posted.');
      });
    });
  });
};
