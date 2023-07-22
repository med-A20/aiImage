const express = require('express')
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const prompt  = req.body.prompt;
    const aiResponse = await openai.createImage({
      n: 1,
      size: '1024x1024',
      response_format: 'url',
      prompt : prompt
    });

    const image = aiResponse.data.data[0].url;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error("the error is" + error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

module.exports = router;
