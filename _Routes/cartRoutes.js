const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require('body-parser');

const cartQuery = require("../_Model/cartModel");

var urlencodeParser = bodyParser.urlencoded({ extended: false });

router.use(express.static("client"));
router.use(bodyParser.json());


router.get("/", (req, res) => {
    if (req.signedCookies.userID) res.status(200).sendFile(path.resolve(__dirname, "../_View/main/cart.html"));
    else res.status(301).redirect("http://localhost:3000/login");
})

router.post("/", (req, res) => {

    // 把所有的promise存成[[Promise, Promise], [Promise, Promise], [Promise, Promise]]的格式
    // 不這樣做而是用for下去直接跑Query的話會有時間差導致資料漏掉的問題
    var cartPromises = [];
    cartQuery.cartlistQuery(req.signedCookies.userID).then((data) => {
        for (var i = 0; i < data.length; i++) {
            var cur_product_id = data[i]["product_id"];
            var specAmountQuery = cartQuery.productSpecAmountQuery(cur_product_id);
            var nameQuery = cartQuery.productNameQuery(cur_product_id);
            var imageQuery = cartQuery.productImageQuery(cur_product_id);
            var specStockQuery = cartQuery.productSpecStockQuery(cur_product_id);
            var priceQuery = cartQuery.productPriceQuery(cur_product_id);
            cartPromises.push([specAmountQuery, nameQuery, imageQuery, specStockQuery, priceQuery]);
        }

        const promise4all = Promise.all(
            cartPromises.map((innerPromiseArray) => {
                return Promise.all(innerPromiseArray);
            })
        )

        promise4all.then(cartList => {
            console.log(JSON.stringify(cartList));
            res.send(cartList);
        })
    })
})

router.post("/remove", urlencodeParser, (req, res) => {
    cartQuery.deleteCartByCartID(req.body.cart_id).then(() => {
        res.status(200).send("刪除成功");
        res.end();
    })
})

router.post("/editAmount", urlencodeParser, (req, res) => {
    cartQuery.editAmountQuery(req.body.cart_id, req.body.new_amount).then(() => {
        res.status(200).send(`cart_id: ${req.body.cart_id} 之數量修改成功`);
        res.end();
    })
})

router.get("/checkout", (req, res) => {
    // 如果未登入則跳轉至登入頁面
    if(!req.signedCookies.userID) res.status(301).redirect("http://localhost:3000/login");
    if(!req.signedCookies.checkout) res.status(403).send("您沒有權限訪問此頁面");
    else {
        //res.clearCookie("checkout", { signed: true });
        res.sendFile(path.resolve(__dirname, "../_View/main/checkout.html"));
    }
})

router.post("/checkout", urlencodeParser, (req, res) => {
    var cartList = JSON.parse(req.body.cartList);
    console.log(cartList);
    res.cookie("checkout", cartList, { signed: true });
    res.status(200).send("checkout");
    res.end();
})

router.post("/add", urlencodeParser, (req, res) => {
    var userID = req.signedCookies.userID;
    var cart = req.body;
    var product_id = cart["cart[product_id]"];
    var spec = cart["cart[purchase_spec]"];
    var amount = cart["cart[purchasebtn]"];

    cartQuery.appendCartRecord(userID, product_id, spec, amount).then(() => {
        res.status(200).send("新增成功");
        res.end();
    })
})

module.exports = router;