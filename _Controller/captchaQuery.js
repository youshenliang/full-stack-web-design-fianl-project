const sql_init = require("./MySQL_init.js");
const config = sql_init.config;
sql_init.sql_init();

function select_captcha(index){
    
    return new Promise((resolve, reject) => {
        var sql = `select captchaPath from captcha where captcha_id = ?`
        config.query(sql,index,(err,result)=>{
            if(err){
                //console.log("查詢驗證碼失敗");
                //console.log(err);
                reject(err);
            }else{
                result = JSON.parse(JSON.stringify(result));
                result = result[0].captchaPath;
                console.log("captque: ", result);
                resolve(result);
            }
        })
    })    
    
}

module.exports = 
{
    select_captcha
}