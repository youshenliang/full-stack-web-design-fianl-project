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

const orderModel = {

    // 根據userID查詢所有訂單
    orderlistQuery: (userID) => {
        return new Promise((resolve, reject) => {
            // 查詢 userID, product_id, spec, amount
            var orderlist = `SELECT orderID, product_id, product_img, product_name, spec, product_price, amount, receiver_name, receiver_phone, receiver_email, receiver_address FROM order_record WHERE userID="${userID}"`;
            con.query(orderlist, function (err, result) {
                if (err) {
                    console.log("err when con.query(): " + err.message);
                    reject("err when con.query(): " + err.message);
                }
                resolve(result);
            });
        })
    },
    
    orderlistQueryAll: () => {
        return new Promise((resolve, reject) => {
            // 查詢 userID, product_id, spec, amount
            var orderlist = `SELECT orderID, product_id, product_img, product_name, spec, product_price, amount, receiver_name, receiver_phone, receiver_email, receiver_address FROM order_record`;
            con.query(orderlist, function (err, result) {
                if (err) {
                    console.log("err when con.query(): " + err.message);
                    reject("err when con.query(): " + err.message);
                }
                resolve(result);
            });
        })
    },

    // 建立新訂單
    appendOrder: (orderID, userID, product_id, product_img, product_name, spec, product_price, amount, receiver_name, receiver_phone, receiver_email, receiver_address) => {
        return new Promise((resolve, reject) => {
            // 查詢 userID, product_id, spec, amount
            var appendorder = `INSERT INTO order_record (orderID, userID, product_id, product_img, product_name, spec, product_price, amount, receiver_name, receiver_phone, receiver_email, receiver_address)
            VALUES ("${orderID}", "${userID}", "${product_id}", "${product_img}", "${product_name}", "${spec}", "${product_price}", "${amount}", "${receiver_name}", "${receiver_phone}", "${receiver_email}", "${receiver_address}")`;
            con.query(appendorder, function (err, result) {
                if (err) {
                    console.log("err when con.query(): " + err.message);
                    reject("err when con.query(): " + err.message);
                }
                resolve("訂單記錄新增成功");
            });
        })
    },
}

module.exports = orderModel;