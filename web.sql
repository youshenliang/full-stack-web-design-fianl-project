-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: web
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `captcha`
--

DROP TABLE IF EXISTS `captcha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `captcha` (
  `captcha_id` int NOT NULL AUTO_INCREMENT,
  `captchaPath` varchar(100) NOT NULL,
  PRIMARY KEY (`captcha_id`,`captchaPath`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `captcha`
--

LOCK TABLES `captcha` WRITE;
/*!40000 ALTER TABLE `captcha` DISABLE KEYS */;
INSERT INTO `captcha` VALUES (1,'http://localhost:3000/main/images/captcha_img/TNAN.png'),(2,'http://localhost:3000/main/images/captcha_img/KV4U.png'),(3,'http://localhost:3000/main/images/captcha_img/D4U4.png'),(4,'http://localhost:3000/main/images/captcha_img/TYN5.png'),(5,'http://localhost:3000/main/images/captcha_img/VHR4.png'),(6,'http://localhost:3000/main/images/captcha_img/KXS8.png'),(7,'http://localhost:3000/main/images/captcha_img/DAP5.png'),(8,'http://localhost:3000/main/images/captcha_img/9U3B.png'),(9,'http://localhost:3000/main/images/captcha_img/V6SJ.png'),(10,'http://localhost:3000/main/images/captcha_img/5CXM.png'),(11,'http://localhost:3000/main/images/captcha_img/PJUH.png'),(12,'http://localhost:3000/main/images/captcha_img/MCDS.png'),(13,'http://localhost:3000/main/images/captcha_img/R6K5.png'),(14,'http://localhost:3000/main/images/captcha_img/EUHM.png'),(15,'http://localhost:3000/main/images/captcha_img/6KN3.png'),(16,'http://localhost:3000/main/images/captcha_img/SCEY.png'),(17,'http://localhost:3000/main/images/captcha_img/PXNT.png'),(18,'http://localhost:3000/main/images/captcha_img/PB6K.png'),(19,'http://localhost:3000/main/images/captcha_img/N85Y.png'),(20,'http://localhost:3000/main/images/captcha_img/EDXR.png'),(21,'http://localhost:3000/main/images/captcha_img/3R5D.png'),(22,'http://localhost:3000/main/images/captcha_img/8483.png'),(23,'http://localhost:3000/main/images/captcha_img/AX53.png'),(24,'http://localhost:3000/main/images/captcha_img/NSSX.png'),(25,'http://localhost:3000/main/images/captcha_img/NEWE.png'),(26,'http://localhost:3000/main/images/captcha_img/TUD4.png'),(27,'http://localhost:3000/main/images/captcha_img/JJ3Y.png'),(28,'http://localhost:3000/main/images/captcha_img/9MU3.png'),(29,'http://localhost:3000/main/images/captcha_img/CEXR.png'),(30,'http://localhost:3000/main/images/captcha_img/38TT.png'),(31,'http://localhost:3000/main/images/captcha_img/PYAD.png'),(32,'http://localhost:3000/main/images/captcha_img/4CTV.png'),(33,'http://localhost:3000/main/images/captcha_img/P9KA.png'),(34,'http://localhost:3000/main/images/captcha_img/D36S.png'),(35,'http://localhost:3000/main/images/captcha_img/K3KR.png'),(36,'http://localhost:3000/main/images/captcha_img/XKV9.png'),(37,'http://localhost:3000/main/images/captcha_img/UTSU.png'),(38,'http://localhost:3000/main/images/captcha_img/YJUK.png'),(39,'http://localhost:3000/main/images/captcha_img/KN3P.png'),(40,'http://localhost:3000/main/images/captcha_img/YU64.png'),(41,'http://localhost:3000/main/images/captcha_img/UH8D.png'),(42,'http://localhost:3000/main/images/captcha_img/PDA6.png'),(43,'http://localhost:3000/main/images/captcha_img/3D94.png'),(44,'http://localhost:3000/main/images/captcha_img/ER6B.png'),(45,'http://localhost:3000/main/images/captcha_img/6CNA.png'),(46,'http://localhost:3000/main/images/captcha_img/PXY6.png'),(47,'http://localhost:3000/main/images/captcha_img/36U9.png'),(48,'http://localhost:3000/main/images/captcha_img/WPMP.png'),(49,'http://localhost:3000/main/images/captcha_img/EHRK.png'),(50,'http://localhost:3000/main/images/captcha_img/UDBJ.png');
/*!40000 ALTER TABLE `captcha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `product_id` int NOT NULL,
  `spec` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int NOT NULL,
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (26,2,2,'極致白',1),(27,2,7,'長',2);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_record_0`
--

DROP TABLE IF EXISTS `chat_record_0`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_record_0` (
  `messageID` int NOT NULL AUTO_INCREMENT,
  `message` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sender` int NOT NULL,
  `receiver` int NOT NULL,
  `messageDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`messageID`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_record_0`
--

LOCK TABLES `chat_record_0` WRITE;
/*!40000 ALTER TABLE `chat_record_0` DISABLE KEYS */;
INSERT INTO `chat_record_0` VALUES (1,'哈囉 我是peter',2,1,'2022-12-30 23:07:48'),(2,'你好阿peter',1,2,'2022-12-30 23:08:23'),(3,'Hi',2,1,'2023-01-01 20:55:36'),(4,'你好',2,1,'2023-01-01 20:57:48'),(5,'123',2,1,'2023-01-01 21:00:04'),(6,'777',2,1,'2023-01-01 21:01:04'),(7,'1453',2,1,'2023-01-01 21:01:44'),(8,'123',2,1,'2023-01-01 21:02:41'),(9,'123',2,1,'2023-01-01 21:04:22'),(10,'47',2,1,'2023-01-01 21:05:24'),(11,'23',2,1,'2023-01-01 21:05:58'),(12,'',2,1,'2023-01-01 21:05:58'),(13,'123',2,1,'2023-01-01 21:06:37'),(14,'',2,1,'2023-01-01 21:06:51'),(15,'123',2,1,'2023-01-01 21:07:23'),(16,'77',2,1,'2023-01-01 21:07:43'),(17,'123',2,1,'2023-01-01 21:08:35'),(18,'123',2,1,'2023-01-01 21:09:43'),(19,'132',2,1,'2023-01-01 21:10:23'),(20,'1',2,1,'2023-01-01 21:10:41'),(21,'1',2,1,'2023-01-01 21:11:32'),(22,'77',2,1,'2023-01-01 21:12:04'),(23,'77',2,1,'2023-01-01 21:12:10'),(24,'123',2,1,'2023-01-01 21:14:14'),(25,'Hi',1,2,'2023-01-01 21:14:32'),(26,'Hi',2,1,'2023-01-01 21:16:29'),(27,'123',2,1,'2023-01-01 21:17:36'),(28,'123',2,1,'2023-01-01 21:19:36'),(29,'789',2,1,'2023-01-01 21:21:09'),(30,'123',2,1,'2023-01-01 21:24:37'),(31,'1',2,1,'2023-01-01 21:28:27'),(32,'123',2,1,'2023-01-01 21:34:56'),(33,'111',2,1,'2023-01-01 21:39:41'),(34,'go',2,1,'2023-01-01 22:01:16'),(35,'13',2,1,'2023-01-01 22:01:57'),(36,'hiya',2,1,'2023-01-01 22:04:05'),(37,'你好欸?',1,2,'2023-01-01 22:04:20'),(38,'123',1,2,'2023-01-01 22:04:24'),(39,'789',2,1,'2023-01-01 22:04:26'),(40,'測試',2,1,'2023-01-01 22:04:31'),(41,'963',2,1,'2023-01-01 22:04:35'),(42,'7451',1,2,'2023-01-01 22:04:40'),(43,'789',2,1,'2023-01-01 22:06:12'),(44,'12',2,1,'2023-01-01 22:06:30'),(45,'13',2,1,'2023-01-01 22:07:05'),(46,'',2,1,'2023-01-01 22:09:13'),(47,'123',2,1,'2023-01-01 22:09:24'),(48,'123',2,1,'2023-01-01 22:10:27'),(49,'1',2,1,'2023-01-01 22:11:03');
/*!40000 ALTER TABLE `chat_record_0` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_record_1`
--

DROP TABLE IF EXISTS `chat_record_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_record_1` (
  `messageID` int NOT NULL AUTO_INCREMENT,
  `message` varchar(300) NOT NULL,
  `sender` int NOT NULL,
  `receiver` int NOT NULL,
  `messageDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`messageID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_record_1`
--

LOCK TABLES `chat_record_1` WRITE;
/*!40000 ALTER TABLE `chat_record_1` DISABLE KEYS */;
INSERT INTO `chat_record_1` VALUES (1,'嗨嗨 我是justin喇',3,1,'2022-12-30 23:08:13'),(2,'嗨呀 justin',1,3,'2022-12-30 23:09:40');
/*!40000 ALTER TABLE `chat_record_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_record_2`
--

DROP TABLE IF EXISTS `chat_record_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_record_2` (
  `messageID` int NOT NULL AUTO_INCREMENT,
  `message` varchar(300) NOT NULL,
  `sender` int NOT NULL,
  `receiver` int NOT NULL,
  `messageDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`messageID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_record_2`
--

LOCK TABLES `chat_record_2` WRITE;
/*!40000 ALTER TABLE `chat_record_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_record_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_record_3`
--

DROP TABLE IF EXISTS `chat_record_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_record_3` (
  `messageID` int NOT NULL AUTO_INCREMENT,
  `message` varchar(300) NOT NULL,
  `sender` int NOT NULL,
  `receiver` int NOT NULL,
  `messageDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`messageID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_record_3`
--

LOCK TABLES `chat_record_3` WRITE;
/*!40000 ALTER TABLE `chat_record_3` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_record_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_record_4`
--

DROP TABLE IF EXISTS `chat_record_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_record_4` (
  `messageID` int NOT NULL AUTO_INCREMENT,
  `message` varchar(300) NOT NULL,
  `sender` int NOT NULL,
  `receiver` int NOT NULL,
  `messageDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`messageID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_record_4`
--

LOCK TABLES `chat_record_4` WRITE;
/*!40000 ALTER TABLE `chat_record_4` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_record_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_record`
--

DROP TABLE IF EXISTS `order_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_record` (
  `key` int NOT NULL AUTO_INCREMENT,
  `orderID` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userID` int NOT NULL,
  `product_id` int NOT NULL,
  `product_img` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `spec` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_price` int NOT NULL,
  `amount` int NOT NULL,
  `receiver_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiver_phone` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiver_email` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiver_address` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_record`
--

LOCK TABLES `order_record` WRITE;
/*!40000 ALTER TABLE `order_record` DISABLE KEYS */;
INSERT INTO `order_record` VALUES (1,'1672896553400',2,4,'http://localhost:3000/main/images/product_img/1672824866152_0.png','黃色衣服','黃色ㄉ',1280,2,'','','',''),(2,'1672896938720',2,4,'http://localhost:3000/main/images/product_img/1672824866152_0.png','黃色衣服','黃色ㄉ',1280,1,'陳永祥','0964-174358','aa123@gmail.com','台北市大安區建國南路一段81號'),(3,'1672897301307',2,7,'http://localhost:3000/main/images/product_img/1672825184162_0.jpg','好看皮夾','長',8888,4,'黃邵琪','0961-784219','aa74@gm.com','我家'),(4,'1672897301307',2,23,'http://localhost:3000/main/images/product_img/1672731197008.jpg','鴨鴨','鴨鴨',699,3,'黃邵琪','0961-784219','aa74@gm.com','我家'),(5,'1672911029222',3,3,'http://localhost:3000/main/images/product_img/1672825159440_0.jpg','快跑鞋2','紅色的',1996,1,'李志成','0911-123456','justin0813@gmail.com','justinㄉ家'),(6,'1672911029222',3,22,'http://localhost:3000/main/images/product_img/1672727108007.jpg','7','7',7,3,'李志成','0911-123456','justin0813@gmail.com','justinㄉ家');
/*!40000 ALTER TABLE `order_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `product_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (2,34),(3,34),(4,6),(5,6),(6,30),(7,30),(8,30),(9,30),(10,30),(11,16),(12,16),(13,5),(14,9),(15,5),(16,1),(17,1),(18,13),(19,1),(20,2),(21,3),(22,7),(23,27),(24,1);
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_categoryname`
--

DROP TABLE IF EXISTS `product_categoryname`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_categoryname` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) DEFAULT NULL,
  `parent_category_id` int DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categoryname`
--

LOCK TABLES `product_categoryname` WRITE;
/*!40000 ALTER TABLE `product_categoryname` DISABLE KEYS */;
INSERT INTO `product_categoryname` VALUES (1,'服飾類',0),(2,'上衣',1),(3,'褲/裙',1),(4,'外套',1),(5,'包/鞋',1),(6,'短袖T恤',2),(7,'五分/落肩',2),(8,'連帽短T',2),(9,'背心',2),(10,'短袖襯衫',2),(11,'長袖襯衫',2),(12,'POLO衫',2),(13,'大學T',2),(14,'連帽長T',2),(15,'毛衣',2),(16,'休閒縮口',3),(17,'休閒短褲',3),(18,'工裝褲',3),(19,'運動短褲',3),(20,'七分褲',3),(21,'牛仔褲',3),(22,'休閒長褲',3),(23,'運動長褲',3),(24,'西裝褲',3),(25,'休閒棉質外套',4),(26,'牛仔外套',4),(27,'羽絨服',4),(28,'長版大衣',4),(29,'西裝外套',4),(30,'皮夾',5),(31,'後背包',5),(32,'側背包',5),(33,'休閒鞋',5),(34,'運動鞋',5),(35,'帆布協',5),(36,'涼鞋/拖鞋',5),(37,'皮鞋',5),(38,'化妝品類',0),(39,'粉底',38);
/*!40000 ALTER TABLE `product_categoryname` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `product_id` int NOT NULL,
  `product_img` varchar(100) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (2,'http://localhost:3000/main/images/product_img/1672746861566.png',1),(6,'http://localhost:3000/product_img//1672290475246.jpg',6),(8,'http://localhost:3000/product_img//1672290479992.jpg',8),(9,'http://localhost:3000/product_img//1672290483079.jpg',9),(10,'http://localhost:3000/product_img//1672290485377.jpg',10),(11,'new_img_array',11),(12,'new_img_array',12),(13,'new_img_array',13),(14,'new_img_array',14),(15,'http://localhost:3000/main/images/product_img/1672748257482.jpg',15),(15,'http://localhost:3000/main/images/product_img/1672748257483.jpg',16),(16,'http://localhost:3000/product_img//1672300279069.jpg',17),(17,'http://localhost:3000/product_img//1672300321796.jpg',18),(18,'http://localhost:3000/main//images',19),(19,'http://localhost:3000/main//images',20),(20,'http://localhost:3000/main/images/product_imgproduct_img//images',21),(21,'http://localhost:3000/main/images/product_imgproduct_img/1672727013901.jpg',22),(22,'http://localhost:3000/main/images/product_img/1672727108007.jpg',23),(23,'http://localhost:3000/main/images/product_img/1672731197008.jpg',24),(24,'http://localhost:3000/main/images/product_img/1672746861566.png',25),(4,'http://localhost:3000/main/images/product_img/1672824866152_0.png',30),(5,'http://localhost:3000/main/images/product_img/1672746861566.png',31),(3,'http://localhost:3000/main/images/product_img/1672825159440_0.jpg',36),(3,'http://localhost:3000/main/images/product_img/1672825159441_1.jpg',37),(3,'http://localhost:3000/main/images/product_img/1672825159441_2.jpg',38),(7,'http://localhost:3000/main/images/product_img/1672825184162_0.jpg',39);
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_information`
--

DROP TABLE IF EXISTS `product_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_information` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_description` varchar(100) DEFAULT NULL,
  `product_detail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_information`
--

LOCK TABLES `product_information` WRITE;
/*!40000 ALTER TABLE `product_information` DISABLE KEYS */;
INSERT INTO `product_information` VALUES (2,'專門拿來慢跑的鞋子','除了可以慢跑還可以快跑'),(3,'專門拿來慢跑的鞋子','除了可以慢跑還可以快跑'),(4,'黃色的衣服123','還是黃色的衣服'),(5,'還是黑色的上衣','還是還是黑色的衣服'),(6,'很好看','這是皮夾'),(7,'很好看','這是皮夾'),(8,'很好看','這是皮夾'),(9,'很好看','這是皮夾'),(10,'很好看','這是皮夾'),(11,'縮口褲','黑色的縮口褲'),(12,'縮口褲','黑色的縮口褲'),(13,'帆布鞋','不防水的帆布鞋'),(14,'很厚的背心','很厚實的白色背心'),(15,'測試摘要2','測試細節4'),(16,'123','123'),(17,'789','312'),(18,'666','555'),(19,'2','1'),(20,'2','2'),(21,'3','3'),(22,'7','7'),(23,'就是鴨鴨','就是鴨鴨你聽不懂喔'),(24,'456','789');
/*!40000 ALTER TABLE `product_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_list`
--

DROP TABLE IF EXISTS `product_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_list` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_list`
--

LOCK TABLES `product_list` WRITE;
/*!40000 ALTER TABLE `product_list` DISABLE KEYS */;
INSERT INTO `product_list` VALUES (2,'快跑鞋'),(3,'快跑鞋2'),(4,'黃色衣服'),(5,'黑色的上衣'),(6,'好看皮夾'),(7,'好看皮夾'),(8,'好看皮夾2'),(9,'好看皮夾'),(10,'好看皮夾'),(11,'黑色縮口褲'),(12,'黑色縮口褲'),(13,'帆布鞋'),(14,'白色背心'),(15,'測試名稱2'),(16,'123'),(17,'123'),(18,'123'),(19,'1'),(20,'2'),(21,'3'),(22,'7'),(23,'鴨鴨'),(24,'123');
/*!40000 ALTER TABLE `product_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_price`
--

DROP TABLE IF EXISTS `product_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_price` (
  `product_id` int NOT NULL,
  `product_price` int unsigned DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_price`
--

LOCK TABLES `product_price` WRITE;
/*!40000 ALTER TABLE `product_price` DISABLE KEYS */;
INSERT INTO `product_price` VALUES (2,2560),(3,1996),(4,1280),(5,200),(6,8888),(7,8888),(8,8888),(9,8888),(10,8888),(11,799),(12,799),(13,1000),(14,999),(15,1234),(16,123),(17,899),(18,899),(19,12),(20,2),(21,3),(22,7),(23,699),(24,147);
/*!40000 ALTER TABLE `product_price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_specifications`
--

DROP TABLE IF EXISTS `product_specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_specifications` (
  `product_id` int NOT NULL,
  `product_spec` varchar(10) NOT NULL,
  `product_stock` int unsigned DEFAULT NULL,
  PRIMARY KEY (`product_id`,`product_spec`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_specifications`
--

LOCK TABLES `product_specifications` WRITE;
/*!40000 ALTER TABLE `product_specifications` DISABLE KEYS */;
INSERT INTO `product_specifications` VALUES (2,'極致白',20),(3,'紅色的',14),(3,'綠色的',8),(4,'綠色的',3),(4,'黃色ㄉ',2),(5,'黑色的',20),(6,'長',16),(7,'長',12),(8,'長',16),(9,'長',16),(10,'長',16),(11,'黑色',6),(12,'黑色',6),(13,'褐色',12),(14,'白色嘿色',21),(15,'測試規格1',123),(15,'測試規格2',456),(16,'123',115),(17,'123',318),(18,'鴨鴨',135),(19,'1',1),(20,'2',2),(21,'3',3),(22,'7',4),(23,'鴨鴨',63),(24,'123',123);
/*!40000 ALTER TABLE `product_specifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userPWD` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userEmail` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userPhoneNumber` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userGender` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userBirthday` date NOT NULL,
  `userAddress` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'System','XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=','system@mickey.com','0968-431806','其他','2001-03-14',NULL),(2,'Peter','MpK+9Cl1wKtjoumrchQ9biZY29boGijLnPdhj/kGyXg=','peter0826@gmail.com','0918-964723','男性','2003-07-11',NULL),(3,'Justin0813','MpK+9Cl1wKtjoumrchQ9biZY29boGijLnPdhj/kGyXg=','justin0813@gmail.com','0974-854713','男性','2000-08-13',NULL),(4,'123','fgcf2bAj7Y8YRYpzYToINPYiC9XMUDV7o0k8YECp6ow=','123@gmail.com','0987-654321','女性','2022-12-31',NULL),(5,'pp','FeKw08M4keuw8e9gnsQZQgwg4yDOlMZfvIwzEkSOsiU=','t108360147@ntut.org.tw','0911-123456','男性','2023-01-05',NULL);
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_list`
--

DROP TABLE IF EXISTS `user_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_list` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_list`
--

LOCK TABLES `user_list` WRITE;
/*!40000 ALTER TABLE `user_list` DISABLE KEYS */;
INSERT INTO `user_list` VALUES (1,'System'),(2,'Peter');
/*!40000 ALTER TABLE `user_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wish_list`
--

DROP TABLE IF EXISTS `wish_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wish_list` (
  `wish_id` int NOT NULL AUTO_INCREMENT,
  `wish_link` varchar(300) NOT NULL,
  `wish_name` varchar(100) NOT NULL,
  `wish_price` int NOT NULL,
  `userID` varchar(45) NOT NULL,
  PRIMARY KEY (`wish_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wish_list`
--

LOCK TABLES `wish_list` WRITE;
/*!40000 ALTER TABLE `wish_list` DISABLE KEYS */;
INSERT INTO `wish_list` VALUES (1,'123','456',457,'1'),(2,'https://photo.518.com.tw/selfmedia/articles/1695/165406761366449.jpeg','漢堡',35,'1'),(3,'https://photo.518.com.tw/selfmedia/articles/1695/165406761366449.jpeg','漢堡2',25,'1'),(4,'https://photo.518.com.tw/selfmedia/articles/1695/165406761366449.jpeg','漢堡',25,'1');
/*!40000 ALTER TABLE `wish_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-05 18:17:11
