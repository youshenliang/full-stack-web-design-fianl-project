const express = require("express");
const router = express.Router();
const sql = require("mysql");
const path = require("path");



const sql_wish = require("../_Model/wishModel");

router.use(express.static("client"));


router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../_View/main/wishlist.html"));
})

router.get("/makewish", (req, res) => {
    console.log(req.query)

    var wish_link = req.query.wish_link;
    var wish_name = req.query.wish_name;
    var wish_price = req.query.wish_price;
    var userID = req.query.userID;

    console.log(req.query);

    var wish = sql_wish.add_wish(wish_link, wish_name, wish_price, userID);
    wish.then(data => {
        console.log("新增願望清單成功")
        res.end();

    }).catch(err => {
        console.log("新增願望清單時發生錯誤");
        console.log(err)
    })

})



module.exports = router;