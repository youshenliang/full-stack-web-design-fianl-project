const mysql = require("mysql");
const sql_init = require("../_Controller/MySQL_init");
const config = sql_init.config;
sql_init.sql_init();

function add_wish(wish_link, wish_name, wish_price, userID) {

    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO wish_list(wish_link, wish_name, wish_price, userID) VALUES(?,?,?,?)`
        var parm = [wish_link, wish_name, wish_price, userID];
        config.query(sql, parm, (err, result) => {
            if (err) {
                //console.log("新增願望清單失敗");
                //console.log(err);
                reject(err);
            } else {
                result = JSON.parse(JSON.stringify(result));
                //console.log("新增成功");
                resolve("新增成功");
            }
        })
    })
}



module.exports =
{
    add_wish
}