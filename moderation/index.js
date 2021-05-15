const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
  console.log('Received Event', req.body);

  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    const { id, content, postId } = data;

    axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }

  res.json({});
});

app.listen(4003, () => console.log('Listening on port 4003'));
