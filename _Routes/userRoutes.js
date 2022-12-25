const router = require('express').Router();
const bodyParser = require('body-parser');
const userSQLModel = require('../_Model/userSQLModel');
const path = require('path');
const crypto = require('crypto');

// 設定requset body parser
var urlencodeParser = bodyParser.urlencoded({ extended: false });

var USER_ID = -1;

// 起始畫面為商品介面，因尚未完成，這邊先用登入頁面代替
router.get('/', (req, res) => {
    console.log(__dirname);
    //res.sendFile(path.resolve(__dirname, '../_View/register_and_login/login.htm'));
    if(req.signedCookies.userID) {
        res.render(path.resolve(__dirname, '../_View/main/index.html'), {userID: req.signedCookies.userID});
    }else{
        res.render(path.resolve(__dirname, '../_View/main/index.html'), {userID: -1});
    }
})

router.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../_View/register_and_login/login.htm'));
})

router.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../_View/register_and_login/register.htm'));
})

router.post('/login', urlencodeParser, (req, res) => {
    // 檢查此user是否存在於database內
    // 若有則撈出他的userID；若無則跳轉至註冊畫面
    userName = req.body.userName;    
    var password = req.body.password;
    password = crypto.createHash('sha256').update(password).digest('base64'); // 對密碼做sha256雜湊
    console.log("pwd post: ", password);
    userSQLModel.UserLoginQuery(userName, password).then((userID) => {
        USER_ID = userID;
        if (userID == 1) res.redirect(301, `http://localhost:3000/system`);  // 如果登入身分為系統管理員則跳轉至後台頁面
        else if (userID > 1){
            res.cookie("userID", userID, {signed: true});
            res.status(200).write("登入成功");  // 登入成功
            res.end();
        }
    }).catch((err) => {
        if (err == "register") {
            res.status(200).write("尚未註冊");  // 跳轉至註冊畫面
            res.end();
        } else if(err == "errPWD") {
            res.status(200).write("密碼錯誤");  // 回傳密碼錯誤
            res.end();
        }
        console.log(`err when user login: ${err}`);
    })
})

router.post('/register', urlencodeParser, (req, res) => {
    // 檢查此user是否存在於database內，若有則提示使用者名稱重複
    const userData = req.body;
    console.log("before", userData);
    // 將使用者密碼做sha256雜湊
    userData.userPWD = crypto.createHash('sha256').update(userData.userPWD).digest('base64');
    console.log("after", userData);

    var pass = true;

    userSQLModel.UserNameExistQuery(userData.userName).then((result) => {
        // 檢查此userName是否被使用過，若有則提示已經使用過
        if (result != -1) { pass = false; res.status(200).write("使用者名稱重複"); res.end(); }
        // 檢查此email是否被使用過，若有則提示已經使用過
        userSQLModel.UserEmailExistQuery(userData.userEmail).then((result) => {
            if (result != -1) { pass = false; res.status(200).write("Email重複"); res.end(); }
            if (pass) {
                userSQLModel.UserRegisterQuery(userData).then((result) => {
                    if (result == "註冊成功") {
                        console.log("註冊成功!");
                        res.status(200).write("註冊成功");
                        res.end()
                    }
                }).catch((err) => {
                    console.log(`err at userRoutes.js: ${err}`);
                })
            }
        })
    })
})


router.get('/chatroom', (req, res) => {
    console.log("userID: ", USER_ID);
    // 檢查是否已經登入 (這邊之後要改成cookie之類的方法比較好)
    if (USER_ID != -1) res.sendFile(path.resolve(__dirname,'../chatroom/client/chatroom.htm'));
    else res.status(403).send("請先登入才能進入聊天室");
})

router.get('/system', (req, res) => {
    res.status(200).sendFile(path.resolve('../system/system_chatroom.htm'));
})


module.exports = router;