let express = require('express');
let router = express.Router();
const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');
const db = new sqlite3.Database('./ncufresh-demo.db');

const registerAccount = 'INSERT INTO account (password, email) VALUES (?, ?)';
const loginAccount = 'SELECT * FROM account WHERE account = ? AND password = ?';
const getAllPosts = `SELECT * FROM POST`;
const getPostByACC = 'SELECT * FROM post WHERE ACC_ID = ?';
const getPostByPID = 'SELECT * FROM post WHERE ID = ?';
const getCommentByPID = 'SELECT * FROM COMMENT WHERE POST_ID = ?';
const getCommentByCID = 'SELECT * FROM comment WHERE ID = ?';
const getCommentByACC = 'SELECT * FROM comment WHERE ACC_ID = ?';

//send a json response
router.get('/', function(req, res, next) {
    //send getAllPosts query
        db.all(getAllPosts, (err, rows) => {
            if (err) {
                res.status(500).send
            } else {
                if(rows.length===0){
                    res.status(201).json({message:"No posts yet"})
                }else{
                    res.status(200).json(rows);
                } 
            }
        })
    }
)
router.post('/auth',function (req,res,next){
    //check if the user is logged in by session
    //if yes, send a 200 status code and username
    console.log(req.session.userId)
    console.log(req.session)
    if(req.session.userId){
        res.status(200).json({
            message:"User is logged in",
            username:req.session.username
        }).send;
        
    }else{
        res.status(201).json({message:"User is not logged in"})
    }
})

router.get('/post/:id',function(req,res,next){
    //send getPostByPID query
    db.all(getPostByPID,[req.params.id],(err,rows)=>{
        if(err){
            res.status(500).send
        }else{
            if(rows.length===0){
                console.log("searching for post with id: "+req.params.id)
                res.status(201).json({message:"No such post"})
            }else{
                res.status(200).json(rows);
            } 
        }
    })
})
router.get('/post/:id/comments',function(req,res,next){ 
    //send getCommentByPID query
    db.all(getCommentByPID,[req.params.id],(err,rows)=>{
        if(err){
            res.status(500).send
        }else{
            if(rows.length===0){
                console.log("searching for comments of post with id: "+req.params.id)
                res.status(201).json({message:"No comments yet"})
            }else{
                res.status(200).json(rows);
            } 
        }
    })
})
module.exports = router;