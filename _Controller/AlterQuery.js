const sql_init = require("./MySQL_init.js");
const config = sql_init.config;
sql_init.sql_init();

const query = {

    //刪除商品名稱
    Delete_product_name:(delete_product_id) =>{
        return new Promise((resolve, reject) => {
            var sql = `delete from product_list where product_id = ?`
            config.query(sql,delete_product_id,(err)=>{
                if(err){
                    console.log(err.message);
                    reject(err);
                }else{
                    resolve("刪除成功");
                }
            })
        })
    },
    //刪除商品概述
    Delete_product_infor:(delete_product_id) =>{
        return new Promise((resolve, reject) => {
            var sql = `delete from product_information where product_id = ?`
            config.query(sql,delete_product_id,(err)=>{
                if(err){
                    console.log(err.message);
                    reject(err);
                }else{
                    resolve("刪除成功");
                }
            })
        })
    },
    //刪除商品價格
    Delete_product_price:(delete_product_id) =>{
        return new Promise((resolve, reject) => {
            var sql = `delete from product_price where product_id = ?`
            config.query(sql,delete_product_id,(err)=>{
                if(err){
                    console.log(err.message);
                    reject(err);
                }else{
                    resolve("刪除成功");
                }
            })
        })
    },
    //刪除商品規格
    Delete_product_spec:(delete_product_id) =>{
        return new Promise((resolve, reject) => {
            var sql = `delete from product_specifications where product_id = ?`
            config.query(sql,delete_product_id,(err)=>{
                if(err){
                    console.log(err.message);
                    reject(err);
                }else{
                    resolve("刪除成功");
                }
            })
        })
    },
    //刪除商品照片
    Delete_product_img:(delete_product_id) =>{
        return new Promise((resolve, reject) => {
            var sql = `delete from product_image where product_id = ?`
            config.query(sql,delete_product_id,(err)=>{
                if(err){
                    console.log(err.message);
                    reject(err);
                }else{
                    resolve("刪除成功");
                }
            })
        })
    },
    //刪除商品分類
    Delete_product_cate:(delete_product_id) =>{
        return new Promise((resolve, reject) => {
            var sql = `delete from product_category where product_id = ?`
            config.query(sql,delete_product_id,(err)=>{
                if(err){
                    console.log(err.message);
                    reject(err);
                }else{
                    resolve("刪除成功");
                }
            })
        })
    },    

    //修改商品名稱
    Alter_product_name:(product_id,alter_product_name) =>{
        return new Promise((resolve, reject) => {
            var sql = `UPDATE product_list SET product_name = ? WHERE product_id = ?`
            var parm =[alter_product_name,product_id]
            config.query(sql,parm,(err)=>{
                if(err){
                    console.log(err.message);
                    reject(err);
                }else{
                    resolve("修改成功");
                }
            })
        })
    },
    //修改商品概述
    Alter_product_description:(product_id,alter_product_description) =>{
        return new Promise((resolve, reject) => {
            var sql = `UPDATE product_information SET product_description = ? WHERE product_id = ?`
            var parm =[alter_product_description,product_id]
            config.query(sql,parm,(err)=>{
                if(err){
                    console.log(err.message);
                    reject(err);
                }else{
                    resolve("修改成功");
                }
            })
        })
    },
    //修改商品細節
    Alter_product_detail:(product_id,alter_product_detail) =>{
        return new Promise((resolve, reject) => {
            var sql = `UPDATE product_information SET product_detail = ? WHERE product_id = ?`
            var parm = [alter_product_detail,product_id]
            config.query(sql,parm,(err)=>{
                if(err){
                    console.log(err.message);
                    reject(err);
                }else{
                    resolve("修改成功");
                }
            })
        })
    },
    //修改商品價格
    Alter_product_price:(product_id,alter_product_price) =>{
        return new Promise((resolve, reject) => {            
            var sql = `UPDATE product_price SET product_price = ? WHERE product_id = ?`
            var parm = [alter_product_price,product_id]
            config.query(sql,parm,(err)=>{
                if(err){
                    console.log(err.message);
                    reject(err);
                }else{
                    resolve("修改成功");
                }
            })
        })
    },
    //修改商品規格
    Alter_product_spec:(product_id,Alter_product_spec,Alter_product_stock) =>{
        return new Promise((resolve, reject) => {
            //先刪除再建立
            //刪除
            var sql = `delete from product_specifications where product_id = ?`
            config.query(sql,product_id,(err)=>{
                if(err){
                    console.log(err.message);
                    reject(err);
                }else{                    
                    //建立
                    promise_number = [];
                    for(var i=0;i<Alter_product_spec.length;i++)
                    {
                        var sql_command = `INSERT INTO product_specifications(product_id,product_spec,product_stock) VALUES(?,?,?)`;
                        var parm = [product_id,Alter_product_spec[i],Alter_product_stock[i]];
                        promise_number[i] = config.query(sql_command,parm,(err,result)=>{
                            if(err){
                                console.log(err.message);
                                reject("修改失敗");
                            }
                        })
                    }
                    Promise.all(promise_number).then(() => {
                        resolve("修改成功");
                    }).catch((err) => {
                        console.log(`err at promise.all: ${err.message}`);
                        reject(`err at promise.all: ${err.message}`);
                    })
                    /*
                    if(typeof(Alter_product_spec) == "string")
                    {
                        var sql_command = `INSERT INTO product_specifications(product_id,product_spec,product_stock) VALUES(?,?,?)`;
                        var parm = [product_id,Alter_product_spec,Alter_product_stock];
                        config.query(sql_command,parm,(err,result)=>{
                            if(err){
                                console.log(err.message);
                                reject("修改失敗");
                            }
                            else{
                                resolve("修改成功")
                            }
                        })
                    }
                    else
                    {
                        promise_number = [];
                        for(var i=0;i<Alter_product_spec.length;i++)
                        {
                            var sql_command = `INSERT INTO product_specifications(product_id,product_spec,product_stock) VALUES(?,?,?)`;
                            var parm = [product_id,Alter_product_spec[i],Alter_product_stock[i]];
                            promise_number[i] = config.query(sql_command,parm,(err,result)=>{
                                if(err){
                                    console.log(err.message);
                                    reject("修改失敗");
                                }
                            })
                        }
                        Promise.all(promise_number).then(() => {
                            resolve("修改成功");
                        }).catch((err) => {
                            console.log(`err at promise.all: ${err.message}`);
                            reject(`err at promise.all: ${err.message}`);
                        })
                    }  */                                    
                }
            })
        })
    },
    //修改商品照片
    Alter_product_img:(product_id,Alter_product_img) =>{
        return new Promise((resolve, reject) => {
            //先刪除再增加
            var sql = `delete from product_image where product_id = ?`
            config.query(sql,product_id,(err)=>{
                if(err){
                    console.log(err.message);
                    reject(err);
                }else{
                    //建立
                    promise_number = [];
                    for(var i=0; i<Alter_product_img.length;i++)
                    {
                        var sql_command = `INSERT INTO product_image(product_id,product_img) VALUES(?,?)`;
                            var parm = [product_id,Alter_product_img[i]];
                            promise_number[i] = config.query(sql_command,parm,(err,result)=>{
                                if(err){
                                    console.log(err.message);
                                    reject("修改失敗");
                                }
                            })  
                    }
                    Promise.all(promise_number).then(() => {
                        resolve("修改成功");
                    }).catch((err) => {
                        console.log(`err at promise.all: ${err.message}`);
                        reject(`err at promise.all: ${err.message}`);
                    })
                    /*
                    if(typeof(Alter_product_spec) == "string")
                    {
                        var sql_command = `INSERT INTO product_image(product_id,product_img) VALUES(?,?)`;
                        var parm = [product_id,Alter_product_img];
                        config.query(sql_command,parm,(err,result)=>{
                            if(err){
                                console.log(err.message);
                                reject("修改失敗");
                            }
                            else{
                                resolve("修改成功")
                            }
                        })
                    }
                    else
                    {
                        promise_number = [];
                        for(var i=0;i<Alter_product_img.length;i++)
                        {
                            var sql_command = `INSERT INTO product_image(product_id,product_img) VALUES(?,?)`;
                            var parm = [product_id,Alter_product_spec[i]];
                            promise_number[i] = config.query(sql_command,parm,(err,result)=>{
                                if(err){
                                    console.log(err.message);
                                    reject("修改失敗");
                                }
                            })                            
                        }
                        Promise.all(promise_number).then(() => {
                            resolve("修改成功");
                        }).catch((err) => {
                            console.log(`err at promise.all: ${err.message}`);
                            reject(`err at promise.all: ${err.message}`);
                        })
                    }*/
                }
            })
        })
    },
    //修改商品分類
    Alter_product_cate:(product_id,alter_product_cate) =>{
        return new Promise((resolve, reject) => {
            var sql = `UPDATE product_category SET category_id = ? WHERE product_id = ?`
            var parm = [alter_product_cate,product_id]
            config.query(sql,parm,(err)=>{
                if(err){
                    console.log(err.message);
                    reject(err);
                }else{
                    resolve("修改成功");
                }
            })
        })
    },
    
}


