const mysql = require("mysql");

/*
product_name            ="快跑鞋2";
product_desscription    ="專門拿來慢跑的鞋子";
product_detail          ="除了可以慢跑還可以快跑";
product_price           ="1999";
product_spec            ="極致白";
product_stock           ="20";
product_img[0]             ="../public/product_img/1_1.jpg";
*/


const sql_init = require("./MySQL_init.js");
const config = sql_init.config;
sql_init.sql_init();

const query ={

    index_product_id:() =>{
        return new Promise((resolve, reject) => {
            //查詢當前product_id到幾號並+1返回
            var index_product_id;
            var sql = `select max(product_id) as max_product_id from product_list`;
            config.query(sql,(err,result)=>{
                if(err){
                    console.log(err.message);
                    reject("新增失敗");
                }else{
                    result = JSON.parse(JSON.stringify(result));
                    //console.log("result     :"+result[0].max_product_id);
                    if(result == null)
                    {
                        index_product_id = 1;
                    }
                    else
                    {
                        index_product_id = Number(result[0].max_product_id ) + 1;  
                    }
                    console.log("新商品id編號為:    "+index_product_id);
                    resolve(index_product_id);
                }
                
            })        
        })
    }, 
        
        
    NewProductName:(index_product_id,new_product_name)=>{
        return new Promise((resolve, reject) => {
            //product_list
            var sql_command = `INSERT INTO product_list(product_id,product_name) VALUES(?,?)`;
            var parm = [index_product_id,new_product_name];
            config.query(sql_command,parm,(err,result)=>{
                if(err){
                    console.log(err.message);
                    reject("新增失敗");
                }else{                    
                    console.log("新增商品名稱成功");
                    resolve("新增成功");
                }
            })
        })
    },
    
    NewProductInfor: (index_product_id,new_product_desscription,new_product_detail)=>{
        return new Promise((resolve, reject) => {
            //product_information
            var sql_command = `INSERT INTO product_information(product_id,product_description,product_detail) VALUES(?,?,?)`;
            var parm = [index_product_id,new_product_desscription,new_product_detail];
            config.query(sql_command,parm,(err,result)=>{
                if(err){
                    console.log(err.message);
                    reject("新增失敗");
                }else{
                    console.log("新增商品資訊成功");
                    resolve("新增成功");
                }
            })
        })
    },
    
    NewProductPrice: (index_product_id,new_product_price)=>{
        return new Promise((resolve, reject) => {
            //product_price
            var sql_command = `INSERT INTO product_price(product_id,product_price) VALUES(?,?)`;
            var parm = [index_product_id,new_product_price];
            config.query(sql_command,parm,(err,result)=>{
                if(err){
                    console.log(err.message);
                    reject("新增失敗");
                }else{
                    console.log("新增商品價格成功");
                    resolve("新增成功");
                }
            })
        })
    },
    
    NewProductSpec: (index_product_id,new_product_spec,new_product_stock)=>{
        return new Promise((resolve, reject) => {
            //product_specifications
            var sql_command = `INSERT INTO product_specifications(product_id,product_spec,product_stock) VALUES(?,?,?)`;
            var parm = [index_product_id,new_product_spec,new_product_stock];
            config.query(sql_command,parm,(err,result)=>{
                if(err){
                    console.log(err.message);
                    reject("新增失敗");
                }else{
                    console.log("新增商品規格成功");
                    resolve("新增成功");
                }
            })
        })
    },
    
    NewProductImg: (index_product_id,new_product_img)=>{
        return new Promise((resolve, reject) => {
            //product_specifications
            var sql_command = `INSERT INTO product_image(product_id,product_img) VALUES(?,?)`;
            var parm = [index_product_id,new_product_img];
            config.query(sql_command,parm,(err,result)=>{
                if(err){
                    console.log(err.message);
                    reject("新增失敗");
                }else{
                    console.log("新增商品照片成功");
                    resolve("新增成功");
                }
            })
        })
    },

    NewProductCate: (index_product_id,new_product_cate)=>{
        return new Promise((resolve, reject) => {
            //product_specifications
            var sql_command = `INSERT INTO product_category(product_id,category_id) VALUES(?,?)`;
            var parm = [index_product_id,new_product_cate];
            config.query(sql_command,parm,(err,result)=>{
                if(err){
                    console.log(err.message);
                    reject("新增失敗");
                }else{
                    console.log("新增商品分類成功");
                    resolve("新增成功");
                }
            })
        })
    },
}


//module.exports = query;

function Create_product(new_product){
    return new Promise((resolve, reject) => {
        /*
        console.log(typeof(new_product['new_product_spec[]']))
        console.log(new_product['new_product_spec[]'].length)
        for(var i = 0; i<new_product['new_product_spec[]'].length;i++)
        {
            console.log(new_product['new_product_spec[]'][i])            
        }*/
        
        
        query.index_product_id().then((data) => {
            data = Number(data) ;

            
            query.NewProductName(data,new_product.new_product_name);
            query.NewProductInfor(data,new_product.new_product_desscription,new_product.new_product_detail);
            query.NewProductPrice(data,new_product.new_product_price);
            
            /*
            //根據規格的變數類型來判斷是否有多個規格
            if(typeof(new_product['new_product_spec[]']) == "string") {
                query.NewProductSpec(data,new_product['new_product_spec[]'],new_product['new_product_stock[]']);
            }
            else{
                for (var i =0; i<new_product['new_product_spec[]'].length;i++)
                {          
                    query.NewProductSpec(data,new_product['new_product_spec[]'][i],new_product['new_product_stock[]'][i]);
                }
            }*/

            
            for(var i=0; i<new_product.new_product_spec.length;i++)
            {
                query.NewProductSpec(data,new_product.new_product_spec[i],new_product.new_product_stock[i]);
            }
            for(var i=0; i<new_product.new_product_img.length;i++)
            {
                query.NewProductImg(data,new_product.new_product_img[i]);
            }            
            query.NewProductCate(data,new_product.new_product_cate);

                   
        }).catch((err) => {
            console.log(err);
        })   
    })
}
module.exports = 
{
    Create_product
}