const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  // Post service
  axios
    .post('http://posts-clusterip-svc:4000/events', event)
    .catch((err) => console.error(err.message));

  // Comment service
  axios
    .post('http://comments-svc:4001/events', event)
    .catch((err) => console.error(err.message));

  // Query service
  axios
    .post('http://query-svc:4002/events', event)
    .catch((err) => console.error(err.message));

  // Moderation service
  axios
    .post('http://moderation-svc:4003/events', event)
    .catch((err) => console.error(err.message));

  res.json({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.json(events);
});

app.listen('4005', () => console.log('Listening to port 4005'));