//module.exports = query;
function Delete_product(delete_product_id){
    return new Promise((resolve, reject) => {
        delete_array = [];
        delete_array[0] = query.Delete_product_name(delete_product_id);
        delete_array[1] = query.Delete_product_infor(delete_product_id);
        delete_array[2] = query.Delete_product_price(delete_product_id);
        delete_array[3] = query.Delete_product_spec(delete_product_id);
        delete_array[4] = query.Delete_product_img(delete_product_id);
        delete_array[5] = query.Delete_product_cate(delete_product_id);

        Promise.all(delete_array).then(() => {
            resolve("刪除成功");
        }).catch((err) => {
            console.log(`err at promise.all: ${err.message}`);
            reject(`err at promise.all: ${err.message}`);
        })
    })
}
function Alter_product(alter_data){
    return new Promise((resolve, reject) => {
        
        //console.log(alter_data)
        var promise_number = [];
        if("product_name" in alter_data) {
            //console.log("name_yes");
            promise_name = query.Alter_product_name(alter_data.product_id,alter_data.product_name);
            promise_number.push(promise_name);
        }
        if("product_cate" in alter_data) {
            //console.log("cate_yes");
            promise_cate = query.Alter_product_cate(alter_data.product_id,alter_data.product_cate);
            promise_number.push(promise_cate);
        }
        if("product_price" in alter_data) {
            //console.log("price_yes");
            console.log(`in alterquery.js 344, alter id: ${alter_data.product_id}, alter price: ${alter_data.product_price}`)
            promise_price = query.Alter_product_price(alter_data.product_id, alter_data.product_price);
            promise_number.push(promise_price);
        }
        if("product_description" in alter_data) {
            //console.log("description_yes");
            promise_description = query.Alter_product_description(alter_data.product_id,alter_data.product_description);
            promise_number.push(promise_description);
        }
        if("product_detail" in alter_data) {
            //console.log("detail_yes");
            promise_detail = query.Alter_product_detail(alter_data.product_id,alter_data.product_detail);
            promise_number.push(promise_detail);
        }
        if("product_img" in alter_data) {
            //console.log("img_yes");
            promise_img = query.Alter_product_img(alter_data.product_id,alter_data.product_img);
            promise_number.push(promise_img);
        }
        if("product_spec" in alter_data) {
            //console.log("spec_yes");
            promise_spec = query.Alter_product_spec(alter_data.product_id,alter_data.product_spec,alter_data.product_stock);
            promise_number.push(promise_spec);
        }

        Promise.all([promise_number]).then(()=> {
            resolve("修改成功");
        }).catch((err) => {
            console.log(`err at promise.all: ${err.message}`);
            reject(`err at promise.all: ${err.message}`);
        })
    })
}
module.exports = 
{
    Delete_product,
    Alter_product
}