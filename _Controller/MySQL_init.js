const mysql = require("mysql");
const fs = require("fs");

var config = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'web'    
})

function sql_init()
{
    var config = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'web'    
    })

    config.connect((err)=>{
        if (err)
        {
            return console.error('error: '+err.message);
        }
        return //console.log("成功連線至商品資料庫");
    })
}
module.exports = 
{
    config,
    sql_init
}