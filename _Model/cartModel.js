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

const cartModel = {

    // 查詢購物車內所有商品
    cartlistQuery: (userID) => {
        return new Promise((resolve, reject) => {
            // 查詢 userID, product_id, spec, amount
            var cartlist = `SELECT userID, product_id, spec, amount FROM cart WHERE userID="${userID}"`;
            con.query(cartlist, function (err, result) {
                if (err) {
                    console.log("err when con.query(): " + err.message);
                    reject("err when con.query(): " + err.message);
                }
                resolve(result);
            });
        })
    },

    // 查詢購買的規格及數量
    productSpecAmountQuery: (product_id) => {
        return new Promise((resolve, reject) => {
            // 查詢 userID, product_id, spec, amount
            var cartlist = `SELECT cart_id, spec, amount, product_id FROM cart WHERE product_id="${product_id}"`;
            con.query(cartlist, function (err, result) {
                if (err) {
                    console.log("err when con.query(): " + err.message);
                    reject("err when con.query(): " + err.message);
                }
                resolve(result);
            });
        })
    },

    // 查詢商品名稱
    productNameQuery: (product_id) => {
        return new Promise((resolve, reject) => {
            // 查詢 userID, product_id, spec, amount
            var productName = `SELECT product_name FROM product_list WHERE product_id="${product_id}"`;
            con.query(productName, function (err, result) {
                if (err) {
                    console.log("err when con.query(): " + err.message);
                    reject("err when con.query(): " + err.message);
                }
                resolve(result[0]);
            });
        })
    },

    // 查詢商品圖片，若有多張則只取第一張
    productImageQuery: (product_id) => {
        return new Promise((resolve, reject) => {
            // 查詢 userID, product_id, spec, amount
            var productImage = `SELECT product_img FROM product_image WHERE product_id="${product_id}"`;
            con.query(productImage, function (err, result) {
                if (err) {
                    console.log("err when con.query(): " + err.message);
                    reject("err when con.query(): " + err.message);
                }
                resolve(result[0]);  // 回傳第一張圖片
            });
        })
    },

    // 查詢商品的所有規格及其剩餘數量
    productSpecStockQuery: (product_id) => {
        return new Promise((resolve, reject) => {
            // 查詢 userID, product_id, spec, amount
            var productSpecStock = `SELECT product_spec, product_stock FROM product_specifications WHERE product_id="${product_id}"`;
            con.query(productSpecStock, function (err, result) {
                if (err) {
                    console.log("err when con.query(): " + err.message);
                    reject("err when con.query(): " + err.message);
                }
                //console.log(`in cartmodel, res: ${JSON.stringify(result)}`);
                resolve(result);
            });
        })
    },

    // 查詢商品價錢
    productPriceQuery: (product_id) => {
        return new Promise((resolve, reject) => {
            // 查詢 userID, product_id, spec, amount
            var productPrice = `SELECT product_price FROM product_price WHERE product_id="${product_id}"`;
            con.query(productPrice, function (err, result) {
                if (err) {
                    console.log("err when con.query(): " + err.message);
                    reject("err when con.query(): " + err.message);
                }
                resolve(result[0]);
            });
        })
    },

    // 更新購買數量
    editAmountQuery: (cart_id, amount) => {
        return new Promise((resolve, reject) => {
            // 查詢 userID, product_id, spec, amount
            var editAmount = `UPDATE cart SET amount="${amount}" WHERE cart_id="${cart_id}"`;
            con.query(editAmount, function (err, result) {
                if (err) {
                    console.log("err when con.query(): " + err.message);
                    reject("err when con.query(): " + err.message);
                }
                resolve(result);
            });
        })
    },

    // 根據cart_id刪除購物車資料
    deleteCartByCartID: (cart_id) => {
        return new Promise((resolve, reject) => {
            // 查詢 userID, product_id, spec, amount
            var deleteCart = `DELETE FROM cart WHERE cart_id="${cart_id}"`;
            con.query(deleteCart, function (err, result) {
                if (err) {
                    console.log("err when con.query(): " + err.message);
                    reject("err when con.query(): " + err.message);
                }
                resolve("刪除成功");
            });
        })
    },

    // 根據userID刪除購物車資料
    deleteCartByuserID: (userID) => {
        return new Promise((resolve, reject) => {
            // 查詢 userID, product_id, spec, amount
            var deleteCart = `DELETE FROM cart WHERE userID="${userID}"`;
            con.query(deleteCart, function (err, result) {
                if (err) {
                    console.log("err when con.query(): " + err.message);
                    reject("err when con.query(): " + err.message);
                }
                resolve("刪除成功");
            });
        })
    },

    // 新增購物車資料
    appendCartRecord: (userID, product_id, spec, amount) => {
        return new Promise((resolve, reject) => {
            // 查詢 userID, product_id, spec, amount
            var deleteCart = `INSERT INTO cart (userID, product_id, spec, amount) VALUES ("${userID}", "${product_id}", "${spec}", "${amount}")`;
            con.query(deleteCart, function (err, result) {
                if (err) {
                    console.log("err when con.query(): " + err.message);
                    reject("err when con.query(): " + err.message);
                }
                resolve("刪除成功");
            });
        })
    },
    
}

module.exports = cartModel;