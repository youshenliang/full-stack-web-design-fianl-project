const { productImageQuery } = require("../_Model/cartModel.js");
const sql_init = require("./MySQL_init.js");
const config = sql_init.config;
sql_init.sql_init();

const query = {
    ConsolutProduct: (keywords) => {
        return new Promise((resolve, reject) => {
            var sql = 'select product_id from product_list where product_name like ?'
            config.query(sql, "%" + keywords + "%", (err, result) => {
                if (err) {
                    console.log(`err when getting product_id in ConsolutProduct.js: ${err.message}`);
                    reject(`err when getting product_id in ConsolutProduct.js: ${err.message}`);
                } else {
                    result = JSON.parse(JSON.stringify(result));
                    resolve(result);
                }
            })
        })
    },

    ProductAmountEdit: (product_id, spec, new_amount) => {
        return new Promise((resolve, reject) => {
            var sql = `UPDATE product_specifications SET product_stock="${new_amount}" WHERE product_id="${product_id}" AND product_spec="${spec}"`
            config.query(sql, (err, result) => {
                if (err) {
                    console.log(`err when getting product_id in ConsolutProduct.js: ${err.message}`);
                    reject(`err when getting product_id in ConsolutProduct.js: ${err.message}`);
                } else {
                    resolve(result);
                }
            })
        })
    },

    ProductNameQuery: (product_id) => {
        return new Promise((resolve, reject) => {
            //選取所有商品
            if (product_id == null) {
                var sql = `select * from product_list`;
                config.query(sql, (err, result) => {
                    if (err) {
                        console.log(`err when getting * in productQuery.js: ${err.message}`);
                        reject(`err when getting * in productQuery.js: ${err.message}`);
                    } else {
                        result = JSON.parse(JSON.stringify(result));
                        resolve(result);
                    }
                })
            }
            //選取product_id的商品
            else {
                var sql = `select product_name from product_list where product_id = ?`;
                config.query(sql, product_id, (err, result) => {
                    if (err) {
                        console.log(`err when getting product_name in productQuery.js: ${err.message}`);
                        reject(`err when getting product_name in productQuery.js: ${err.message}`);
                    } else {
                        result = JSON.parse(JSON.stringify(result));
                        resolve(result);
                    }
                })
            }
        })
    },

    ProductPriceQuery: (product_id) => {
        return new Promise((resolve, reject) => {
            //選取所有商品
            if (product_id == null) {
                var sql = `select * from product_price `;
                config.query(sql, (err, result) => {
                    if (err) {
                        console.log(`err when getting * in productQuery.js: ${err.message}`);
                        reject(`err when getting * in productQuery.js: ${err.message}`);
                    } else {
                        result = JSON.parse(JSON.stringify(result));
                        resolve(result);
                    }
                })
            }
            //選取product_id的商品
            else {
                var sql = `select product_price from product_price where product_id = ?`;
                config.query(sql, product_id, (err, result) => {
                    if (err) {
                        console.log(`err when getting product_price in productQuery.js: ${err.message}`);
                        reject(`err when getting product_price in productQuery.js: ${err.message}`);
                    } else {
                        result = JSON.parse(JSON.stringify(result));
                        resolve(result);
                    }
                })
            }
        })
    },

    ProductDescriptionQuery: (product_id) => {
        return new Promise((resolve, reject) => {
            //選取所有商品
            if (product_id == null) {
                var sql = `select * from product_information `;
                config.query(sql, (err, result) => {
                    if (err) {
                        console.log(`err when getting * in productQuery.js: ${err.message}`);
                        reject(`err when getting * in productQuery.js: ${err.message}`);
                    } else {
                        result = JSON.parse(JSON.stringify(result));
                        resolve(result);
                    }
                })
            }
            //選取product_id的商品
            else {
                var sql = `select product_description, product_detail from product_information where product_id = ?`;
                config.query(sql, product_id, (err, result) => {
                    if (err) {
                        console.log(`err when getting product_description, product_detail in productQuery.js: ${err.message}`);
                        reject(`err when getting product_description, product_detail in productQuery.js: ${err.message}`);
                    } else {
                        result = JSON.parse(JSON.stringify(result));
                        resolve(result);
                    }
                })
            }
        })
    },

    ProductSpecQuery: (product_id) => {

        return new Promise((resolve, reject) => {
            //選取所有商品
            if (product_id == null) {
                var sql = `select * from product_specifications `;;
                config.query(sql, (err, result) => {
                    if (err) {
                        console.log(`err when getting * in productQuery.js: ${err.message}`);
                        reject(`err when getting * in productQuery.js: ${err.message}`);
                    } else {
                        result = JSON.parse(JSON.stringify(result));
                        resolve(result);
                    }
                })
            }
            //選取product_id的商品
            else {
                var sql = `select product_spec,product_stock from product_specifications where product_id = ?`;;
                config.query(sql, product_id, (err, result) => {
                    if (err) {
                        console.log(`err when getting product_spec,product_stock,product_img in productQuery.js: ${err.message}`);
                        reject(`err when getting product_spec,product_stock in productQuery.js: ${err.message}`);
                    } else {
                        result = JSON.parse(JSON.stringify(result));
                        resolve(result);
                    }
                })
            }
        })
    },

    ProductImgQuery: (product_id) => {
        return new Promise((resolve, reject) => {
            //選取所有商品
            if (product_id == null) {
                var sql = `select * from product_image`;
                config.query(sql, (err, result) => {
                    if (err) {
                        console.log(`err when getting * in productQuery.js: ${err.message}`);
                        reject(`err when getting * in productQuery.js: ${err.message}`);
                    } else {
                        result = JSON.parse(JSON.stringify(result));
                        resolve(result);
                    }
                })
            }
            //選取product_id的商品
            else {
                var sql = `select product_img from product_image where product_id = ?`;
                config.query(sql, product_id, (err, result) => {
                    if (err) {
                        console.log(`err when getting product_image in productQuery.js: ${err.message}`);
                        reject(`err when getting product_image in productQuery.js: ${err.message}`);
                    } else {
                        result = JSON.parse(JSON.stringify(result));
                        resolve(result);
                    }
                })
            }
        })
    },

    get8products: (offset) => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT product_id, product_name from product_list LIMIT 1 OFFSET ${offset}`
            config.query(sql, (err, data) => {
                if (err) {
                    console.log(`err when getting product_id in ConsolutProduct.js: ${err.message}`);
                    reject(`err when getting product_id in ConsolutProduct.js: ${err.message}`);
                } else {
                    resolve(data);                
                }
            })
        })
    },
}

module.exports = query;