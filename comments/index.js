const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { id } = req.params;
  const { content } = req.body;

  const comments = commentsByPostId[id] || [];
  const status = 'pending';

  comments.push({ id: commentId, content, status });
  commentsByPostId[id] = comments;

  axios.post('http://event-bus-svc:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: id,
      status,
    },
  });

  res.status(201).json(comments);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { id, postId, status } = data;

    const comments = commentsByPostId[postId] || [];
    const comment = comments.find((c) => c.id === id);

    comment.status = status;

    axios.post('http://event-bus-svc:4005/events', {
      type: 'CommentUpdated',
      data: { ...comment, postId },
    });
  }

  res.json({});
});

app.listen(4001, () => console.log('Listening on port 4001'));
