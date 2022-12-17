const socketIO = require('socket.io');
const userSQLModel = require('../_Model/userSQLModel');

var USER_ID = -1;

// 建立 socket model
const socketModel = (server) => {
    var io = socketIO(server);

    io.on('connection', (socket) => {

        console.log('Socket connected! User ', socket.id);

        // 當有user登入socket.io時
        socket.on('user_login', (userName) => {
            userSQLModel.UserLoginQuery(userName).then((userID) => {
                USER_ID = userID;
            }).catch((err) => {
                console.log(`err when user login (userController.js): ${err.message}`);
                throw (err);
            })
        })

        // 當client要求載入對話紀錄，則根據登入的使用者身分，抓取對話紀錄
        socket.on('get_chat_record', (option) => {
            var amount = option[0];
            var offset = option[1];
            userSQLModel.ChatRecordQuery(USER_ID, offset, amount).then((chatRecord) => {
                io.emit('get_chat_record', chatRecord);
            }).catch((err) => {
                console.log(`err when getting chat record: ${err.message}`);
                throw (err);
            })
        })

        // 當client端發送新訊息
        socket.on('new_message_from_client', (message) => {
            userSQLModel.AppendNewMessageQuery(USER_ID, 1, message).then((data) => {
                console.log("Append: ", message);
                userSQLModel.ChatRecordQuery(USER_ID, 0, 1).then((data) => {
                    io.emit('new_message_from_client', data);
                })
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
}

module.exports = socketModel;