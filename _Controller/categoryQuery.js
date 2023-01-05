const sql_init = require("./MySQL_init.js");
const config = sql_init.config;
sql_init.sql_init();

const query = {
    CategoryNameByParenteIdQuery:  (parent_category_id)=>{
        return new Promise((resolve, reject) => {
            var sql = `select category_name from product_categoryname where parent_category_id = ?`;
            config.query(sql, parent_category_id, (err, result) => {
                if(err) {
                    console.log(`err when getting product_categoryname in categoryQuery.js: ${err.message}`);
                    reject(`err when getting product_categoryname in categoryQuery.js: ${err.message}`);
                }else{
                    result = JSON.parse(JSON.stringify(result));
                    resolve(result);
                }
            })
        })
    },
    CategoryNameByProduct_IdQuery:  (product_id)=>{
        return new Promise((resolve, reject) => {
            var sql = `select category_id from product_category where product_id = ?`;
            config.query(sql, product_id, (err, result) => {
                if(err) {
                    console.log(`err when getting product_category in categoryQuery.js: ${err.message}`);
                    reject(`err when getting product_category in categoryQuery.js: ${err.message}`);
                }else{
                    result = JSON.parse(JSON.stringify(result));
                    resolve(result);
                }
            })
        })
    },
    CategoryLastQuery:  ()=>{
        return new Promise((resolve, reject) => {
            var sql = `select * from product_category `;
            config.query(sql, (err, result) => {
                if(err) {
                    console.log(`err when getting * in categoryQuery.js: ${err.message}`);
                    reject(`err when getting * in categoryQuery.js: ${err.message}`);
                }else{
                    result = JSON.parse(JSON.stringify(result));
                    resolve(result);
                }
            })
        })
    },
    CategoryNameAll:  ()=>{
        return new Promise((resolve, reject) => {
            var sql = `select * from product_categoryname`;
            config.query(sql,  (err, result) => {
                if(err) {
                    console.log(`err when getting product_categoryname in categoryQuery.js: ${err.message}`);
                    reject(`err when getting product_categoryname in categoryQuery.js: ${err.message}`);
                }else{
                    result = JSON.parse(JSON.stringify(result));
                    resolve(result);
                }
            })
        })
    },

    categoryQueryN: (n) => {
        return new Promise((resolve, reject) => {
            var sql = `select * from product_categoryname limit ${n} `;
            config.query(sql, (err, result) => {
                if(err) {
                    console.log(`err when getting * in categoryQuery.js: ${err.message}`);
                    reject(`err when getting * in categoryQuery.js: ${err.message}`);
                }else{
                    result = JSON.parse(JSON.stringify(result));
                    resolve(result);
                }
            })
        })
    },

    NewCategory:  (category_name,parent_category_id)=>{
        return new Promise((resolve, reject) => {
            var sql = `INSERT INTO product_categoryname(category_name,parent_category_id) VALUES(?,?)`;
            var parm = [category_name,parent_category_id];
            config.query(sql,parm,(err,result)=>{
                if(err){
                    console.log(err.message);
                    reject("新增失敗");
                }else{
                    console.log("新增分類成功");
                    resolve("新增成功");
                }
            })
        })
    },
}
module.exports = query;