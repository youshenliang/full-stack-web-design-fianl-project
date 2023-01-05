const express = require("express");
const router = express.Router();
const sql = require("mysql");
const path = require("path");

const bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });

const sql_cate_select = require("../_Controller/SelectByCategory_id.js");

const sql_select = require("../_Controller/SelectByProduct_id");

router.get("/", (req, res) => {
    console.log("HI");
    res.sendFile(path.resolve(__dirname, "../_View/main/shop.html"));
})

router.post("/", urlencodeParser, (req, res) => {
    console.log("關鍵字查詢");

    console.log(req.body);

    keywords = decodeURIComponent(req.body.search_name);

    console.log("關鍵字:   " + keywords);
    console.log("關鍵字編碼後:   " + decodeURIComponent(keywords));

    result = {};

    var search = sql_select.consult(keywords);
    search.then(data => {
        data = JSON.parse(JSON.stringify(data));
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

            result.consult = consult;

            //全商品種類表
            var cate_search = sql_cate_select.SelectAllCategory();
            cate_search.then(data => {
                result.allcategory = data;
                res.send(result);
            })

        })
    })
})


module.exports = router;