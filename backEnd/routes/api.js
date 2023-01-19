let express = require('express');
let router = express.Router();
const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');
const db = new sqlite3.Database('./ncufresh-demo.db');
// 這邊是定義好的SQL語法，可以直接使用
const registerAccount = 'INSERT INTO account (password, email) VALUES (?, ?)';
const loginAccount = 'SELECT * FROM account WHERE account = ? AND password = ?';
const getAllPosts = `SELECT * FROM POST`;
const getPostByACC = 'SELECT * FROM post WHERE ACC_ID = ?';
const getPostByPID = 'SELECT * FROM post WHERE ID = ?';
const getCommentByPID = 'SELECT * FROM COMMENT WHERE POST_ID = ?';
const getCommentByCID = 'SELECT * FROM comment WHERE ID = ?';
const getCommentByACC = 'SELECT * FROM comment WHERE ACC_ID = ?';
const addPost ='INSERT INTO POST (ACCID, Title, Author, Detail) VALUES (?,?,?,?)';
// 回傳所有在資料庫中的文章
// 由get方法進入此路由
router.get('/', function(req, res, next) {
    // 參數位置是事先定義好的，照用就好
    // row存放的是查詢後的結果，err 存放錯誤訊息    
    db.all(getAllPosts, (err, rows) => {
            if (err) {
                res.status(500).send
            } else {
                // 如果沒有錯誤，就會進入這個區塊
                // row的查詢結果為空，代表沒有資料
                if(rows.length===0){
                    res.status(201).json({message:"No posts yet"})
                }else{
                    res.status(200).json(rows);
                } 
            }
        })
    }
)
//驗證的路由
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
//查詢文章
//動態路由
router.get('/post/:id',function(req,res,next){
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
//查詢文章的留言
router.get('/post/:id/comments',function(req,res,next){ 
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
router.post('/post/add',function(req,res,next){
    //check if the user is logged in by decryting the jwt
    console.log(req.headers['authorization'])
    let token = req.headers['authorization'].split(' ')[1];

    console.log(token)
    jwt.verify(token, 'nyanCat', function(err, decoded) {
        if(err){
            res.status(201).json({message:"User is not logged in"})
        }else{
            console.log(decoded)
            //insert into post table
            console.log(decoded.id)
            console.log(decoded.username)
            console.log(req.body.title)
            console.log(req.body.detail)
            //print sql statement
            console.log(addPost,[decoded.id,req.body.title,decoded.username,req.body.detail])
            db.get(addPost,[decoded.id,req.body.title,decoded.username,req.body.detail],function(err){
                if(err){
                    res.status(500).send
                }else{
                    res.status(200).json({message:"Post added"})
                }
            })
        }
    });
})

module.exports = router;