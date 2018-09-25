const express = require('express');
const axios = require('axios');
require('dotenv').config()

const app = express();

const port = process.env.PORT || 8000;

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });
}

app.get('/api/projects', async (_, res) => {
  const options = {
    method: 'GET',
    url: process.env.PROJECT_FETCHER_URL,
    headers: {
        'x-api-key': process.env.API_KEY
    },
  };

  try {
    const {data} = await axios(options);
    res.send(data.projects);
  } catch (error) {
    res.status(500).end();
  }
});

app.get('*', (_, res) => res.status(404).send('Resource not found'));

app.listen(port, () => console.log(`Listening on ${port}.`));
