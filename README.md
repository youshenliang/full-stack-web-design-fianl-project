### Update 2022/12/08
server端user介面的MVC已經分離

尚未建立 system 端聊天介面及功能

|檔案名稱|功能|
|:-:|:-:|
|server/Model/userSQLModel.js|處理 client 端 MySQL 之操作|
|server/Controller/userController.js|處理 client 端 socket 之事件及操作|

### Update 2022/12/07

目前 client 端聊天功能正常，之後需加上對圖片、影片等媒體的處理

尚未建立 system 端聊天介面及功能

之後需嘗試將 MVC 架構分離