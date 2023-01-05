const { Console } = require("console");
const { json } = require("express");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const sql = require("mysql");
const path = require("path");

const bodyParser = require('body-parser');
const productModel = require("../_Controller/productQuery");

var urlencodeParser = bodyParser.urlencoded({ extended: false });


/*
var product_name;
var product_desscription;
var product_detail;
var product_price;
var product_spec;
var product_stock;
var product_img;*/

//const sql_init = require("./MySQL_init.js");
//const config = sql_init.config;

const sql_select = require("../_Controller/SelectByProduct_id");
//var product = sql_select.product;
const sql_cate_select = require("../_Controller/SelectByCategory_id.js");

router.use(express.static('client'));

router.get("/", (req, res) => {
  console.log("這裡是GET");
  console.log("變數為:  " + req.query.product_id);

  if (req.query.product_id == null) {
    res.redirect("/");
    res.end();
  }
  product_id = req.query.product_id;

  res.sendFile(path.resolve(__dirname, '../_View/main/product.html'));

})

router.post("/", urlencodeParser, (req, res) => {
  console.log("接收product_id變數");
  var product_id = req.body.product_id.slice(12);
  console.log("product_id:  " + product_id);
  var result = {
    product: "",
    allcategory: "",
    cate_detail: "",
  }
  //商品資訊
  var search = sql_select.select_product_id(product_id);
  search.then((data) => {

    result.product = data;
    //res.send(result);

    if (data.product_name == "") {
      //res.redirect("/");
      //res.sendFile(path.resolve("./client/html/homepage.html"));
      res.send("No Product");
    }
    else {


      //全商品種類表
      var cate_search = sql_cate_select.SelectAllCategory();
      cate_search.then(data => {
        result.allcategory = data;

        //商品種類細項
        var product_cate = sql_cate_select.SelectCateByProduct_id(product_id);
        product_cate.then(data => {
          var detail = [];
          if (data.length != 0) {
            detail[detail.length] = data[0].category_id;
            while (result.allcategory.parent_category_id[detail[(detail.length) - 1]] > 0) {
              //console.log(result.allcategory.parent_category_id[detail[(detail.length)-1]-1]);      
              detail[detail.length] = result.allcategory.parent_category_id[detail[(detail.length) - 1] - 1];
            }
          }
          result.cate_detail = detail;

          //傳送資料給瀏覽器
          //console.log(result);
          res.send(result);
        })


        //res.send(result);
      })
    }

  });
  //res.send(product);
  /*
  //擷取商品資訊product
  var get_productinfo = sql_select.select_product_id(product_id);
  get_productinfo.then(data=>{
    res,send(data);
  })*/
})


router.post("/get8product", urlencodeParser, (req, res) => {

  var id;

  product_info = {
    product_id: "",
    product_name: "",
    product_img: "",
    product_desc: "",
    product_price: "",
  }

  productModel.get8products(req.body.offset).then(data => {
    id = data[0].product_id;
    product_info.product_id = data[0].product_id;
    product_info.product_name = data[0].product_name;
    console.log(product_info);
    res.status(200).send(product_info);
    res.end();
  })


  /*productModel.get8products(req.body.offset).then(data => {
    product_info.product_id = data[0].product_id;
    product_info.product_name = data[0].product_name;
    productModel.ProductImgQuery(data[0].product_id).then(img => {
      product_info.product_img = img[0].product_img;
      productModel.ProductDescriptionQuery(data[0].product_id).then(desc => {
        product_info.product_desc = desc[0].product_description;
        productModel.ProductPriceQuery(data[0].product_id).then(price => {
          product_info.product_price = price[0].product_price;
          console.log(product_info);
          res.status(200).send(product_info);
          res.end();
        })
      })
    })
  });*/
})


module.exports = router;