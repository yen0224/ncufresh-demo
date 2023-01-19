const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/api');
const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');
const session = require('express-session');
const app = express();
const md5 = require('md5');
const sqlite3 = require('sqlite3');
const { json } = require('body-parser');
const db = new sqlite3.Database('./ncufresh-demo.db');
const jwt = require('jsonwebtoken');

const loginAccount = 'SELECT * FROM ACCOUNT WHERE ACC_UN = ? AND ACC_PW_MD5 = ?';

app.use(session({
    secret: 'nyanCat',
    resave: true,
    saveUninitialized: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(
    //Allow cross origin requests
    {
        //Access-Control-Allow-Origin
        origin: "http://localhost:5173",
        credentials: true
    }
))

app.use('/', indexRouter);
app.use('/api',apiRouter);
app.use('/user',userRouter);
app.post('/login', function(req, res) {
    console.log('someone is trying to login')
    let username = req.body.username;
    let password = req.body.password;
    console.log('username=',username);
    console.log('password=',password);
    if (username && password) {
        let encryptedPassword = md5(password);
        console.log('encryptedPassword=',encryptedPassword)
        db.all(loginAccount, [username, encryptedPassword], (err, rows) => {
            console.log('trying to search for account');
            if (err) {
                res.status(500).send('server error')
            } else {
                if(rows.length===0){
                    res.status(401).json({message:"No such account"})
                }else{
                    console.log((rows))
                    req.session.loggedin = true;
                    req.session.username = username;
                    //store the user id in the session
                    req.session.userId = rows[0].ACC_ID;
                    console.log(username, 'has logged in');
                    //save information in jwt
                    const token = jwt.sign({id:rows[0].ACC_ID,username:username},
                        'nyanCat',
                        {expiresIn: '1h'}
                    );
                    
                    res.status(200).json({token:token});
                } 
            }
        })
    }
});
app.get('/logout', function(req, res) {

    req.session.destroy();
    res.clearCookie('jwt');
    res.status(200).send('success');
});
module.exports = app;
