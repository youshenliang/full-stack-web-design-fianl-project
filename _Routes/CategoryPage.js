const express = require("express");
const router = express.Router();
const sql = require("mysql");
const path = require("path");

const bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });

const sql_cate_select = require("../_Controller/SelectByCategory_id.js");
const categoryModel = require("../_Controller/categoryQuery");
const sql_select = require("../_Controller/SelectByProduct_id");

router.use(express.static(path.resolve(__dirname, "/client/html/")));

router.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "../_View/main/Category.html"));
})
router.get("/initial",(req,res)=>{

    //商品資訊
    var search =  sql_select.select_All_product();
    search.then((data) => {        
        var result = {
            product:  "",
            allcategory: "",
          }
        result.product = data;

        //全商品種類表
        var cate_search = sql_cate_select.SelectAllCategory();
        cate_search.then(data=>{   
            result.allcategory = data;    
                
            //商品種類細項
            var product_cate = sql_cate_select.SelectLastCate();
            product_cate.then(data=>{
                    
                result.last_cate = data;

                //傳送資料給瀏覽器
                res.send(result);
            }) 
        
        })
    });

})

router.get("/childcate",(req,res)=>{
    console.log("這裡是GET")  ;
    console.log("變數為:  " + req.query.category_id);
    
    
    if(req.query.category_id ==null)
    {
        res.redirect("/");
        res.end();
    }

    res.sendFile(path.resolve(__dirname, "../_View/main/shop.html"));
})

router.post("/get4cate", urlencodeParser, (req, res) => {
    categoryModel.categoryQueryN(9).then(data => {
        res.status(200).send(data);
        res.end();
    })
})

module.exports = router;