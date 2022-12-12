## TODO
- [ ] 註冊介面與功能
- [ ] 登入介面與功能
- [ ] 主頁面(顯示所有商品及分類列表)
- [ ] 指定商品詳細資料頁面
- [x] 客服聊天用戶端介面與功能 
- [ ] 客服聊天後台介面與功能
- [ ] 商品管理後台 (對商品的CRUD)
- [ ] 模擬物流 (視情況併入後台功能之一)
- [ ] 商品資料庫
- [ ] 使用者個人資訊資料庫
- [ ] 使用者之購物清單、購物紀錄等之資料庫
- [x] 使用者聊天紀錄資料庫
---

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