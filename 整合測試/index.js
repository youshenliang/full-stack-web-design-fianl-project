const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./_Routes/userRoutes');
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

// 設定靜態檔案資料夾，這樣server回傳chatroom.htm這個檔案時才能連帶執行內部用相對路徑寫的.js檔
app.use(express.static('./chatroom/client'));
app.use(express.static('./chatroom/system'));
app.use(express.static('./chatroom/server/View'));
app.use(express.static('./register_and_login/View'));

// 設定Routes
app.use('/', userRoutes);

// 開啟server
const server = app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})

// 連接socket
const io = userSocketModel(server);