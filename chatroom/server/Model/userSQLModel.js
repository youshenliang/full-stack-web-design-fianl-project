const mysql = require('mysql');

// 設定 MySQL 參數
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "web",
    charset: 'utf8mb4'
});

// 連線至 MySQL
con.connect((err) => {
    if (err) {
        console.log("err when con.connect(): " + err.message);
        throw (err);
    }
    console.log("connect to mysql successfully!");
})

const userSQLModel = {

    UserLoginQuery: (userName) => {
        // 用Promise等待SQL查詢完再resolve
        return new Promise((resolve, reject) => {
            // 先檢查此user是否存在於database內
            var checkUser = `SELECT * FROM USER_LIST WHERE userName="${userName}"`;
            con.query(checkUser, function (err, result) {
                if (err) {
                    console.log("err when con.query(): " + err.message);
                    reject("err when con.query(): " + err.message);
                }
                // 如果此user不存在於database內，則跳轉至註冊(這邊為了測試方便直接塞進db)
                if (result.length <= 0) {
                    var insertNewUser = `INSERT INTO USER_LIST(userName) VALUES("${userName}")`;
                    con.query(insertNewUser, (err, result) => {
                        if (err) console.log("err when inserting new user");
                        console.log(`New User: ${userName} inserted successfully`);
                        response = `New User: ${userName} inserted successfully`;
                        userSQLModel.UserLoginQuery(userName);
                    })
                } else {  //若此user已經存在db內，則查詢其userID並存起來
                    var userID = result[0]["userID"]; // 根據登入者的名字抓取userID
                    resolve(userID);
                }
            });
        })
    },

    ChatRecordQuery: (userID, start, amount) => {
        return new Promise((resolve, reject) => {
            var targetTable = `CHAT_RECORD_${(userID + 3) % 5}`  // 因為System是1，實際的第一位使用者是2開始，故+3後%5
            // 這邊訊息要用desc，也就是messageID數值由大到小排列，因為要從最新的訊息紀錄開始抓
            var getChatRecord = `SELECT * FROM ${targetTable} WHERE sender=${userID} or receiver=${userID} ORDER BY messageID DESC LIMIT ${amount} OFFSET ${start}`;
            con.query(getChatRecord, (err, result) => {
                if (err) {
                    console.log(`err when getting ${userID}'s chat record: ${err.message}`);
                    reject(`err when getting ${userID}'s chat record: ${err.message}`);
                }
                resolve(result);
            })
        })
    },

    AppendNewMessageQuery: (sender, receiver, message) => {
        return new Promise((resolve, reject) => {
            var targetTable = `CHAT_RECORD_${(sender + 3) % 5}`  // 因為System是1，實際的第一位使用者是2開始，故+3後%5
            var appendNewMessage = `INSERT INTO ${targetTable}(sender, receiver, message) VALUES(${sender}, ${receiver}, '${message}')`;
            con.query(appendNewMessage, (err, result) => {
                if (err) {
                    console.log(`err when appending user id ${sender}'s new message "${message}" to db. ErrMsg: ${err.message}`);
                    reject(`err when appending user id ${sender}'s new message "${message}" to db. ErrMsg: ${err.message}`);
                }
                resolve(result);
            })
        });
    },
}

module.exports = userSQLModel;