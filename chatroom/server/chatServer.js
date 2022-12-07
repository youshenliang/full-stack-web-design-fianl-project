const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const cors = require('cors');
const mysql = require('mysql');
const { connect } = require('http2');
const path = require('path');
const { resolve } = require('path');
const { off } = require('process');

const app = express();
const PORT = 3000;

var USER_ID = -1;

var urlencodeParser = bodyParser.urlencoded({extended: false});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "chat",
    charset: 'utf8mb4'
});

con.connect((err) => {
    if (err) {
        console.log("err when con.connect(): " + err.message);
        throw (err);
    }
    console.log("connect to mysql successfully!");
})

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));

app.use(express.static('../client'));

app.get('/', (req, res) => {    
    res.sendFile('client.htm', { root: __dirname });
})

app.post('/', urlencodeParser, (req, res) => {    
    // 檢查此user是否存在於database內
    // 若有則撈出他的userID；若無則跳轉至註冊畫面(這邊為了方便測試直接塞入db並抓取userID)
    userName = req.body.userName;
    UserLoginQuery(userName).then((userID) => {        
        USER_ID = userID;
        if (userID > 0) res.redirect(301, `http://localhost:3000/chatroom?username=${userName}`);
        else res.send(`新使用者${userName}註冊成功！請重新登入`);        
    }).catch((err) => {
        console.log(`err when user login: ${err.message}`);
        throw (err);
    })
})

app.get('/chatroom', (req, res) => {
    res.sendFile('client/chatroom.htm', { root: path.resolve('../') });
})

// Start Server
const server = app.listen(3000, () => {
    console.log(`Server started at port ${PORT}`);
})

// Socket Server
const io = socketIO(server);

io.on('connection', (socket) => {

    console.log('Socket connected! User ', socket.id);

    // 當有user登入socket.io時
    socket.on('user_login', (userName) => {

        // 當client要求載入對話紀錄，則根據登入的使用者身分，抓取對話紀錄
        socket.on('get_chat_record', (option) => {
            var amount = option[0];
            var offset = option[1];
            ChatRecordQuery(USER_ID, offset, amount).then((chatRecord) => {
                io.emit('get_chat_record', chatRecord);
            }).catch((err) => {
                console.log(`err when getting chat record: ${err.message}`);
                throw (err);
            })
        })

    })
    
    // 當client端發送新訊息
    socket.on('new_message_from_client', (message) => {
        console.log(message);
        AppendNewMessageQuery(USER_ID, 1, message).then((data) => {
            console.log("Append: ", message); 
            ChatRecordQuery(USER_ID, 0, 1).then((data) => {
                io.emit('new_message_from_client', data);
            })
            /*
            // 更新對話紀錄
            // 根據登入的使用者身分，抓取對話紀錄
            ChatRecordQuery(USER_ID, 0, 10).then((data) => {
                console.log("\n=================");
                // 這邊要反著輸出，因為當初在抓資料庫資料時是從最新的開始往上抓
                for (var row = data.length - 1; row >= 0; row--) {
                    var rowData = data[row];
                    var sender = rowData['sender'] == 1 ? "System" : userName;
                    var receiver = rowData['receiver'] == 1 ? "System" : userName;
                    var message = rowData['message'];
                    console.log(`${sender} to ${receiver}: ${message}`);
                }

            }).catch((err) => {
                console.log(`err when getting chat record: ${err.message}`);
                throw (err);
            })*/
        }).catch((err) => {
            console.log(`err when appending message: ${err.message}`);
            throw (err);
        })
    })

    // user斷開連線
    socket.on('disconnect', (data) => {
        console.log("user disconnected.");
        console.log(data);
    })

})

function UserLoginQuery(userName) {
    // 用Promise等待SQL查詢完再resolve
    return new Promise((resolve, reject) => {
        // 先檢查此user是否存在於database內
        var checkUser = `SELECT * FROM USER_LIST WHERE userName="${userName}"`;
        con.query(checkUser, function (err, result) {
            if (err) {
                console.log("err when con.query(): " + err.message);
                throw (err);
            }
            // 如果此user不存在於database內，則跳轉至註冊(這邊為了測試方便直接塞進db)
            if (result.length <= 0) {
                var insertNewUser = `INSERT INTO USER_LIST(userName) VALUES("${userName}")`;
                con.query(insertNewUser, (err, result) => {
                    if (err) console.log("err when inserting new user");
                    console.log(`New User: ${userName} inserted successfully`);
                    response = `New User: ${userName} inserted successfully`;
                    // 處理完新增user，再執行一次本function已獲取userID
                    UserLoginQuery(userName);
                    resolve(-1);
                })
            } else {  //若此user已經存在db內，則查詢其userID並存起來
                var userID = result[0]["userID"]; // 根據登入者的名字抓取userID
                resolve(userID);
            }
        });
    })


}

// 從第start筆資料開始，撈取amount筆資料
function ChatRecordQuery(userID, start, amount) {
    return new Promise((resolve, reject) => {
        var targetTable = `CHAT_RECORD_${(userID + 3) % 5}`  // 因為System是1，實際的第一位使用者是2開始，故+3後%5
        // 這邊訊息要用desc，也就是messageID數值由大到小排列，因為要從最新的訊息紀錄開始抓
        var getChatRecord = `SELECT * FROM ${targetTable} WHERE sender=${userID} or receiver=${userID} ORDER BY messageID DESC LIMIT ${amount} OFFSET ${start}`;
        con.query(getChatRecord, (err, result) => {
            if (err) {
                console.log(`err when getting ${userID}'s chat record: ${err.message}`);
                throw (err);
            }
            resolve(result);
        })
    })
}

function AppendNewMessageQuery(sender, receiver, message) {
    console.log("in");
    return new Promise((resolve, reject) => {
        var targetTable = `CHAT_RECORD_${(sender + 3) % 5}`  // 因為System是1，實際的第一位使用者是2開始，故+3後%5
        var appendNewMessage = `INSERT INTO ${targetTable}(sender, receiver, message) VALUES(${sender}, ${receiver}, '${message}')`;
        con.query(appendNewMessage, (err, result) => {
            if (err) {
                console.log(`err when appending user id ${sender}'s new message "${message}" to db. ErrMsg: ${err.message}`);
                throw (err);
            }
            resolve(result);
        })
    });
}