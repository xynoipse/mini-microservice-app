const express = require('express');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { id } = req.params;
  const { content } = req.body;

  const comments = commentsByPostId[id] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[id] = comments;

  res.status(201).json(comments);
});

app.listen(4001, () => console.log('Listening on port 4001'));
