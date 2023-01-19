const express = require('express');
const session = require('express-session');
const router = express.Router();
const md5 = require('md5');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./ncufresh-demo.db');

//sql queries
const testUser = 'SELECT * FROM ACCOUNT WHERE ACC_UN = ?';
const registerAccount = 'INSERT INTO account (ACC_UN, ACC_PW_MD5) VALUES (?, ?)';
const listUserPost = 'SELECT * FROM POST WHERE ACCID = ?';

router.get('/',function(req,res,next){
    //res.status('403').json({message:"You bad bad, you can't access this page with this method"})
    //get user id from session
    let userId = req.session.userId;
    console.log(userId)
    //get all posts from the user
    db.all(listUserPost,[userId],(err,rows)=>{
        if(err){
            res.status(500).json({message:"Something went wrong with the database"})
        }else{
            if(rows.length===0){
                res.status(201).json({message:"No posts yet"})
            }else{
                res.status(200).json(rows);
            }
        }
    }
    )
})
router.post('/',function(req,res,next){
    //decrypt jwt
    //get user id from jwt
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
            //print sql statement
            db.all(listUserPost,[decoded.id],(err,rows)=>{
                if(err){
                    res.status(500).json({message:"Something went wrong with the database"})
                }else{
                    if(rows.length===0){
                        res.status(201).json({message:"No posts yet"})
                    }else{
                        res.status(200).json(rows);
                    }
                }
            }
            )
        }
    });
})
router.post('/create',function(req,res,next){
    let username = req.body.username;
    let password = req.body.password;
    //try to find if the username is already in the database
    db.get(testUser,[username],(err,row)=>{
        if(err){
            res.status(500).json({message:"Something went wrong with the database"})
        }else{
            if(row){
                res.status(201).json({message:"Username already exists"})
            }else{
                //if not, register the account
                db.run(registerAccount,[username,password],(err)=>{
                    if(err){
                        res.status(500).json({message:"Something went wrong with the database"})
                    }else{
                        res.status(200).json({message:"Account created"})
                    }
                })
            }
        }
    })
})
module.exports = router;