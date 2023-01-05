const express = require("express");
const router = express.Router();
const path = require("path");

const bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });

const sql_captcha = require("../_Controller/captchaQuery");

router.use(express.static("client"));


router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../_View/main/captcha.html"));
})

router.get("/generate", (req, res) => {

    //產生1~50數字
    var random_number = Math.floor(Math.random() * 50) + 1;
    console.log(random_number);
    //帶入數字讀取圖片地址
    var captcha = sql_captcha.select_captcha(random_number);
    captcha.then(data => {
        console.log("圖片地址")
        console.log(data);
        //id為圖片編號   url為地址
        var result =
        {
            url: data,
            id: random_number,
        }
        res.send(result);
    })
})

router.post("/answer", urlencodeParser, (req, res) => {
    console.log("使用者回傳 post")
    console.log(req.body);

    var answer = req.body.captcha
    var id = req.body.id

    //帶入使用者回傳的圖片編號搜尋該圖片地址
    var captcha = sql_captcha.select_captcha(id);
    captcha.then(data => {
        console.log("圖片地址")
        console.log(data);

        //把圖片的號碼從圖片地址中分離出來
        data = data.split("captcha_img/")[1].split(".")[0]
        console.log("正確號碼   :" + data + "使用者輸入號碼     :" + answer);

        //判斷驗證碼與使用者輸入的號碼是否相符
        if (answer == data) {
            res.status(200).send("輸入正確")
            res.end();
        }
        else {
            res.status(200).send("輸入錯誤");
            res.end();
        }
    })

})

module.exports = router;