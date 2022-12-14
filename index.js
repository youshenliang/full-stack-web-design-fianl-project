const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./_Routes/userRoutes');
const whishRoutes = require('./_Routes/wishlistRouter');
const cartRoutes = require('./_Routes/cartRoutes');
const orderRoutes = require('./_Routes/orderRoutes');
const ProductRouter = require("./_Routes/productpage");
const AdminRouter = require("./_Routes/BackstagePage");
const CategoryRouter = require("./_Routes/CategoryPage");
const SearchRouter = require("./_Routes/SearchPage");
const captchaRouter = require("./_Routes/captchaRouter");

const userSocketModel = require('./_Controller/userController');
const userSQLModel = require('./_Model/userSQLModel');

const app = express();
const PORT = 3000; 

// 設定cors
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));

// 設定cookie parser和cookie簽證
app.use(cookieParser('mickeyhouse'));

// 設定view engine, 才能在res.render後傳遞參數給前端
app.engine('htm', require('ejs').renderFile);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'htm');
app.set('view engine', 'html');

// 設定靜態檔案資料夾，這樣server回傳chatroom.htm這個檔案時才能連帶執行內部用相對路徑寫的.js檔
app.use(express.static('./_View'));
app.use(express.static('./_View/chatroom/client'));
app.use(express.static('./_View/chatroom/system'));
app.use(express.static('./_View/register_and_login'));
app.use(express.static('./_View/main'));
app.use(express.static('./_View/main/css'));
app.use(express.static('./_View/backstage'));

// 設定Routes
app.use('/', userRoutes);
app.use("/product",ProductRouter);
app.use("/admin",AdminRouter);
app.use("/category",CategoryRouter);
app.use("/search",SearchRouter);
app.use("/wishlist", whishRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/captcha", captchaRouter);

// 開啟server
const server = app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})

// 連接socket
const io = userSocketModel(server);