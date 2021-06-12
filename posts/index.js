const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/posts/create', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  axios.post('http://event-bus-svc:4005/events', {
    type: 'PostCreated',
    data: { id, title },
  });

  res.status(201).json(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body);

  res.json({});
});

app.listen(4000, () => console.log('Listening on port 4000'));
