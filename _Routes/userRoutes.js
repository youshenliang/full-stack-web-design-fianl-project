const router = require('express').Router();
const bodyParser = require('body-parser');
const userSQLModel = require('../_Model/userSQLModel');
const orderModel = require('../_Model/orderModel');
const path = require('path');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mickeyhouse6666@gmail.com',
        pass: 'ijbpaxbgszajzjww'
    }
});


var USER_ID = -1;

// 設定requset body parser
var urlencodeParser = bodyParser.urlencoded({ extended: false });

// 起始畫面為商品介面，因尚未完成，這邊先用登入頁面代替
router.get('/', (req, res) => {
    console.log(__dirname);
    if (req.signedCookies.userID) {
        res.render(path.resolve(__dirname, '../_View/main/homepage.html'), { userID: req.signedCookies.userID });
    } else {
        res.render(path.resolve(__dirname, '../_View/main/homepage.html'), { userID: -1 });
    }
})

router.get('/backstage', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../_View/main/homepage_.html'));
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
        res.cookie("userID", userID, { signed: true });

        if (userID == 1) {
            res.status(200).write("system");  // 如果登入身分為系統管理員則跳轉至後台頁面
            res.end();
        }
        else if (userID > 1) {
            res.status(200).write("登入成功");  // 登入成功
            res.end();
        }
    }).catch((err) => {
        if (err == "register") {
            res.status(200).write("尚未註冊");  // 跳轉至註冊畫面
            res.end();
        } else if (err == "errPWD") {
            res.status(200).write("密碼錯誤");  // 回傳密碼錯誤
            res.end();
        }
        console.log(`err when user login: ${err}`);
    })
})

router.post('/logout', (req, res) => {
    res.clearCookie("userID", { signed: true });
    res.status(200).send("logout");
    res.end();
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

router.get('/forgetpwd', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../_View/register_and_login/forgetpwd.htm"))
})

router.post('/forgetpwd', urlencodeParser, (req, res) => {

    userSQLModel.UserNameQueryByEmail(req.body.email).then((userName) => {

        if (userName != null && userName.length > 0) {

            // 設定cookie，做二次驗證，避免被有心人亂改密碼
            res.cookie("forgetpwd", userName, { signed: true });

            var mailOptions = {
                from: 'mickeyhouse6666@gmail.com',
                to: req.body.email,
                subject: '米奇妙妙屋-密碼重新設定信',
                text: `您好，請點選下面的連結以重新設定密碼\n\n\nhttp://localhost:3000/resetpwd?username=${userName}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send("sent");
                    res.end()
                }
            });
        } else {
            res.status(200).send("not found");
            res.end()
        }

    })

})

router.get('/forgetUsername', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../_View/register_and_login/forgetUsername.htm"))
})

router.post('/forgetUsername', urlencodeParser, (req, res) => {

    userSQLModel.UserNameQueryByEmail(req.body.email).then((username) => {
        var mailOptions = {
            from: 'mickeyhouse6666@gmail.com',
            to: req.body.email,
            subject: '米奇妙妙屋-使用者帳號',
            text: `您好，您的使用者帳號是${username}`
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send("sent");
                res.end()
            }
        });
    })
})


router.post('/resetpwd', urlencodeParser, (req, res) => {

    var newPWD = req.body.userPWD;

    if (req.signedCookies.userID) {        
        newPWD = crypto.createHash('sha256').update(newPWD).digest('base64');
        userSQLModel.ResetPWDByID(req.signedCookies.userID, newPWD).then(() => {
            res.status(200).send("密碼更改成功");
            res.end();
        })
    } else if (req.signedCookies.forgetpwd) {
        newPWD = crypto.createHash('sha256').update(newPWD).digest('base64');
        userSQLModel.ResetPWDByName(req.signedCookies.forgetpwd, newPWD).then(() => {
            res.status(200).send("密碼更改成功");
            res.end();
        })
    }
})

router.get('/resetpwd', (req, res) => {
    // 確認改密碼的是否為本人(email + cookie、id)

    if (req.signedCookies.userID) {
        userSQLModel.UserNameQuery(req.signedCookies.userID).then(name => {
            console.log(name, req.query.username);
            if (req.query.username != name && name.length > 0 && req.query.username!=null) {
                res.status(403).send("您沒有權限訪問這個網站");
                res.end();
            }else{
                res.sendFile(path.resolve(__dirname, "../_View/register_and_login/resetpwd.htm"));
            }
        })
    }else{
        if (req.signedCookies.forgetpwd == req.query.username) {
            res.sendFile(path.resolve(__dirname, "../_View/register_and_login/resetpwd.htm"));
        } else {
            res.status(403).send("您沒有權限訪問這個網站");
            res.end();
        }
    }
})

router.get('/member', (req, res) => {
    if (req.signedCookies.userID) {
        userSQLModel.UserInfoQuery(req.signedCookies.userID).then((result) => {
            res.render(path.resolve(__dirname, '../_View/main/member.html'), {
                username: result["userName"],
                gender: result["userGender"],
                birthday: formatDate(new Date(Date.parse(result["userBirthday"]))),
                email: result["userEmail"],
                phoneNumber: result["userPhoneNumber"]
            });
        })
    } else {
        res.status(301).redirect("http://localhost:3000/login");
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return (
            [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate()),
            ].join('/')
        );
    }
})

router.post('/member', urlencodeParser, (req, res) => {
    var id = req.signedCookies.userID;
    var email = req.body.email;
    var phoneNumber = req.body.phone;
    console.log(`get post data to /member. id:${id}, email: ${email}, phone: ${phoneNumber}`);
    userSQLModel.EditMailPhone(id, email, phoneNumber).then(() => {
        res.status(200).send("updated successfully");
        res.end();
    })
})


router.get('/chatroom', (req, res) => {
    console.log("userID: ", USER_ID);
    // 檢查是否已經登入 (這邊之後要改成cookie之類的方法比較好)
    if (req.signedCookies.userID) res.sendFile(path.resolve(__dirname, '../_View/chatroom/client/chatroom.htm'));
    else res.status(403).send("請先登入才能進入聊天室");
})

router.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../_View/main/about.html'));
})

router.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../_View/main/contact.html'));
})

router.get('/shop', (req, res) => {
    res.status(301).redirect("http://localhost:3000/search");
})

router.get('/system', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../_View/chatroom/system/system_chatroom.htm'));
})

router.get('/orderlist', (req, res) => {
    if (!req.signedCookies.userID) {
        res.status(301).redirect("http://localhost:3000/login");
    } else {
        res.status(200).sendFile(path.resolve(__dirname, '../_View/main/orderlist.htm'));
    }
})

router.post('/orderlist', urlencodeParser, (req, res) => {
    if (!req.signedCookies.userID) {
        res.status(301).redirect("http://localhost:3000/login");
    } else {
        console.log("id:", req.signedCookies.userID);
        orderModel.orderlistQuery(req.signedCookies.userID).then(data => {
            res.status(200).send(data);
            res.end();
        })
    }
})

module.exports = router;