const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require('body-parser');

const productQuery = require("../_Controller/productQuery");
const orderQuery = require("../_Model/orderModel");
const cartQuery = require("../_Model/cartModel");

var urlencodeParser = bodyParser.urlencoded({ extended: false });

router.use(express.static("client"));
router.use(bodyParser.json());

router.post("/purchase", urlencodeParser, (req, res) => {
    var purchaseList = JSON.parse(req.body.purchaseList);
    var receiver = JSON.parse(req.body.receiver);
    var userID = req.signedCookies.userID;
    var orderID = Date.now();  // 根據 timestamp 生成訂單編號
    console.log(receiver.name);
    console.log(purchaseList);
    for (i in purchaseList) {
        orderQuery.appendOrder(orderID, userID, purchaseList[i].product_id, purchaseList[i].product_img, purchaseList[i].product_name, purchaseList[i].spec, purchaseList[i].product_price, purchaseList[i].amount, receiver.name, receiver.phone, receiver.email, receiver.address);
        productQuery.ProductAmountEdit(purchaseList[i].product_id, purchaseList[i].spec, purchaseList[i].stock - purchaseList[i].amount);
    }

    cartQuery.deleteCartByuserID(userID);
    
    res.status(200).send("下單成功");
    res.end();
})

module.exports = router;