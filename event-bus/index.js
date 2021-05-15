const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
  const event = req.body;

  // Post service
  axios.post('http://localhost:4000/events', event);
  // Comment service
  axios.post('http://localhost:4001/events', event);
  // Query service
  axios.post('http://localhost:4002/events', event);
  // Moderation service
  axios.post('http://localhost:4003/events', event);

  res.json({ status: 'OK' });
});

app.listen('4005', () => console.log('Listening to port 4005'));
