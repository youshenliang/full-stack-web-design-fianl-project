const express = require("express");
const router = express.Router();
const fs = require("fs");
const sql = require("mysql");
const path = require("path");
const orderQuery = require('../_Model/orderModel');

const bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });

const multer = require('multer');

var cnt = 0;  // 累加之計數器，加在儲存之圖片檔名後，避免time stamp碰撞問題，每次上傳完圖片後重製為0

// 設定multer檔案儲存位置和名稱
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './_View/main/images/product_img')
  },
  filename: (req, file, callback) => {
    //console.log("file: ", file);
    var savename = Date.now() + `_${cnt}` + path.extname(file.originalname);
    cnt++;
    callback(null, savename);  // 延遲100ms後再上傳，避免time stamp碰撞問題    
  }
})

// 將multer的設定存為變數，方便後續作為middleware調用，設定檔案大小限制5MB
var upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

const sql_select = require("../_Controller/SelectByProduct_id");

const sql_cate_select = require("../_Controller/SelectByCategory_id.js");

const sql_create = require("../_Controller/CreateNewProduct");

const sql_alter = require("../_Controller/AlterQuery.js");
const { setTimeout } = require("timers/promises");

router.use(express.static('Backstage'));

router.get("/", (req, res) => {
  if (req.signedCookies.userID != 1) {
    res.status(403).send("您沒有權限訪問這個網站");
    res.end();
  }
  else {
    res.sendFile(path.resolve(__dirname, '../_View/backstage/Backstage.html'));
  }
})

router.get("/initial", urlencodeParser, (req, res) => {
  console.log("傳送後台使用變數");
  var result = {
    product: "",
    allcategory: "",
    last_cate: "",
  }

  //商品資訊
  var search = sql_select.select_All_product();
  search.then((data) => {

    result.product = data;

    //全商品種類表
    var cate_search = sql_cate_select.SelectAllCategory();
    cate_search.then(data => {
      result.allcategory = data;

      //console.log(result);


      //商品種類細項
      var product_cate = sql_cate_select.SelectLastCate();
      product_cate.then(data => {

        result.last_cate = data;

        //傳送資料給瀏覽器
        //console.log(result);
        res.send(result);
      })

    })

  });
})

router.post("/consult", urlencodeParser, (req, res) => {
  console.log("關鍵字查詢");
  //console.log(req.body);

  page = req.body.nowpage;
  keywords = req.body.keywords;

  console.log("資料庫:   " + page);
  console.log("關鍵字:   " + keywords);

  if (page == "product") {
    var result = sql_select.consult(keywords);
    result.then(data => {
      data = JSON.parse(JSON.stringify(data));
      /*console.log("fin  "+data);
      console.log("length "+data.length);
      console.log(typeof(data));*/
      consult = data;

      var cate_array = [];
      for (var i = 0; i < consult.length; i++) {
        //根據product_id的數量代入迴圈查詢分類號碼
        cate_array[i] = sql_cate_select.SelectCateByProduct_id(consult[i].product_id);
      }
      const resultPromiseAll = Promise.all(cate_array);
      resultPromiseAll.then(data => {
        console.log(data);
        //console.log(data[2][0].category_id)
        //console.log(JSON.parse(JSON.stringify(resultPromiseAll)))
        for (var i = 0; i < consult.length; i++) consult[i].lastcate = data[i][0].category_id;
        //console.log(consult)
        res.send(consult);
      })

    })
  }


})

router.post("/create_product", upload.array("imgs", 20), (req, res) => {

  new_product = req.body;

  new_spec_array = new_product.new_product_spec.split(",");
  new_stock_array = new_product.new_product_stock.split(",");
  delete new_product.new_product_spec;
  delete new_product.new_product_stock;
  new_product.new_product_spec = new_spec_array;
  new_product.new_product_stock = new_stock_array;

  new_product_img = [];

  for (var i = 0; i < req.files.length; i++) {
    var temp = req.files[i].path.split("\\");
    console.log(temp);
    new_product_img[i] = "http://localhost:3000/main/images/product_img/" + temp[temp.length - 1];
  }
  new_product.new_product_img = new_product_img;
  console.log("新商品資訊:  ");
  console.log(new_product);

  sql_create.Create_product(new_product);
  cnt = 0;
  res.end();

})

router.post("/create_cate", urlencodeParser, (req, res) => {
  console.log("接收新分類變數");
  console.log(req.body);

  new_cate_name = req.body.new_cate_name;
  new_cate_parent = req.body.new_cate_parent;
  sql_cate_select.CreateNewCate(new_cate_name,new_cate_parent);

  res.end();
})

router.put("/alter_product", upload.array("imgs", 20), (req, res) => {
  console.log("修改商品");
  console.log("即將修改的商品編號為:  " + req.body.product_id);
  //console.log(req.body);

  alter_data = req.body;

  if ("product_spec" in alter_data || "product_stock" in alter_data) {
    spec_array = alter_data.product_spec.split(",");
    stock_array = alter_data.product_stock.split(",");
    delete alter_data.product_spec;
    delete alter_data.product_stock;
    alter_data.product_spec = spec_array;
    alter_data.product_stock = stock_array;
  }
  product_img = [];
  if ("product_img" in alter_data) {
    for (var i = 0; i < req.files.length; i++) {
      var temp = req.files[i].path.split("\\");
      product_img[i] = "http://localhost:3000/main/images/product_img/" + temp[temp.length - 1];
    }
    alter_data.product_img = product_img;
  }

  console.log(alter_data)


  var alt = sql_alter.Alter_product(alter_data);
  alt.then(data => {
    console.log(data);
    cnt = 0;
    res.end();
  })

})

router.delete("/delete_product", urlencodeParser, (req, res) => {
  console.log("刪除商品");
  console.log("即將刪除的商品編號為:  " + req.body.delete_product_id);
  delete_product_id = req.body.delete_product_id;


  var del = sql_alter.Delete_product(delete_product_id);
  del.then(data => {
    console.log(data);
    res.end();
  })
})

router.post("/orderList", urlencodeParser, (req, res) => {
  orderQuery.orderlistQueryAll().then((data) => {
    res.status(200).send(data);
    res.end();
  })
})

module.exports = router;