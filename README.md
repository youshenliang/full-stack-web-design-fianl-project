## TODO
### 使用者帳號及資訊相關
- [x] 註冊介面
- [x] 註冊功能
- [x] 登入介面
- [x] 登入功能
- [ ] 更改個人資料(手機號碼、常用地址等)
- [ ] 使用者個人資訊資料庫
- [ ] 使用者之購物清單、購物紀錄等之資料庫

### 商品頁面及管理相關
- [ ] 主頁面(顯示所有商品及分類列表)
- [ ] 指定商品詳細資料頁面
- [ ] 商品資料庫
- [ ] 商品管理後台 (對商品的CRUD)
- [ ] 模擬物流 (視情況併入後台功能之一)

### 客服功能相關
- [x] 客服聊天用戶端介面與功能
- [ ] 客服聊天後台介面與功能
- [x] 使用者聊天紀錄資料庫

---

### Update 2022/12/13
完成註冊和登入介面，尚未實際串接DataBase

尚未建立 system 端聊天介面及功能

最近幾天比較忙，進度有點慢，需要趕快加工ㄌ

話說覺得自己UI做ㄉ挺好看 開心 :D

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
