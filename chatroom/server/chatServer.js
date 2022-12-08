const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const app = express();

const userSocketModel = require('./Controller/userController');
const userSQLModel = require('./Model/userSQLModel');

const PORT = 3000;

// 設定cors
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));

// 設定靜態檔案資料夾，這樣server回傳chatroom.htm這個檔案時才能連帶執行內部用相對路徑寫的.js檔
app.use(express.static('../client'));

// 設定Routes
app.use('/', userRoutes);

// 開啟server
const server = app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})

// 連接socket
const io = userSocketModel(server);