const fs = require('fs');
const posts = require('../database/posts');
const PostModel = require('../models/post');
const pool = require('../database/postgres');

function create(title, body) {
    return new Promise(async (resolve, reject) => {
        try {
            // "SELECT * FROM posts where id = $1", [1]
            // "UPDATE posts SET title = $1, body = $2", ["title", "body"]
            let result = await pool.query("INSERT INTO posts (title, body) values ($1, $2) RETURNING *;", [title, body]);
            resolve(result.rows[0]);
        } catch (err) {
            return reject(err);
        }
    });
}

function index() {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await pool.query("SELECT * FROM posts;");
            resolve(result.rows);
        } catch (err) {
            return reject(err);
        }
    });
}
function show(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await pool.query("SELECT * FROM posts WHERE id = $1;", [id]);
        resolve(result.rows[0]);
      } catch (err) {
        return reject(err);
      }
    });
  }

function update(id, title, body) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await pool.query("UPDATE posts SET title = $1, body = $2 WHERE id = $3 RETURNING *;", [title, body, id]);
            resolve(result.rows[0]);
        } catch (error) {
            reject(error);
        }
    });
}


function destroy(id) {
    return new Promise(async (resolve, reject) => {
        try {
            // "SELECT * FROM posts where id = $1", [1]
            // "UPDATE posts SET title = $1, body = $2", ["title", "body"]
            let result = await pool.query("DELETE from posts where id = $1 RETURNING *;", [1]);
            if (result.rows.length == 0) return reject (`post with id ${id} not found!`)
            resolve(`posts with id ${id} is deleted!`);
        } catch (err) {
            return reject(err);
        }
    });
}

module.exports = { create, index, show, update, destroy };