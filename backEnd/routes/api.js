let express = require('express');
let router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./ncufresh-demo.db');

const registerAccount = 'INSERT INTO account (password, email) VALUES (?, ?)';
const loginAccount = 'SELECT * FROM account WHERE account = ? AND password = ?';
const getAllPosts = 'SELECT * FROM post';
const getPostByACC = 'SELECT * FROM post WHERE ACC_ID = ?';
const getPostByPID = 'SELECT * FROM post WHERE ID = ?';
const getCommentByPID = 'SELECT * FROM comment WHERE PID = ?';
const getCommentByCID = 'SELECT * FROM comment WHERE ID = ?';
const getCommentByACC = 'SELECT * FROM comment WHERE ACC_ID = ?';

//send a json response
router.get('/', function(req, res, next) {
    res.json({message: 'Hello World!'});
});
//connect to sqlite3 db, and list all rows in the table "post"
router.get('/posts', function(req, res, next) {
    
    db.all('SELECT * FROM post', function(err, rows) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json(rows);
    });
});

module.exports = router;