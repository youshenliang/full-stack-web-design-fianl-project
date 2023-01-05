const socketIO = require('socket.io');
const userSQLModel = require('../_Model/userSQLModel');

// 建立 socket model
const socketModel = (server) => {
    var io = socketIO(server);

    io.on('connection', (socket) => {

        console.log('Socket connected! User ', socket.id);

        // 當有user登入socket.io時
        socket.on('user_login', (userID) => {

        })

        // 當client要求載入對話紀錄，則根據登入的使用者身分，抓取對話紀錄
        socket.on('get_chat_record', (userID, option) => {
            var amount = option[0];
            var offset = option[1];
            userSQLModel.ChatRecordQuery(userID, offset, amount).then((chatRecord) => {
                userSQLModel.UserNameQuery(userID).then((userName) => {
                    io.emit('get_chat_record', chatRecord);
                });
            }).catch((err) => {
                console.log(`err when getting chat record: ${err.message}`);
                throw (err);
            })
        })
        
        // 當system要求載入對話紀錄，則根據登入的使用者身分，抓取對話紀錄
        socket.on('get_chat_record_from_system', (userID, option) => {
            var amount = option[0];
            var offset = option[1];
            userSQLModel.ChatRecordQuery(userID, offset, amount).then((chatRecord) => {
                userSQLModel.UserNameQuery(userID).then((userName) => {
                    io.emit('get_chat_record_from_system', chatRecord, userID, userName);
                });
            }).catch((err) => {
                console.log(`err when getting chat record: ${err.message}`);
                throw (err);
            })
        })

        // 當client端發送新訊息
        socket.on('new_message_from_client', (userID, message) => {
            userSQLModel.AppendNewMessageQuery(userID, 1, message).then((data) => {
                console.log("Append: ", message);
                userSQLModel.ChatRecordQuery(userID, 0, 1).then((data) => {
                    userSQLModel.UserNameQuery(userID).then((userName) => {
                        io.emit('new_message_from_client', data, userID, userName);
                    });
                })
            }).catch((err) => {
                console.log(`err when appending message: ${err.message}`);
                throw (err);
            })
        })
 
        // 當system端發送新訊息
        socket.on('new_message_from_system', (receiver, message) => {
            console.log('receiver: ', receiver);
            userSQLModel.AppendNewMessageQuery(1, receiver, message).then((data) => {
                console.log("Append: ", message);
                userSQLModel.ChatRecordQuery(receiver, 0, 1).then((data) => {
                    io.emit('new_message_from_system', data);
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