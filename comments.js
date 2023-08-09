// Create web server application
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Get the comments data
const comments = require('./comments');

// Use body-parser middleware to parse HTTP body from JSON to JS object
app.use(bodyParser.json());

// Create route to return all comments
app.get('/api/comments', (req, res) => {
  res.json(comments);
});

// Create route to create a new comment
app.post('/api/comments', (req, res) => {
  // Get the comment from the request
  const comment = req.body;

  // Add date to the comment
  comment.date = new Date();

  // Add the comment to the array
  comments.push(comment);

  // Return the new comment with an id
  res.json(comment);
});

// Create route to update an existing comment
app.put('/api/comments/:id', (req, res) => {
  // Get the comment id from the request
  const id = Number(req.params.id);

  // Find the comment by id in the array
  const comment = comments.find(comment => comment.id === id);

  // Update the comment's message
  comment.message = req.body.message;

  // Return the updated comment
  res.json(comment);
});

// Create route to delete an existing comment
app.delete('/api/comments/:id', (req, res) => {
  // Get the comment id from the request
  const id = Number(req.params.id);

  // Find the index of the comment by id in the array
  const commentIndex = comments.findIndex(comment => comment.id === id);

  // Delete the comment from the array
  comments.splice(commentIndex, 1);

  // Return the deleted comment
  res.json(id);
});

// Set the port based on the environment variable or default to 8080
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});