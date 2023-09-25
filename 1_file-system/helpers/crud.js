const fs = require('fs');
const posts = require('../database/posts');
const PostModel = require('../models/post');

function create(title, body) {
  const result = fs.readFileSync('./database/posts.json', 'utf-8');
  const posts = JSON.parse(result);
  let newPost = new PostModel(posts.id++, title, body);
  posts.data.push(newPost);

  fs.writeFileSync('./database/posts.json', JSON.stringify(posts, null, 4));
}

function index() {
  const result = fs.readFileSync('./database/posts.json', 'utf-8');
  const posts = JSON.parse(result);
  return posts.data; 

}

function show(id) {
  const result = fs.readFileSync('./database/posts.json', 'utf-8');
  const posts = JSON.parse(result);
  const post = posts.data.find((post) => post.id === id);
  if (!post) return 'Post not found';
  return post;
}
function update(id, { title, body }) {
  const result = fs.readFileSync('./database/posts.json', 'utf-8');
  const posts = JSON.parse(result);
  const post = posts.data.find((post) => post.id === id);
  if (!post) return 'Post not found';

  const updatedPost = posts.data.map((post) => {
    if (post.id === id) {
      return {
        id,
        title,
        body,
      };
    }
    return post;
  });

  fs.writeFileSync('./database/posts.json', JSON.stringify({ id: posts.id, data: updatedPost }, null, 4));
}
function destroy(id) {
  const result = fs.readFileSync('./database/posts.json', 'utf-8');
  const posts = JSON.parse(result);
  const post = posts.data.filter((post) => post.id !== id);

  fs.writeFileSync('./database/posts.json', JSON.stringify({ id: posts.id, data: post }, null, 4));
}

module.exports = { create, index, show, update, destroy };
