-- --------------------------------------------------------
-- Máy chủ:                      localhost
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Phiên bản:           12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for datn
CREATE DATABASE IF NOT EXISTS `datn` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `datn`;

-- Dumping structure for table datn.address
CREATE TABLE IF NOT EXISTS `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `ward` varchar(255) DEFAULT NULL,
  `province_id` varchar(255) DEFAULT NULL,
  `ward_code` varchar(255) DEFAULT NULL,
  `district_id` varchar(255) DEFAULT NULL,
  `default_address` int DEFAULT '0',
  `user_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.address: ~10 rows (approximately)
INSERT INTO `address` (`id`, `address`, `province`, `district`, `ward`, `province_id`, `ward_code`, `district_id`, `default_address`, `user_id`, `name`, `phone`) VALUES
	(1, '123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '201', '907557', '3440', 0, 3, 'Trang cụt cụt', '0923708222'),
	(2, 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '234', '280130', '1616', 1, 3, 'Cụt', '0397827373'),
	(6, 'số 2222222', 'Điện Biên', 'Huyện Mường Ảng', 'Xã Ngối Cáy', '265', '620909', '2170', 0, 3, 'Ta Quynh Trang', '0705925361'),
	(7, 'số 2A', 'Cà Mau', 'Huyện Trần Văn Thời', 'Xã Phong Điền', '252', '610411', '2038', 0, 3, 'nghia', '0393883934'),
	(8, 'số 11', 'Hải Phòng', 'Huyện đảo Cát Hải', 'Xã Việt Hải', '224', '31311', '2108', 0, 3, 'Nguyen Duc Thien', '0971222898'),
	(9, 'số 1212', 'Lào Cai', 'Thị xã Sa Pa', 'Xã Thanh Kim', '269', '80516', '2005', 0, 3, 'nonn', '0393883934'),
	(10, '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '228', '90106', '1601', 1, 2, 'Trần Minh Nghĩa', '0943387702'),
	(11, '2 / 2344', 'Hà Nội', 'Quận Bắc Từ Liêm', 'Phường Cổ Nhuế 2', '201', '11002', '1482', 0, 2, 'Trần Minh Nghĩa', '0943387702'),
	(12, 'Số 23 tổ 10', 'Hòa Bình', 'Huyện Yên Thủy', 'Xã Đa Phúc', '267', '231003', '2270', 0, 2, 'Trần Minh Nghĩa', '0943387702'),
	(18, '1 tổ 162', 'Lào Cai', 'Huyện Xi Ma Cai', 'Xã Sín Chéng', '269', '80212', '2264', 0, 2, 'Trần Minh Nghĩa', '0943387702');

-- Dumping structure for table datn.brands
CREATE TABLE IF NOT EXISTS `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.brands: ~12 rows (approximately)
INSERT INTO `brands` (`id`, `name`, `status`) VALUES
	(1, 'Adidas', 'AVAILABLE'),
	(2, 'Vans', 'AVAILABLE'),
	(3, 'Converse', 'AVAILABLE'),
	(4, 'Versace', 'AVAILABLE'),
	(8, 'Nike', 'AVAILABLE'),
	(9, 'N3T - 1', 'AVAILABLE'),
	(10, 'Sandal', 'AVAILABLE'),
	(11, 'N3T - 2', 'AVAILABLE'),
	(12, 'Dior', 'AVAILABLE'),
	(15, 'Juno', 'AVAILABLE'),
	(16, 'Biti’s Hunter', 'AVAILABLE'),
	(17, 'MWC NATT', 'AVAILABLE');

-- Dumping structure for table datn.brand_category
CREATE TABLE IF NOT EXISTS `brand_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.brand_category: ~13 rows (approximately)
INSERT INTO `brand_category` (`id`, `brand_id`, `category_id`) VALUES
	(4, 2, 3),
	(5, 2, 5),
	(6, 2, 6),
	(7, 3, 3),
	(8, 3, 4),
	(9, 3, 5),
	(10, 4, 3),
	(11, 4, 6),
	(12, 4, 5),
	(16, 1, 3),
	(18, 1, 5),
	(19, 1, 6),
	(20, 4, 4);

-- Dumping structure for table datn.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `create_by` int DEFAULT NULL,
  `update_by` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.categories: ~6 rows (approximately)
INSERT INTO `categories` (`id`, `name`, `status`, `create_by`, `update_by`) VALUES
	(3, 'Sneaker', 'AVAILABLE', 1, NULL),
	(4, 'Cao gót', 'AVAILABLE', 1, NULL),
	(5, 'Sandal', 'AVAILABLE', 1, NULL),
	(6, 'Guốc', 'AVAILABLE', 1, NULL),
	(7, 'Giày bệt', 'AVAILABLE', NULL, 1),
	(8, 'Dép xỏ ngón', 'AVAILABLE', NULL, 1);

-- Dumping structure for table datn.colors
CREATE TABLE IF NOT EXISTS `colors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.colors: ~11 rows (approximately)
INSERT INTO `colors` (`id`, `name`) VALUES
	(1, 'Kem'),
	(2, 'Đen'),
	(3, 'Hồng'),
	(4, 'Cam'),
	(5, 'Tím'),
	(6, 'Xanh nhạt'),
	(7, 'Đỏ'),
	(8, 'Trắng hồng'),
	(9, 'Vàng nhạt'),
	(10, 'Xanh hồng'),
	(15, 'Ghi');

-- Dumping structure for table datn.feedbacks
CREATE TABLE IF NOT EXISTS `feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `feedback` varchar(255) NOT NULL,
  `stars` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.feedbacks: ~0 rows (approximately)

-- Dumping structure for table datn.height
CREATE TABLE IF NOT EXISTS `height` (
  `id` int NOT NULL AUTO_INCREMENT,
  `height` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.height: ~10 rows (approximately)
INSERT INTO `height` (`id`, `height`) VALUES
	(1, 'Bệt'),
	(3, '2'),
	(4, '3'),
	(5, '4'),
	(6, '5'),
	(7, '6'),
	(8, '7'),
	(9, '8'),
	(10, '9'),
	(15, '10');

-- Dumping structure for table datn.images
CREATE TABLE IF NOT EXISTS `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.images: ~67 rows (approximately)
INSERT INTO `images` (`id`, `path`, `product_id`) VALUES
	(2, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 25),
	(3, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 25),
	(4, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 25),
	(5, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 25),
	(6, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 25),
	(49, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 34),
	(50, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 34),
	(51, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 35),
	(52, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 35),
	(53, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 36),
	(54, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 36),
	(55, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 36),
	(86, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 37),
	(87, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 38),
	(92, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 14),
	(93, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 14),
	(95, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 33),
	(96, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 33),
	(97, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 33),
	(98, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 33),
	(99, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 39),
	(100, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F75.43825562995643Balence1.jpg?alt=media&token=aef4ffb4-d988-495e-8b84-537f083422b7', 40),
	(101, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F48.07929834864317Balence2.jpg?alt=media&token=5092c294-eeb4-481d-a204-461e79fdc100', 40),
	(105, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F18.777802534235356mwc%20den.jpg?alt=media&token=51a9f18c-fc86-468f-91b2-786d5ddce559', 1),
	(106, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F11.753214087456998mwc%20trang.jpg?alt=media&token=28439dc3-638f-4bc5-a62c-c4971e152680', 1),
	(107, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F84.04714432537446mwc%20tang.jpg?alt=media&token=d1a7e516-7562-4d4b-8dd9-9555986ca699', 1),
	(108, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F6.2901000260737082.jpg?alt=media&token=b21825f4-a201-463e-9c86-8c8e31b16e00', 2),
	(109, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F71.51883666244043.jpg?alt=media&token=1e875861-3402-4b0c-8073-a2aef17b9d57', 2),
	(110, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F43.08412245048355.jpg?alt=media&token=6cec6ed5-7581-4570-b872-bf3d126c0d6c', 3),
	(111, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F12.8286071774702756.jpg?alt=media&token=ec863e26-2a84-4c19-8c97-3a20ca5c35fc', 3),
	(112, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F52.45911854356647.jpg?alt=media&token=23bf7e85-bbae-4513-8cd0-d4f9264f77cd', 3),
	(113, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F43.08412245048355.jpg?alt=media&token=6cec6ed5-7581-4570-b872-bf3d126c0d6c', 3),
	(114, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F12.8286071774702756.jpg?alt=media&token=ec863e26-2a84-4c19-8c97-3a20ca5c35fc', 3),
	(115, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F52.45911854356647.jpg?alt=media&token=23bf7e85-bbae-4513-8cd0-d4f9264f77cd', 3),
	(116, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F70.7573961656534610.jpg?alt=media&token=409eed9e-6075-4af3-8ade-2de411622c0d', 4),
	(117, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F55.9229635014240311.jpg?alt=media&token=f5a619e4-e888-42a9-b3d6-aef56bb8eb13', 4),
	(118, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F75.0044580362860112.jpg?alt=media&token=97236b35-fdc0-4a8b-8534-5e1bb24fb3eb', 4),
	(119, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F16.57964009772441513.jpg?alt=media&token=932cea8e-4400-40a8-b0be-eb545b5510a2', 4),
	(120, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F5.9007143478631915.jpg?alt=media&token=739d8fb8-0859-4cdf-8560-163fca0d0808', 5),
	(121, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F71.6748342310544516.jpg?alt=media&token=fd940ff4-afd0-40f3-bd22-9bf9179269cf', 5),
	(122, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F49.9675159556917117.jpg?alt=media&token=12b33c6b-36a7-4ca7-9116-f048525f6b1d', 5),
	(123, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F5.9007143478631915.jpg?alt=media&token=739d8fb8-0859-4cdf-8560-163fca0d0808', 5),
	(124, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F71.6748342310544516.jpg?alt=media&token=fd940ff4-afd0-40f3-bd22-9bf9179269cf', 5),
	(125, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F49.9675159556917117.jpg?alt=media&token=12b33c6b-36a7-4ca7-9116-f048525f6b1d', 5),
	(126, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F22.56902800639819519.jpg?alt=media&token=9008ccd0-d5f6-43d9-9a7f-ff58e37009cc', 6),
	(127, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F4.630609203139468620.jpg?alt=media&token=0405a1d2-059a-4361-be0c-5181a496be13', 6),
	(128, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F54.39897231644308622.jpg?alt=media&token=4f352121-ddb1-48c8-8aca-34c293cdfdcd', 7),
	(129, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F70.4818084036090123.jpg?alt=media&token=942a880d-e1be-47ff-9adf-c6133f239532', 7),
	(130, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F25.64115240463809224.jpg?alt=media&token=4e75e9b0-5654-4b23-8d5b-de16dedf5219', 7),
	(131, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F36.3732359914854126.jpg?alt=media&token=8764fb5b-b74b-4ce5-a86c-2334d8dcc4ae', 8),
	(132, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F22.19579110036347227.jpg?alt=media&token=43c361e5-6d6e-4dff-8bbb-9e3bb6a1197c', 8),
	(133, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F28.23468615547990629.jpg?alt=media&token=936b05bf-aaf9-464d-8425-5be837d0acc8', 9),
	(134, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F64.9669676302580730.jpg?alt=media&token=2bdad71a-3d57-4a2a-8cb0-719601d2accc', 9),
	(135, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F10.08178819926197531.jpg?alt=media&token=3545592e-624e-4ea7-833d-ae6462ebf0c1', 9),
	(136, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F7.7769528388236733.jpg?alt=media&token=283f1270-7ede-4c9e-8fae-4ccb7eacdc7c', 10),
	(137, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F83.02555524121434.jpg?alt=media&token=1606fa1e-0930-4a0a-892b-bd0fc2dd16bc', 10),
	(138, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F44.31237256871434536.jpg?alt=media&token=32adb717-220b-4f06-b411-da3252cc002b', 11),
	(139, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F78.7742741076269737.jpg?alt=media&token=e7da2894-45b0-4a04-bea3-89563d1e536c', 11),
	(140, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F86.1040047404620939.jpg?alt=media&token=6c47a7b3-a85c-4aca-b912-8017ac225960', 13),
	(141, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F15.76360893066761540.jpg?alt=media&token=04713b54-ba7e-40ba-be98-2048a8086124', 13),
	(142, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F34.81547422467849642.jpg?alt=media&token=f223e753-33d6-47f8-91cc-d6ab68f6cde4', 15),
	(143, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F63.4564473080423244.jpg?alt=media&token=58284454-2db1-421f-9459-f1bb43d828ef', 24),
	(144, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F39.3255126619117545.jpg?alt=media&token=28211290-12f4-4936-9593-2a3d873813a0', 24),
	(145, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F63.4564473080423244.jpg?alt=media&token=58284454-2db1-421f-9459-f1bb43d828ef', 24),
	(146, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F39.3255126619117545.jpg?alt=media&token=28211290-12f4-4936-9593-2a3d873813a0', 24),
	(147, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F90.373171264120744.jpg?alt=media&token=5be461c3-d89e-4870-b3b5-a55aa04be6e7', 42),
	(148, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F11.34277723387739.jpg?alt=media&token=19df4ea5-3b32-4ef2-9d04-1139aa5e0bcb', 42);

-- Dumping structure for table datn.materials
CREATE TABLE IF NOT EXISTS `materials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.materials: ~7 rows (approximately)
INSERT INTO `materials` (`id`, `name`) VALUES
	(1, 'Da tổng hợp'),
	(2, 'Vải nhân tạo'),
	(3, 'Da nhân tạo'),
	(4, 'Da thật'),
	(5, 'Vải Canvas'),
	(6, 'Vải tổng hợp'),
	(11, 'Polime');

-- Dumping structure for table datn.notifications
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.notifications: ~0 rows (approximately)

-- Dumping structure for table datn.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `code_ghn` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL,
  `update_date` datetime DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `ward` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `order_type` varchar(255) NOT NULL,
  `payment_type` varchar(255) NOT NULL,
  `voucher_id` int DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `create_by` int DEFAULT NULL,
  `update_by` int DEFAULT NULL,
  `is_pay` int DEFAULT '0',
  `total_ship` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `code` (`code`),
  KEY `code_ghn` (`code_ghn`),
  KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=238 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.orders: ~160 rows (approximately)
INSERT INTO `orders` (`id`, `code`, `code_ghn`, `customer_name`, `created_date`, `update_date`, `phone`, `address`, `province`, `district`, `ward`, `description`, `order_type`, `payment_type`, `voucher_id`, `status`, `create_by`, `update_by`, `is_pay`, `total_ship`) VALUES
	(1, 'abc', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'Số 1 ', 'Hà nội', 'Từ Liêm', 'Mỹ Đình', NULL, 'ONLINE', 'OFFLINE', NULL, 'DELIVERED', 1, NULL, 0, 30000),
	(2, 'aaa', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'Số 2', 'Hà Nội', 'Từ Liêm', 'Mỹ Đình', NULL, 'OFFLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0, 30000),
	(41, '1234567', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'số 1', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Phúc Xá', NULL, 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0, 30000),
	(42, '12345678', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'số 1', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Phúc Xá', NULL, 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0, 30000),
	(43, '1235434', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'Số 1', 'Thành phố Hà Nội', 'Quận Long Biên', 'Phường Giang Biên', NULL, 'ONLINE', 'ONLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 1, NULL, 0, 30000),
	(44, '105865', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'Số 1', 'Thành phố Hà Nội', 'Quận Tây Hồ', 'Phường Xuân La', NULL, 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', 1, NULL, 0, 30000),
	(46, '100000001', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'Số 2', 'Thành phố Hà Nội', 'Quận Hai Bà Trưng', 'Phường Bạch Đằng', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CANCELLED', 1, NULL, 0, 30000),
	(48, '13369231', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'Số 1', 'Tỉnh Điện Biên', 'Huyện Điện Biên', 'Xã Sam Mứn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0, 30000),
	(49, '13791216', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'Số 3', 'Thành phố Hà Nội', 'Quận Hoàn Kiếm', 'Phường Đồng Xuân', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', 1, NULL, 0, 30000),
	(50, '12251366', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'Số 2', 'Tỉnh Hà Giang', 'Huyện Yên Minh', 'Xã Phú Lũng', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0, 30000),
	(51, '10964079', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'Số 3', 'Tỉnh Cao Bằng', 'Huyện Bảo Lâm', 'Xã Lý Bôn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0, 30000),
	(54, '11865681', '', 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'Số 123', 'Hà Nội', 'Quận Cầu Giấy', 'Phường Dịch Vọng Hậu', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0, 30000),
	(55, '16837828', 'LLGBET', 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961930630', 'Số 12', 'Hà Nội', 'Quận Đống Đa', 'Phường Hàng Bột', '', 'ONLINE', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 1, NULL, 0, 30000),
	(56, '18546794', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'Số 12', 'Hà Nội', 'Quận Tây Hồ', 'Phường Yên Phụ', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', 1, NULL, 0, 30000),
	(57, '14411613', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'Số 1234', 'Hà Nội', 'Quận Bắc Từ Liêm', 'Phường Xuân Đỉnh', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0, 30000),
	(58, '16922928', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'Số 123', 'Hà Nội', 'Quận Hai Bà Trưng', 'Phường Bạch Mai', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0, 30000),
	(59, '16681783', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'Số 123', 'Hà Nội', 'Quận Hoàn Kiếm', 'Phường Tràng Tiền', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0, 30000),
	(60, '19374338', 'LLGBEW', 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0961932630', 'Số 123', 'Hà Nội', 'Quận Thanh Xuân', 'Phường Thanh Xuân Nam', '', 'ONLINE', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 1, NULL, 0, 30000),
	(61, '17610674', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '0598578484', '6655', 'Hưng Yên', 'Huyện Phù Cừ', 'Xã Tống Phan', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', 1, 1, 0, 30000),
	(62, '19302808', NULL, 'Trần Minh Nghĩa', '2023-01-01 08:05:35', '2023-01-01 08:05:35', '09765443333', 'ffr', 'Điện Biên', 'Huyện Tuần Giáo', 'Xã Quài Tở', '', 'ONLINE', 'ONLINE', NULL, 'CONFIRMED', 1, NULL, 0, 30000),
	(63, '12676417', NULL, 'Trần Minh Nghĩa', '2023-01-05 08:05:35', '2023-01-05 08:05:35', '097666666666', 'rrrrtr', 'Hòa Bình', 'Huyện Lạc Sơn', 'Xã Xuất Hóa', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0, 30000),
	(64, '12563911', NULL, 'Trần Minh Nghĩa', '2023-01-05 08:05:35', '2023-01-05 08:05:35', '0598578484', 'hhttttt', 'Lào Cai', 'Huyện Mường Khương', 'Xã Thanh Bình', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', 1, 1, 0, 30000),
	(65, '10538605', NULL, 'Trần Minh Nghĩa', '2023-01-05 08:05:35', '2023-01-05 08:05:35', '04939333887', 'so1', 'Phú Thọ', 'Huyện Thanh Ba', 'Xã Quảng Yên', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, 1, 0, 30000),
	(69, '16469505', NULL, 'Trần Minh Nghĩa', '2023-01-05 08:05:35', '2023-01-05 08:05:35', '0961932630', 'số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', NULL, NULL, 0, 30000),
	(70, '18166507', NULL, 'Trần Minh Nghĩa', '2023-01-05 08:05:35', '2023-01-05 08:05:35', '0961932630', 'Số 1', 'Hà Nội', 'Quận Tây Hồ', 'Phường Tứ Liên', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, 1, 0, 30000),
	(73, '18600119', 'LLGHWR', 'Trần Minh Nghĩa', '2023-01-05 08:05:35', '2023-01-05 08:05:35', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, 1, 0, 30000),
	(74, '11809232', NULL, 'Trần Minh Nghĩa', '2023-02-14 08:05:35', '2023-05-10 13:46:32', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', NULL, NULL, 0, 30000),
	(75, '14098326', NULL, 'Trần Minh Nghĩa', '2023-01-20 08:05:35', '2023-05-10 19:58:55', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', NULL, NULL, 0, 30000),
	(77, '11710250', NULL, 'Trần Minh Nghĩa', '2023-01-20 08:05:35', '2023-05-10 16:29:33', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', NULL, NULL, 0, 30000),
	(79, '11311402', NULL, 'Trần Minh Nghĩa', '2023-01-20 08:05:35', '2023-02-14 08:05:35', '0961932630', 'số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0, 30000),
	(80, '14113035', NULL, 'Trần Minh Nghĩa', '2023-01-20 08:05:35', '2023-02-14 08:05:35', '0961932630', 'số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0, 30000),
	(81, '11859170', NULL, 'Trần Minh Nghĩa', '2023-01-20 08:05:35', '2023-02-14 08:05:35', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0, 30000),
	(82, '11226978', NULL, 'Trần Minh Nghĩa', '2023-01-20 08:05:35', '2023-02-14 08:05:35', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Xuân Phương', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0, 30000),
	(83, '11566030', NULL, 'Trần Minh Nghĩa', '2023-01-20 08:05:35', '2023-02-14 08:05:35', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0, 30000),
	(84, '16451862', NULL, 'Trần Minh Nghĩa', '2023-01-20 08:05:35', '2023-05-10 13:45:53', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', 'Huyr', 'ONLINE_WEB', 'OFFLINE', NULL, 'UNCONFIRM', NULL, NULL, 0, 30000),
	(86, '13471154', NULL, 'Trần Minh Nghĩa', '2023-01-20 08:05:35', '2023-02-14 08:05:35', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0, 30000),
	(87, '15187611', NULL, 'Trần Minh Nghĩa', '2023-01-20 08:05:35', '2023-02-14 08:05:35', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'UNCONFIRM', NULL, NULL, 0, 30000),
	(88, '15396251', NULL, 'Trần Minh Nghĩa', '2023-01-20 08:05:35', '2023-02-14 08:05:35', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', NULL, NULL, 0, 30000),
	(89, '14678583', 'LLUL3U', 'Trần Minh Nghĩa', '2023-02-14 08:05:35', '2023-02-14 08:05:35', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, NULL, 0, 30000),
	(90, '14250674', NULL, 'Trần Minh Nghĩa', '2023-02-14 08:05:35', '2023-02-14 08:05:35', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', NULL, NULL, 0, 30000),
	(91, '12940658', NULL, 'Trần Minh Nghĩa', '2023-02-14 08:05:35', '2023-02-14 08:05:35', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', NULL, NULL, 0, 30000),
	(93, '17557900', 'LLUGDH', 'Trần Minh Nghĩa', '2023-02-14 08:05:35', '2023-02-14 08:05:35', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, 0, 30000),
	(94, '16936840', NULL, 'Trần Minh Nghĩa', '2023-02-14 08:05:35', '2023-02-14 08:05:35', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE', 'OFFLINE', NULL, 'DELIVERING', 1, NULL, 0, 30000),
	(95, '18734039', NULL, 'Trần Minh Nghĩa', '2023-02-14 08:05:35', '2023-02-14 08:05:35', '0961932630', '', '', '', '', '', 'OFFLINE', 'OFFLINE', NULL, 'DELIVERED', 1, NULL, 0, 30000),
	(96, '19809544', NULL, 'Trần Minh Nghĩa', '2023-02-14 08:05:35', '2023-02-14 08:05:35', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, NULL, 0, 30000),
	(99, '12884057', 'LLW8RQ', 'Trần Minh Nghĩa', '2023-02-14 08:05:35', '2023-02-14 08:05:35', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 1, NULL, 0, 30000),
	(100, '12041744', NULL, 'Trần Minh Nghĩa', '2023-02-20 08:05:35', '2023-02-20 08:05:35', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, NULL, 0, 30000),
	(101, '19843497', NULL, 'Trần Minh Nghĩa', '2023-02-18 08:05:35', '2023-02-18 08:05:35', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'OFFLINE', 'OFFLINE', NULL, 'DELIVERED', 1, NULL, 0, 30000),
	(102, '14346130', NULL, 'Trần Minh Nghĩa', '2023-02-18 08:05:35', '2023-02-18 08:05:35', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, NULL, 0, 30000),
	(113, '16440333', 'LLU49Q', 'Trần Minh Nghĩa', '2023-02-18 08:05:35', '2023-02-18 08:05:35', '0961932630', 'Số 1 Lê Quang Đạo', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'VNPAY', NULL, 'NO_DELIVERY', 3, NULL, 1, 30000),
	(114, '10720868', 'LLUBXE', 'Trần Minh Nghĩa', '2023-02-18 08:05:35', '2023-02-18 08:05:35', '0961932630', 'Số 1 Lê Quang Đạo', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Tây Mỗ', '', 'ONLINE_WEB', 'VNPAY', NULL, 'DELIVERING', 3, NULL, 1, 30000),
	(115, '12607427', NULL, 'Trần Minh Nghĩa', '2023-02-18 08:05:35', '2023-02-18 08:05:35', '0961932630', 'Số 1 Lê Quang Đạo', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, NULL, 1, 30000),
	(116, '12921360', 'LLU3VD', 'Trần Minh Nghĩa', '2023-03-26 18:25:58', '2023-03-26 18:25:58', '0961932638', 'Số 123', 'Hà Nội', 'Huyện Phú Xuyên', 'Xã Nam Tiến', '', 'ONLINE', 'OFFLINE', NULL, 'DELIVERED', 1, NULL, 1, 30000),
	(117, '19339931', NULL, 'Trần Minh Nghĩa', '2023-03-26 18:25:58', '2023-03-26 18:25:58', '0962987225', 'Số 1 Lê Quang Đạo', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '', 'ONLINE_WEB', 'VNPAY', NULL, 'DELIVERED', 3, NULL, 1, 30000),
	(118, '10639449', NULL, 'Trần Minh Nghĩa', '2023-03-26 18:25:58', '2023-03-26 18:25:58', '0962987225', 'số 123', 'Hồ Chí Minh', 'Thành Phố Thủ Đức', 'Phường An Khánh', '', 'ONLINE_WEB', 'VNPAY', NULL, 'DELIVERED', 3, NULL, 1, 30000),
	(119, '15555665', NULL, 'Trần Minh Nghĩa', '2023-03-26 18:25:58', '2023-03-26 18:25:58', '0962987225', 'số 123', 'Hồ Chí Minh', 'Thành Phố Thủ Đức', 'Phường An Khánh', '', 'ONLINE_WEB', 'VNPAY', NULL, 'DELIVERED', 3, NULL, 1, 30000),
	(120, '16140412', NULL, 'Trần Minh Nghĩa', '2023-03-26 18:25:58', '2023-03-26 18:25:58', '0961932999', 'Số 123', 'Hà Nội', 'Huyện Ứng Hòa', 'Xã Viên Nội', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', NULL, NULL, NULL, 30000),
	(121, '19610356', 'LLPW6T', 'Trần Minh Nghĩa', '2023-03-26 18:25:58', '2023-03-26 18:25:58', '0961962333', 'Số 1', 'Hà Nội', 'Quận Cầu Giấy', 'Phường Yên Hoà', '', 'ONLINE', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 1, NULL, NULL, 30000),
	(122, '16764759', NULL, 'Tạ Quỳnh Trang', '2023-03-26 18:25:58', '2023-05-10 13:44:00', '0962987225', 'số 123', 'Hòa Bình', 'Huyện Mai Châu', 'Xã Tân Thành', 'hủy', 'ONLINE_WEB', 'OFFLINE', NULL, 'UNCONFIRM', NULL, NULL, NULL, 30000),
	(123, '15926165', 'LLNVP3', 'Trần Minh Nghĩa', '2023-03-26 18:29:49', '2023-03-26 18:38:21', '0393883934', 'Số 4A', 'Hà Nội', 'Quận Cầu Giấy', 'Phường Trung Hoà', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', NULL, NULL, NULL, 30000),
	(124, '15874245', 'LLNVP4', 'Tạ Quỳnh Trang', '2023-03-26 18:47:36', '2023-03-26 19:57:19', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', NULL, NULL, NULL, 30000),
	(125, '16354520', NULL, 'Tạ Quỳnh Trang', '2023-04-04 09:28:06', '2023-05-09 14:13:04', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 1, 'CONFIRMED', 3, NULL, NULL, 30000),
	(126, '17379082', 'LLDA4F', 'Tạ Quỳnh Trang', '2023-04-04 10:42:04', '2023-04-17 21:22:08', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 1, 'DELIVERING', 3, NULL, NULL, 30000),
	(127, '17705187', NULL, 'Tạ Quỳnh Trang', '2023-04-06 10:06:55', '2023-05-09 14:10:17', '0962987225', 'số 123456', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'VNPAY', 1, 'CONFIRMED', 3, NULL, 1, 30000),
	(128, '17491753', NULL, 'Tạ Quỳnh Trang', '2023-04-06 10:13:03', '2023-04-08 16:11:03', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'VNPAY', 1, 'DELIVERING', 3, NULL, 1, 30000),
	(129, '17490814', NULL, 'Tạ Quỳnh Trang', '2023-04-06 15:53:54', '2023-04-06 16:02:33', '', '', '', '', '', 'nnnnn', 'ONLINE_WEB', 'OFFLINE', NULL, 'UNCONFIRM', NULL, NULL, NULL, 30000),
	(130, '10029604', NULL, 'Tạ Quỳnh Trang', '2023-04-06 21:25:44', '2023-04-06 21:40:21', '', '', '', '', '', 'k nhận', 'ONLINE_WEB', 'OFFLINE', NULL, 'UNCONFIRM', NULL, NULL, NULL, 30000),
	(131, '17462530', NULL, 'Tạ Quỳnh Trang', '2023-04-06 21:48:19', '2023-04-06 21:48:49', '0000000000', '', '', '', '', '', 'ONLINE', 'ONLINE', NULL, 'CANCELLED', 1, NULL, NULL, 30000),
	(132, '16842341', NULL, 'Tạ Quỳnh Trang', '2023-04-06 22:05:53', '2023-04-15 10:17:43', '92830239029', '1231', 'Hà Nội', 'Huyện Ứng Hòa', 'Xã Viên An', '', 'ONLINE', 'OFFLINE', NULL, 'DELIVERING', 1, NULL, NULL, 30000),
	(133, '15809428', NULL, 'Tạ Quỳnh Trang', '2023-04-08 09:54:31', NULL, '0928333999', '', '', '', '', '', 'OFFLINE', 'OFFLINE', NULL, 'DELIVERED', 1, NULL, 1, 30000),
	(134, '11879875', NULL, 'Tạ Quỳnh Trang', '2023-04-08 09:59:00', '2023-04-17 21:26:23', '0929333111', '2112', 'Sơn La', 'Huyện Vân Hồ', 'Xã Tân Xuân', '', 'ONLINE', 'OFFLINE', NULL, 'NO_DELIVERY', 1, NULL, NULL, 30000),
	(135, '13194175', NULL, 'Tạ Quỳnh Trang', '2023-04-10 09:28:00', '2023-04-10 09:55:38', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, NULL, 1, 30000),
	(136, '13506393', NULL, 'Tạ Quỳnh Trang', '2023-04-10 09:38:05', NULL, '0912388222', '123', 'Sơn La', 'Huyện Yên Châu', 'Xã Tú Nang', '', 'ONLINE', 'ONLINE', NULL, 'CONFIRMED', 1, NULL, NULL, 30000),
	(137, '17392147', 'LLWYVF', 'Tạ Quỳnh Trang', '2023-04-10 14:54:37', '2023-05-12 17:16:15', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'VNPAY', 1, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, 1, 30000),
	(138, '13181327', NULL, 'Lê Văn Luyện', '2023-04-10 15:03:22', '2023-04-10 15:03:22', '0982333124', '', '', '', '', '', 'OFFLINE', 'OFFLINE', NULL, 'DELIVERED', 1, NULL, 1, 30000),
	(139, '17194979', 'LLTCM4', 'Tạ Quỳnh Trang', '2023-04-10 15:04:13', '2023-05-11 21:53:06', '0922483712', '123', 'Hưng Yên', 'Huyện Phù Cừ', 'Xã Tống Phan', '', 'ONLINE', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 1, NULL, NULL, 30000),
	(140, '11420643', 'LLTCM3', 'Tạ Quỳnh Trang', '2023-04-10 15:04:28', '2023-05-11 21:50:55', '0922483712', '123', 'Hưng Yên', 'Huyện Phù Cừ', 'Xã Tống Phan', '', 'ONLINE', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 1, NULL, NULL, 30000),
	(141, '14483518', 'LLTCMB', 'Tạ Quỳnh Trang', '2023-04-10 15:05:35', '2023-05-11 21:49:08', '0921483211', '122', 'Hưng Yên', 'Huyện Tiên Lữ', 'Xã Thủ Sỹ', '', 'ONLINE', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 1, NULL, NULL, 30000),
	(142, '10561665', 'LLTCMD', 'Tạ Quỳnh Trang', '2023-04-10 22:12:39', '2023-05-11 21:47:01', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 2, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(143, '16448154', 'LLTCM6', 'Tạ Quỳnh Trang', '2023-04-11 12:32:30', '2023-05-11 21:43:40', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 1, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(145, '16532825', 'LLTCMV', 'Tạ Quỳnh Trang', '2023-04-11 17:56:04', '2023-05-11 21:39:59', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'VNPAY', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, 1, 30000),
	(146, '13196626', 'LLWYX4', 'Tạ Quỳnh Trang', '2023-04-11 23:37:27', '2023-04-15 11:00:41', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, NULL, NULL, 30000),
	(147, '12754327', 'LLTCM9', 'Tạ Quỳnh Trang', '2023-04-12 09:00:43', '2023-05-11 21:38:11', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'VNPAY', 2, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, 1, 30000),
	(148, '12352373', NULL, 'Tạ Quỳnh Trang', '2023-04-12 09:04:50', '2023-05-10 13:43:33', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', 'Hủy', 'ONLINE_WEB', 'VNPAY', NULL, 'UNCONFIRM', 3, NULL, 1, 30000),
	(149, '10279520', 'LLTCMC', 'Tạ Quỳnh Trang', '2023-04-12 09:08:29', '2023-05-11 21:37:14', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'VNPAY', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, 1, 30000),
	(150, '14507811', NULL, 'Tạ Quỳnh Trang', '2023-04-12 09:13:30', '2023-04-12 09:13:30', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'VNPAY', NULL, 'CONFIRMED', 3, NULL, 1, 30000),
	(151, '11019537', 'LLWMYV', 'Tạ Quỳnh Trang', '2023-04-17 21:23:26', '2023-04-17 21:25:37', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 2, 'DELIVERED', 3, NULL, NULL, 30000),
	(152, '10324459', 'LLWMYP', 'Tạ Quỳnh Trang', '2023-04-17 21:41:15', '2023-04-17 21:56:38', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 1, 'DELIVERED', 3, NULL, NULL, 30000),
	(153, '18739348', 'LLTCMQ', 'Tạ Quỳnh Trang', '2023-04-17 22:17:39', '2023-05-11 21:29:51', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(154, '19143117', NULL, 'Tạ Quỳnh Trang', '2023-04-17 23:37:36', '2023-05-09 14:03:39', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', 3, NULL, NULL, 30000),
	(155, '10080636', NULL, 'Tạ Quỳnh Trang', '2023-04-17 23:56:15', '2023-04-18 15:44:59', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 2, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 42000),
	(156, '13450394', 'LLTCMF', 'Tạ Quỳnh Trang', '2023-04-20 21:05:52', '2023-05-11 21:31:33', '0962987225', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(159, '17795096', 'LLTCRM', 'Trần Minh Nghĩa', '2023-04-23 21:29:36', '2023-05-11 21:28:07', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'VNPAY', 1, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 2, NULL, 1, 67001),
	(160, '16931849', 'LLTU9T', 'Trần Minh Nghĩa', '2023-04-23 21:31:16', '2023-05-08 14:04:14', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'VNPAY', NULL, 'CONFIRMED', 2, NULL, 1, 67001),
	(162, '18508105', 'LLTCRE', 'Trần Minh Nghĩa', '2023-04-23 21:41:03', '2023-05-11 21:29:02', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 1, 'CONFIRMED', 2, NULL, NULL, 67001),
	(163, '10064056', 'LLTCRR', 'Trần Minh Nghĩa', '2023-04-23 21:43:32', '2023-05-11 21:25:35', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 1, 'CONFIRMED', 2, NULL, NULL, 42000),
	(164, '12299876', 'LLTCRY', 'Trần Minh Nghĩa', '2023-04-23 21:47:04', '2023-05-11 21:23:33', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 1, 'CONFIRMED', 2, NULL, NULL, 30000),
	(165, '17211420', NULL, 'Trần Minh Nghĩa', '2023-04-23 21:56:28', '2023-04-23 21:56:28', '0943387702', '2 / 2344', 'Hà Nội', 'Quận Bắc Từ Liêm', 'Phường Cổ Nhuế 2', 'hết hàng', 'ONLINE_WEB', 'OFFLINE', 2, 'UNCONFIRM', 2, NULL, NULL, 22000),
	(166, '12085389', 'LLTQET', 'Trần Minh Nghĩa', '2023-04-23 21:57:03', '2023-05-12 17:15:15', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 2, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 2, NULL, NULL, 30000),
	(167, '10912149', 'LLTCR8', 'Trần Minh Nghĩa', '2023-04-24 08:37:20', '2023-05-11 21:21:16', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 1, 'CONFIRMED', NULL, NULL, NULL, 30000),
	(168, '17039758', NULL, 'Trần Minh Nghĩa', '2023-04-24 08:40:15', '2023-05-11 21:21:15', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 1, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', NULL, NULL, NULL, 30000),
	(170, '12014569', 'LLTCRX', 'Trần Minh Nghĩa', '2023-04-24 08:44:47', '2023-05-11 21:18:56', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 2, 'CONFIRMED', 2, NULL, NULL, 30000),
	(173, '13877661', 'LLTCRK', 'Trần Minh Nghĩa', '2023-04-24 17:12:00', '2023-05-11 21:15:15', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 2, 'CONFIRMED', NULL, NULL, NULL, 30000),
	(174, '12571916', 'LLTCRH', 'Trần Minh Nghĩa', '2023-04-24 17:12:48', '2023-05-11 21:18:15', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 1, 'CONFIRMED', 2, NULL, NULL, 30000),
	(175, '17299028', 'LLTCRW', 'Ta Quynh Trang', '2023-04-24 18:29:27', '2023-05-11 21:15:37', '0705925361', 'số 2222222', 'Điện Biên', 'Huyện Mường Ảng', 'Xã Ngối Cáy', '', 'ONLINE_WEB', 'OFFLINE', 2, 'CONFIRMED', NULL, NULL, NULL, 30000),
	(176, '19566125', 'LLTCR4', 'Tạ Quỳnh Trang', '2023-04-24 18:37:28', '2023-05-11 21:14:21', '0923708222', '123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '', 'ONLINE_WEB', 'OFFLINE', 2, 'CONFIRMED', 3, NULL, NULL, 22000),
	(177, '12415508', NULL, 'Trần Minh Nghĩa', '2023-04-24 20:37:07', '2023-05-11 21:14:20', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 2, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 2, NULL, NULL, 30000),
	(178, '15202728', 'LLTCR3', 'Tạ Quỳnh Trang', '2023-04-24 20:39:58', '2023-05-11 21:13:34', '0923708222', '123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '', 'ONLINE_WEB', 'OFFLINE', 4, 'CONFIRMED', 3, NULL, NULL, 22000),
	(179, '12501207', NULL, 'Trần Minh Nghĩa', '2023-04-24 21:00:31', '2023-05-11 21:13:32', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 3, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 2, NULL, NULL, 42000),
	(180, '12073728', NULL, 'Trần Minh Nghĩa', '2023-04-24 21:02:33', '2023-05-11 21:07:39', '0943387702', '2 / 2344', 'Hà Nội', 'Quận Bắc Từ Liêm', 'Phường Cổ Nhuế 2', '', 'ONLINE_WEB', 'OFFLINE', 3, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 2, NULL, NULL, 24500),
	(181, '17171718', 'LLTCMH', 'Trần Minh Nghĩa', '2023-04-25 20:26:16', '2023-05-11 22:35:05', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 2, 'CONFIRMED', 2, NULL, NULL, 30000),
	(183, '17419839', 'LLTCR6', 'Trần Minh Nghĩa', '2023-04-25 20:32:06', '2023-05-11 21:07:22', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 2, NULL, NULL, 30000),
	(185, '16636642', NULL, 'Trần Minh Nghĩa', '2023-04-25 20:42:23', '2023-05-08 14:04:13', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 2, NULL, NULL, 30000),
	(186, '11793895', NULL, 'Trần Minh Nghĩa', '2023-04-25 21:28:03', '2023-05-08 14:03:19', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', NULL, NULL, NULL, 30000),
	(187, '12977931', NULL, 'Trần Minh Nghĩa', '2023-04-25 21:38:16', '2023-04-25 21:38:16', '0943387702', '1 tổ 162', 'Lào Cai', 'Huyện Xi Ma Cai', 'Xã Sín Chéng', '', 'ONLINE_WEB', 'OFFLINE', 2, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', NULL, NULL, NULL, 42000),
	(188, '16439647', 'LLTFVF', 'Trần Minh Nghĩa', '2023-04-25 21:40:23', '2023-04-25 21:40:23', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'VNPAY', 2, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 2, NULL, 1, 30000),
	(189, '11122618', 'LLTFV7', 'Trần Minh Nghĩa', '2023-04-25 21:54:57', '2023-04-25 21:54:57', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 2, NULL, NULL, 30000),
	(190, '19583705', 'LLTFVU', 'Trần Minh Nghĩa', '2023-04-25 21:58:04', '2023-04-25 21:58:04', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', 2, 'DELIVERED', 2, NULL, NULL, 30000),
	(196, '10394367', 'LLTU96', 'Trần Minh Nghĩa', '2023-04-25 23:14:00', '2023-05-08 13:52:49', '0943387702', '05 tổ 6', 'Tuyên Quang', 'Thành phố Tuyên Quang', 'Phường Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 2, NULL, NULL, 30000),
	(197, '16304810', NULL, 'Lê Văn Thủy', '2023-04-25 23:53:12', NULL, '0943828374', '', '', '', '', 'Khách thanh toán tiền mặt', 'OFFLINE', 'OFFLINE', NULL, 'DELIVERED', 1, NULL, 1, NULL),
	(198, '11340009', 'LLTUDK', 'Tạ Quỳnh Trang', '2023-04-25 23:56:28', '2023-05-08 23:03:09', '0948394534', '123 Mễ trì', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Lương Tài', '', 'ONLINE', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 1, NULL, NULL, NULL),
	(199, '17982834', 'LLTUCM', 'Nghĩa', '2023-04-25 23:57:51', '2023-05-08 13:36:44', '0943387702', '123 Mễ trì', 'Hưng Yên', 'Huyện Tiên Lữ', 'Xã Thiện Phiến', '', 'ONLINE', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 1, NULL, NULL, NULL),
	(200, '13134253', NULL, 'Trần Minh Nghĩa', '2023-04-26 00:06:35', '2023-05-08 13:30:01', '0393883934', '4a', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '', 'ONLINE', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 1, NULL, NULL, 0),
	(201, '12451193', NULL, 'Trần Minh Nghĩa', '2023-04-26 00:07:30', '2023-05-08 13:24:54', '0393883934', '4a', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '', 'ONLINE', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 1, NULL, NULL, 22000),
	(202, '13089066', NULL, 'Trần Minh Nghĩa', '2023-04-26 00:10:45', '2023-05-08 13:20:25', '0943387702', '1 tổ 162', 'Lào Cai', 'Huyện Xi Ma Cai', 'Xã Sín Chéng', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', NULL, NULL, NULL, 30000),
	(203, '10466481', 'LLTUVH', 'Trang cụt cụt', '2023-05-08 14:06:38', '2023-05-08 15:47:37', '0923708222', '123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '', 'ONLINE_WEB', 'OFFLINE', 4, 'DELIVERED', NULL, NULL, NULL, 22000),
	(204, '16380297', NULL, 'nghia', '2023-05-08 14:58:55', '2023-05-08 15:00:13', '0393883934', 'số 2A', 'Cà Mau', 'Huyện Trần Văn Thời', 'Xã Phong Điền', '', 'ONLINE_WEB', 'OFFLINE', 4, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(205, '16382304', NULL, 'Trang cụt cụt', '2023-05-08 15:04:42', '2023-05-08 15:06:03', '0923708222', 'số 224', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '', 'ONLINE_WEB', 'OFFLINE', 4, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 22000),
	(206, '13686465', 'LLTUVW', 'Cụt', '2023-05-08 15:07:01', '2023-05-08 15:07:28', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', 4, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(207, '12366708', NULL, 'Cụt', '2023-05-08 15:11:33', '2023-05-08 15:12:19', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', 4, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(208, '10970267', NULL, 'Cụt', '2023-05-08 15:16:08', '2023-05-08 15:16:57', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', 4, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(209, '14722228', 'LLTUVA', 'Cụt', '2023-05-08 15:19:32', '2023-05-08 15:43:31', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, NULL, NULL, 30000),
	(210, '19774106', 'LLTU6N', 'Cụt', '2023-05-08 15:48:51', '2023-05-08 15:50:15', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', 4, 'DELIVERED', 3, NULL, NULL, 30000),
	(211, '14168399', 'LLTCCV', 'Cụt', '2023-05-09 14:15:31', '2023-05-10 17:47:18', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 42000),
	(212, '11766083', NULL, 'Cụt', '2023-05-10 14:20:47', '2023-05-11 21:03:59', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', NULL, NULL, NULL, 30000),
	(213, '14200074', 'LLTCR9', 'Cụt', '2023-05-10 19:59:23', '2023-05-11 21:04:54', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', 4, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(214, '15741621', NULL, 'Cụt', '2023-05-10 20:00:21', '2023-05-11 21:03:01', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(215, '19847239', 'LLTCRU', 'Cụt', '2023-05-10 20:10:23', '2023-05-11 20:57:30', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(216, '14497497', 'LLTCR7', 'Cụt', '2023-05-10 20:10:27', '2023-05-11 20:54:34', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(217, '11879829', 'LLTCRQ', 'Cụt', '2023-05-10 20:17:08', '2023-05-11 20:49:18', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(218, '14459618', 'LLTCYE', 'Cụt', '2023-05-10 20:17:13', '2023-05-11 20:47:58', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(219, '19407536', NULL, 'Cụt', '2023-05-10 20:17:19', '2023-05-11 20:45:10', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', 4, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(220, '15757960', 'LLTCRG', 'Cụt', '2023-05-11 20:50:45', '2023-05-11 20:55:24', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', NULL, NULL, NULL, 30000),
	(221, '14989845', 'LLTCRF', 'Cụt', '2023-05-11 20:50:50', '2023-05-11 20:52:03', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', NULL, NULL, NULL, 30000),
	(222, '14058476', 'LLTCRL', 'Cụt', '2023-05-11 20:50:55', '2023-05-11 20:51:31', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', NULL, NULL, NULL, 30000),
	(223, '13883889', 'LLTCRC', 'Cụt', '2023-05-11 20:58:07', '2023-05-11 20:58:35', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(224, '15602788', NULL, 'Cụt', '2023-05-11 21:08:01', '2023-05-11 21:08:23', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(225, '10962238', NULL, 'Cụt', '2023-05-11 21:09:29', '2023-05-11 21:12:05', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(226, '12489799', NULL, 'Cụt', '2023-05-11 21:09:33', '2023-05-11 21:09:55', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(227, '14802456', 'LLTCMW', 'Cụt', '2023-05-11 21:57:57', '2023-05-11 21:58:22', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(228, '15807999', NULL, 'Cụt', '2023-05-11 22:04:05', '2023-05-11 22:04:29', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(229, '15343585', 'LLTCEQ', 'Cụt', '2023-05-11 22:07:47', '2023-05-11 22:24:34', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(230, '15400674', 'LLTCMA', 'Cụt', '2023-05-11 22:07:51', '2023-05-11 22:11:28', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(231, '12907386', 'LLTCMX', 'Cụt', '2023-05-11 22:07:55', '2023-05-11 22:10:32', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(232, '19823350', NULL, 'Cụt', '2023-05-11 22:08:00', '2023-05-11 22:08:23', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', 4, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(233, '10468821', 'LLTCM8', 'Cụt', '2023-05-11 22:14:49', '2023-05-11 22:15:10', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', 4, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(234, '13953995', 'LLTCMY', 'Cụt', '2023-05-11 22:17:35', '2023-05-11 22:17:49', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(235, '16462284', 'LLTCMR', 'Cụt', '2023-05-11 22:18:37', '2023-05-12 14:29:10', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, NULL, NULL, 30000),
	(236, '17812722', 'LLTCMM', 'Cụt', '2023-05-11 22:20:17', '2023-05-12 17:14:55', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, NULL, 30000),
	(237, '11861854', 'LLTCME', 'Cụt', '2023-05-11 22:22:33', '2023-05-12 00:00:28', '0397827373', 'Khu phố 3, thôn 3', 'Thanh Hoá', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, NULL, NULL, 30000);

-- Dumping structure for table datn.order_details
CREATE TABLE IF NOT EXISTS `order_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_detail_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `status` int DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=291 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.order_details: ~161 rows (approximately)
INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `product_detail_id`, `quantity`, `price`, `status`) VALUES
	(2, 1, 2, 3, 2, 839000, 1),
	(3, 44, 1, 1, 1, 682000, 1),
	(16, 41, 1, 1, 1, 682000, 1),
	(17, 42, 1, 1, 1, 682000, 1),
	(18, 43, 1, 1, 1, 682000, 1),
	(19, 43, 2, 3, 2, 839000, 1),
	(22, 46, 1, 8, 2, 682000, 1),
	(24, 48, 1, 2, 2, 682000, 1),
	(25, 49, 2, 3, 1, 839000, 1),
	(27, 50, 24, 38, 1, 100000, 1),
	(28, 50, 1, 1, 1, 682000, 1),
	(29, 51, 24, 37, 3, 100000, 1),
	(34, 54, 24, 38, 2, 100000, 1),
	(35, 54, 1, 1, 1, 682000, 1),
	(36, 55, 24, 38, 2, 100000, 1),
	(37, 56, 24, 38, 2, 100000, 1),
	(39, 58, 24, 38, 1, 100000, 1),
	(50, 1, 15, 11, 1, 1200000, 1),
	(51, 44, 2, 3, 1, 839000, 1),
	(52, 56, 1, 1, 1, 682000, 1),
	(54, 48, 15, 13, 1, 1200000, 1),
	(55, 41, 24, 38, 1, 100000, 1),
	(56, 59, 24, 38, 2, 100000, 1),
	(57, 59, 1, 1, 2, 682000, 1),
	(58, 60, 1, 1, 2, 682000, 1),
	(59, 42, 2, 3, 1, 839000, 1),
	(60, 43, 24, 38, 2, 100000, 1),
	(61, 1, 24, 38, 2, 100000, 1),
	(62, 60, 24, 38, 2, 100000, 1),
	(63, 61, 1, 2, 1, 682000, 1),
	(64, 62, 1, 1, 1, 682000, 1),
	(65, 63, 1, 1, 1, 682000, 1),
	(66, 64, 1, 1, 1, 682000, 1),
	(67, 65, 1, 2, 2, 682000, 1),
	(69, 65, 3, 5, 2, 50000, 1),
	(70, 69, 1, 8, 2, 682000, 1),
	(73, 70, 1, 1, 2, 682000, 1),
	(83, 70, 15, 11, 1, 1200000, 1),
	(85, 69, 15, 13, 1, 1200000, 1),
	(89, 73, 15, 12, 1, 1200000, 1),
	(90, 74, 15, 12, 1, 1200000, 1),
	(91, 75, 1, 8, 2, 682000, 1),
	(93, 77, 15, 12, 1, 1200000, 1),
	(95, 79, 1, 1, 2, 682000, 1),
	(96, 79, 1, 2, 1, 682000, 1),
	(97, 80, 1, 1, 2, 682000, 1),
	(98, 80, 1, 2, 1, 682000, 1),
	(100, 82, 1, 1, 2, 682000, 1),
	(101, 82, 2, 3, 1, 839000, 1),
	(102, 83, 1, 2, 2, 682000, 1),
	(104, 86, 1, 1, 2, 682000, 1),
	(105, 87, 1, 1, 2, 682000, 1),
	(106, 88, 1, 1, 2, 682000, 1),
	(107, 89, 2, 3, 1, 839000, 1),
	(108, 89, 1, 1, 2, 682000, 1),
	(109, 90, 1, 1, 2, 682000, 1),
	(110, 90, 2, 3, 1, 839000, 1),
	(111, 91, 1, 1, 1, 682000, 1),
	(112, 91, 2, 3, 2, 839000, 1),
	(114, 93, 2, 3, 1, 839000, 1),
	(115, 93, 1, 1, 2, 682000, 1),
	(116, 93, 15, 12, 1, 1200000, 1),
	(117, 94, 1, 1, 2, 682000, 1),
	(119, 95, 1, 1, 2, 682000, 1),
	(121, 96, 1, 1, 2, 682000, 1),
	(123, 99, 1, 1, 1, 682000, NULL),
	(124, 99, 15, 12, 1, 1200000, NULL),
	(125, 100, 1, 1, 2, 682000, NULL),
	(126, 100, 2, 3, 2, 839000, NULL),
	(127, 101, 1, 1, 2, 682000, NULL),
	(128, 102, 1, 1, 2, 682000, NULL),
	(129, 102, 3, 6, 2, 50000, NULL),
	(141, 113, 3, 5, 2, 50000, NULL),
	(142, 114, 1, 1, 3, 682000, NULL),
	(143, 114, 3, 5, 3, 50000, NULL),
	(144, 115, 1, 1, 2, 682000, NULL),
	(145, 115, 3, 5, 2, 50000, NULL),
	(146, 116, 1, 1, 3, 682000, NULL),
	(147, 116, 3, 6, 2, 50000, NULL),
	(148, 117, 1, 1, 1, 682000, NULL),
	(149, 117, 3, 5, 2, 50000, NULL),
	(150, 118, 1, 1, 1, 682000, 0),
	(151, 118, 3, 5, 2, 50000, 0),
	(155, 119, 1, 1, 1, 8200000, NULL),
	(157, 120, 3, 5, 2, 700000, NULL),
	(158, 121, 1, 1, 2, 8200000, NULL),
	(161, 123, 7, 50, 1, 4000000, NULL),
	(162, 124, 1, 1, 1, 8200000, NULL),
	(164, 125, 1, 1, 11, 820000, NULL),
	(165, 126, 1, 1, 1, 800000, NULL),
	(166, 127, 1, 1, 1, 500000, NULL),
	(167, 128, 1, 1, 1, 500000, NULL),
	(168, 127, 1, 2, 1, 500000, NULL),
	(169, 129, 6, 48, 1, 550000, NULL),
	(170, 130, 1, 1, 1, 500000, NULL),
	(171, 131, 1, 1, 1, 500000, NULL),
	(172, 132, 1, 1, 1, 500000, NULL),
	(173, 133, 1, 1, 1, 500000, NULL),
	(174, 134, 1, 1, 1, 500000, NULL),
	(175, 135, 7, 50, 1, 4000000, NULL),
	(176, 135, 3, 5, 0, 700000, 0),
	(177, 136, 1, 1, 1, 500000, NULL),
	(178, 137, 1, 1, 1, 500000, NULL),
	(179, 138, 1, 2, 1, 500000, NULL),
	(180, 139, 2, 3, 1, 839000, NULL),
	(181, 140, 2, 3, 1, 839000, NULL),
	(182, 141, 1, 1, 1, 500000, NULL),
	(183, 142, 1, 1, 1, 500000, NULL),
	(184, 143, 1, 1, 1, 500000, NULL),
	(186, 145, 1, 1, 1, 500000, NULL),
	(187, 146, 1, 1, 1, 500000, NULL),
	(188, 147, 2, 3, 1, 839000, NULL),
	(190, 149, 1, 2, 1, 500000, NULL),
	(191, 150, 3, 5, 1, 700000, NULL),
	(192, 151, 1, 1, 2, 500000, NULL),
	(193, 152, 3, 5, 1, 700000, NULL),
	(194, 153, 1, 1, 2, 500000, NULL),
	(195, 154, 1, 1, 1, 500000, NULL),
	(196, 155, 1, 1, 2, 500000, NULL),
	(197, 156, 1, 1, 1, 500000, NULL),
	(202, 159, 1, 8, 1, 500000, NULL),
	(203, 159, 2, 61, 2, 839000, NULL),
	(204, 160, 1, 8, 1, 500000, NULL),
	(205, 160, 2, 61, 2, 839000, NULL),
	(208, 162, 1, 8, 1, 500000, NULL),
	(209, 162, 2, 61, 2, 839000, NULL),
	(210, 163, 1, 1, 1, 500000, NULL),
	(211, 163, 3, 5, 1, 700000, NULL),
	(212, 164, 1, 1, 1, 500000, NULL),
	(213, 165, 3, 64, 1, 700000, NULL),
	(214, 166, 1, 2, 1, 500000, NULL),
	(215, 167, 1, 1, 1, 500000, NULL),
	(216, 168, 3, 64, 1, 700000, NULL),
	(218, 170, 1, 1, 1, 500000, NULL),
	(221, 173, 3, 5, 1, 700000, NULL),
	(222, 174, 2, 61, 1, 839000, NULL),
	(223, 175, 3, 5, 1, 700000, NULL),
	(224, 176, 1, 8, 1, 500000, NULL),
	(225, 177, 3, 64, 1, 700000, NULL),
	(226, 178, 3, 5, 1, 700000, NULL),
	(227, 179, 3, 5, 1, 700000, NULL),
	(228, 179, 1, 1, 1, 500000, NULL),
	(229, 180, 3, 5, 1, 700000, NULL),
	(230, 180, 5, 49, 1, 1200000, NULL),
	(231, 181, 3, 62, 1, 700000, NULL),
	(233, 183, 3, 5, 1, 700000, NULL),
	(235, 185, 3, 5, 1, 700000, NULL),
	(236, 186, 7, 50, 1, 4000000, NULL),
	(237, 187, 2, 3, 1, 839000, NULL),
	(238, 187, 3, 5, 1, 700000, NULL),
	(239, 188, 8, 51, 1, 600000, NULL),
	(240, 189, 3, 64, 1, 700000, NULL),
	(241, 190, 3, 64, 0, 700000, 0),
	(247, 196, 3, 5, 3, 700000, NULL),
	(248, 197, 1, 2, 1, 500000, NULL),
	(249, 197, 6, 48, 1, 550000, NULL),
	(250, 198, 1, 1, 1, 500000, NULL),
	(251, 199, 1, 2, 1, 500000, NULL),
	(252, 200, 1, 1, 1, 500000, NULL),
	(253, 201, 1, 1, 1, 500000, NULL),
	(254, 202, 1, 1, 2, 500000, NULL),
	(255, 203, 3, 5, 1, 700000, NULL),
	(256, 204, 2, 3, 1, 839000, NULL),
	(257, 205, 5, 49, 1, 1200000, NULL),
	(258, 206, 8, 51, 1, 600000, NULL),
	(259, 207, 13, 53, 1, 650000, NULL),
	(260, 208, 15, 11, 1, 1200000, NULL),
	(261, 209, 24, 38, 1, 100000, NULL),
	(262, 210, 1, 8, 0, 500000, 0),
	(263, 211, 1, 1, 2, 500000, NULL),
	(264, 212, 3, 5, 1, 700000, NULL),
	(265, 183, 1, 1, 2, 500000, NULL),
	(266, 213, 8, 51, 1, 600000, NULL),
	(267, 214, 3, 5, 1, 700000, NULL),
	(268, 215, 3, 63, 1, 700000, NULL),
	(269, 216, 3, 6, 1, 700000, NULL),
	(270, 217, 3, 5, 1, 700000, NULL),
	(271, 218, 3, 62, 1, 700000, NULL),
	(272, 219, 3, 64, 1, 700000, NULL),
	(273, 220, 4, 15, 1, 700000, NULL),
	(274, 221, 4, 66, 1, 700000, NULL),
	(275, 222, 4, 47, 1, 700000, NULL),
	(276, 223, 6, 48, 1, 550000, NULL),
	(277, 224, 24, 38, 1, 100000, NULL),
	(278, 225, 1, 2, 1, 500000, NULL),
	(279, 226, 1, 8, 1, 500000, NULL),
	(280, 227, 10, 55, 1, 989000, NULL),
	(281, 228, 5, 49, 1, 1200000, NULL),
	(282, 229, 2, 59, 1, 839000, NULL),
	(283, 230, 2, 61, 1, 839000, NULL),
	(284, 231, 2, 60, 1, 839000, NULL),
	(285, 232, 2, 3, 1, 839000, NULL),
	(286, 233, 1, 2, 1, 500000, NULL),
	(287, 234, 4, 15, 1, 700000, NULL),
	(288, 235, 3, 6, 2, 700000, NULL),
	(289, 236, 7, 50, 1, 4000000, NULL),
	(290, 237, 7, 50, 0, 4000000, 0);

-- Dumping structure for table datn.order_history
CREATE TABLE IF NOT EXISTS `order_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `order_detail_id` int NOT NULL,
  `product_detail_id` int NOT NULL,
  `create_by` int DEFAULT NULL,
  `update_by` int DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `order_id_2` (`order_id`),
  KEY `order_detail_id` (`order_detail_id`),
  KEY `order_detail_id_2` (`order_detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.order_history: ~19 rows (approximately)
INSERT INTO `order_history` (`id`, `order_id`, `order_detail_id`, `product_detail_id`, `create_by`, `update_by`, `action`, `quantity`, `description`, `status`, `created_date`) VALUES
	(10, 1, 2, 3, 1, 1, 'DOI', 1, NULL, 'DONE', NULL),
	(11, 41, 55, 38, 1, NULL, 'DOI', 1, NULL, 'DONE', NULL),
	(12, 41, 55, 38, 1, NULL, 'TRA', 1, NULL, 'DONE', NULL),
	(14, 44, 3, 1, 1, NULL, 'DOI', 1, NULL, 'DONE', NULL),
	(18, 89, 108, 1, NULL, 1, 'DOI', 1, 'hàng lỗi', 'DONE', '2023-04-24 21:06:55'),
	(19, 89, 107, 3, NULL, 1, 'TRA', 1, NULL, 'DONE', '2023-04-24 21:06:55'),
	(22, 96, 121, 1, NULL, 1, 'DOI', 1, 'Hàng lỗi', 'DONE', NULL),
	(27, 101, 127, 1, 1, NULL, 'DOI', 1, NULL, 'DONE', '2022-12-10 13:20:05'),
	(28, 102, 128, 1, NULL, 1, 'DOI', 1, NULL, 'DONE', '2022-12-10 14:16:05'),
	(29, 102, 128, 1, NULL, 1, 'TRA', 1, NULL, 'DONE', '2022-12-10 14:16:05'),
	(30, 115, 144, 1, NULL, 1, 'TRA', 1, NULL, 'DONE', '2022-12-20 08:07:53'),
	(32, 116, 147, 6, 1, NULL, 'DOI', 1, 'đổi trả', 'DONE', '2022-12-21 08:09:42'),
	(33, 116, 146, 1, 1, NULL, 'TRA', 1, NULL, 'DONE', '2022-12-21 08:09:42'),
	(34, 117, 148, 1, NULL, 1, 'DOI', 1, NULL, 'DONE', '2022-12-21 08:13:49'),
	(35, 117, 149, 5, NULL, 1, 'TRA', 1, NULL, 'DONE', '2022-12-21 08:13:49'),
	(52, 135, 176, 5, NULL, 1, 'TRA', 1, 'Sản phẩm lỗi!', 'DONE', '2023-04-10 14:55:58'),
	(53, 190, 241, 64, NULL, 1, 'TRA', 1, 'nhầm size', 'DONE', '2023-04-25 22:03:47'),
	(54, 210, 262, 8, NULL, 1, 'TRA', 1, NULL, 'DONE', '2023-05-08 21:02:42'),
	(55, 237, 290, 50, NULL, 1, 'TRA', 1, 'K đúng', 'DONE', '2023-05-13 17:40:02');

-- Dumping structure for table datn.origin
CREATE TABLE IF NOT EXISTS `origin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `origin` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.origin: ~4 rows (approximately)
INSERT INTO `origin` (`id`, `origin`) VALUES
	(1, 'Việt Nam'),
	(2, 'Trung Quốc'),
	(3, 'Italy'),
	(4, 'EU');

-- Dumping structure for table datn.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `sex` varchar(25) NOT NULL,
  `created_date` datetime NOT NULL,
  `update_date` datetime DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `brand_id` int NOT NULL,
  `category_id` int NOT NULL,
  `weight_id` int NOT NULL,
  `origin_id` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `create_by` int NOT NULL,
  `update_by` int DEFAULT NULL,
  `listed_price` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.products: ~15 rows (approximately)
INSERT INTO `products` (`id`, `code`, `name`, `price`, `image`, `sex`, `created_date`, `update_date`, `description`, `brand_id`, `category_id`, `weight_id`, `origin_id`, `status`, `create_by`, `update_by`, `listed_price`) VALUES
	(1, '17269865', 'Giày Thể Thao Biti’s Hunter Street White', 500000, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F84.70389213355836mwc%20-%20natt.jpg?alt=media&token=450f46ca-3f6a-4086-9c4d-a2a28656aceb', 'UNISEX', '2022-10-02 14:49:31', '2023-04-23 20:16:20', 'Giày Thể Thao Biti’s Hunter Street White(Trắng) \n- Đế Eva cao su - nhẹ như bay - Độ nhẹ tối đa 300g/chiếc \n- Đàn hồi tốt mà vẫn chịu được mài mòn, chịu lực cao \n- Đế lót EVA Kháng khuẩn, hút ẩm tốt và êm ái. \n- Mũ quai si nubuck: Cao cấp, bóng mịn, êm nhờ cấu trúc chặt chẽ theo từng sợi của lớp si. \n- Lót quai thun cá sấu & vải tricot êm mềm\n- Có dây buộc \n- Do màn hình và điều kiện ánh sáng khác nhau, màu sắc thực tế của sản phẩm có thể chênh lệch khoảng 3-5%.\nĐiều kiện và thời gian bảo hành:\nThời gian hỗ trợ bảo hành kể từ ngày mua hàng: 3 tháng kể từ ngày mua hàng.\nĐiều kiện áp dụng:\nKhách hàng mua sản phẩm Biti’s sẽ được bảo hành miễn phí đối với các trường hợp sau: Hở keo, dứt chỉ, gãy móc khoá, bung hoạ tiết trang trí (nơ, nút, hoa, …)', 16, 3, 2, 1, 'AVAILABLE', 1, NULL, 850000),
	(2, '78269851', 'Sneaker Royal', 839000, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F26.030468669259111.jpg?alt=media&token=f84c0c12-a23c-401a-bf3e-f0eb26e82adb', 'UNISEX', '2022-10-02 09:52:06', '2023-04-23 20:18:55', NULL, 3, 5, 2, 1, 'AVAILABLE', 1, NULL, 885000),
	(3, '17766985', 'Nike Air Force 1', 700000, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F1.41865907918021784.jpg?alt=media&token=47849055-0761-4cd6-91b7-bdc56d9f35a0', 'UNISEX', '2022-10-03 23:24:22', '2023-04-23 20:22:13', '- Size: 36-39\n🖋Giày đầy đủ phụ kiện (hộp, giấy gói, giấy tờ, tất tặng kèm)  được đóng gói cẩn thận.\n🖋Chất liệu: da thật 100%, da nhăn mềm mại không bám bẩn rất dễ vệ sinh.\n🖋Đế: Đế đúc liền khối phần dưới có các đường họa tiết (chống trơn trượt) và in logo thương hiệu giày.\n🖋Form: Form dáng chuẩn 1:1 , được gia công tỉ mỉ tạo độ hài hòa giữa phần thân và phần đế\n🖋Giày hot trend, kiểu dáng đẹp sang chảnh dễ phối đồ có thể mang đi chơi, đi học dự tiệc , đi làm...', 8, 3, 1, 1, 'AVAILABLE', 1, NULL, 739000),
	(4, '17290985', 'Sneaker Nữ', 700000, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F86.958481041775139.jpg?alt=media&token=8fea94cc-a7ac-4b06-9dc4-fd054418a57b', 'FEMALE', '2022-10-05 10:24:30', '2023-04-23 20:25:53', 'Giày Thể Thao Nữ cá tính\nGiày đầy đủ phụ kiện (hộp, giấy gói, giấy tờ, tất tặng kèm) được đóng gói cẩn thận. 🖋Chất liệu: da thật 100%, da nhăn mềm mại không bám bẩn rất dễ vệ sinh. 🖋Đế: Đế đúc liền khối phần dưới có các đường họa tiết (chống trơn trượt) và in logo thương hiệu giày. 🖋Form: Form dáng chuẩn 1:1 , được gia công tỉ mỉ tạo độ hài hòa giữa phần thân và phần đế 🖋Giày hot trend, kiểu dáng đẹp sang chảnh dễ phối đồ có thể mang đi chơi, đi học dự tiệc , đi làm...', 1, 3, 1, 1, 'AVAILABLE', 1, NULL, 739000),
	(5, '65467889', 'Jordan Dior', 1200000, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F8.69576516477639314.jpg?alt=media&token=ac7b258a-991d-42ff-9bce-66e41366ec0b', 'UNISEX', '2022-10-05 10:25:04', '2023-04-23 20:27:32', 'Giày Jordan 1 Low White Metallic Gold là một biến thể Jordan 1 low mới, được thiết kế để Nike cho ra mắt trong những ngày thị trường sneaker đang rất nhộn nhịp. Được chế tác từ da lộn chất lượng cao, cùng màu Vàng Gold khiến những đôi AJ1 này mang lại cảm giác sang trọng ngay lập tức khi on feet. \nThiết kế cổ điển như những đôi "Triple White" thông thường cặp cũng với điểm nhấn là Nike Swooshes màu vàng kim loại chạy dọc mỗi bên và các chi tiết mang tính biểu tượng như toe box đục lỗ cũng xuất hiện. Logo Jumpman được thêu trên lưỡi gà, trong khi logo đôi cánh của Thương hiệu Jordan được đặc trưng ở gót giày.', 8, 3, 1, 1, 'AVAILABLE', 1, NULL, 1300000),
	(6, '12354321', 'Giày Vans', 550000, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F84.8071281709534618.jpg?alt=media&token=9a5bacde-2006-4b55-9e76-e18dd1003442', 'UNISEX', '2022-10-05 10:25:27', '2023-04-23 20:28:21', 'Giày Jordan 1 Low White Metallic Gold là một biến thể Jordan 1 low mới, được thiết kế để Nike cho ra mắt trong những ngày thị trường sneaker đang rất nhộn nhịp. Được chế tác từ da lộn chất lượng cao, cùng màu Vàng Gold khiến những đôi AJ1 này mang lại cảm giác sang trọng ngay lập tức khi on feet. Thiết kế cổ điển như những đôi "Triple White" thông thường cặp cũng với điểm nhấn là Nike Swooshes màu vàng kim loại chạy dọc mỗi bên và các chi tiết mang tính biểu tượng như toe box đục lỗ cũng xuất hiện. Logo Jumpman được thêu trên lưỡi gà, trong khi logo đôi cánh của Thương hiệu Jordan được đặc trưng ở gót giày.', 17, 3, 2, 1, 'AVAILABLE', 1, NULL, 600000),
	(7, '78908654', 'Giày Alexander McQueen', 4000000, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F80.9191743464250821.jpg?alt=media&token=ebaddec8-e254-480a-9eee-b50a96af07e9', 'UNISEX', '2022-10-05 10:25:46', '2023-04-23 20:29:55', 'Giày Alexander McQueenlà một biến thể mới, được thiết kế để Nike cho ra mắt trong những ngày thị trường sneaker đang rất nhộn nhịp. Được chế tác từ da lộn chất lượng cao, cùng màu Vàng Gold khiến những đôi AJ1 này mang lại cảm giác sang trọng ngay lập tức khi on feet. \nThiết kế cổ điển như những đôi "Triple White" thông thường cặp cũng với điểm nhấn là Nike Swooshes màu vàng kim loại chạy dọc mỗi bên và các chi tiết mang tính biểu tượng như toe box đục lỗ cũng xuất hiện. Logo Jumpman được thêu trên lưỡi gà, trong khi logo đôi cánh của Thương hiệu Jordan được đặc trưng ở gót giày.', 1, 3, 3, 2, 'AVAILABLE', 1, NULL, 4199000),
	(8, '34567897', 'YZ 700', 600000, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F70.726557076482525.jpg?alt=media&token=5eb4fe40-a768-43cd-a2cf-2f43cd2f3c7d', 'MALE', '2022-10-05 10:26:09', '2023-04-23 20:31:05', 'Giày Jordan 1 Low White Metallic Gold là một biến thể Jordan 1 low mới, được thiết kế để Nike cho ra mắt trong những ngày thị trường sneaker đang rất nhộn nhịp. Được chế tác từ da lộn chất lượng cao, cùng màu Vàng Gold khiến những đôi AJ1 này mang lại cảm giác sang trọng ngay lập tức khi on feet. \nThiết kế cổ điển như những đôi "Triple White" thông thường cặp cũng với điểm nhấn là Nike Swooshes màu vàng kim loại chạy dọc mỗi bên và các chi tiết mang tính biểu tượng như toe box đục lỗ cũng xuất hiện. Logo Jumpman được thêu trên lưỡi gà, trong khi logo đôi cánh của Thương hiệu Jordan được đặc trưng ở gót giày.', 1, 3, 2, 1, 'AVAILABLE', 1, NULL, 620000),
	(9, '89087654', 'Sneaker cổ cao', 650000, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F79.33333399110828.jpg?alt=media&token=08f264ae-be31-4a58-ab47-c077fc3b997d', 'FEMALE', '2022-10-05 10:26:25', '2023-04-23 20:33:13', 'Giày Thể Thao Nữ Cao Cấp Phối Lưới Thoáng Khí Đế Nhựa Trong 2 Màu Trắng Hồng\n👉 Hàng Sẵn Kho, Mẫu mới hot hit\nĐộ lạ, rất hiếm đụng hàng các shop trên thị trường \nPhong cách tạo trẻ trung và sang trọng cho phái nữ \nSản phẩm sử dụng đa dạng kết hợp dùng đi chơi, đi làm, dùng cho các chị em, các mẹ, các bé, đồ đôi mẹ & bé, tuổi teen, đồ đồng phục, .... vv \n👉 Chiều cao gót: cao gót 5cm\nChất liệu đế: nhựa dẻo cao cấp \nMũi da lì phối thân nhựa dẻo cao cấp, chất dù dai phối lưới thoáng khí họa tiết đính đá long lanh tạo nên sự sang trọng đẳng cấp mà lại phong cách trẻ.\nSử dụng quanh năm \nChất liệu bên trong: Lót đệm phối lưới mềm mại rất êm chân', 1, 3, 2, 1, 'AVAILABLE', 1, NULL, 699000),
	(10, '78643215', 'Nike AF1', 989000, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F61.80131315070633532.jpg?alt=media&token=35c04597-d2a1-45fb-b0d3-9d759feb6433', 'FEMALE', '2022-10-05 10:26:47', '2023-04-23 20:34:08', 'Nike AF1', 3, 3, 3, 2, 'AVAILABLE', 1, NULL, 1000000),
	(11, '86643678', 'Sneaker Jordan', 400000, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F36.7866203788042235.jpg?alt=media&token=c55caa3d-97e7-4718-9e59-a8b3140d83a7', 'UNISEX', '2022-10-05 10:27:04', '2023-04-23 20:38:54', 'Sneaker Jordan', 1, 7, 4, 1, 'AVAILABLE', 1, NULL, 500000),
	(13, '74567364', 'MC Quen Auth', 650000, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F16.81281417772957538.jpg?alt=media&token=984cfe55-09c9-4ca9-93da-24b888d8e0a0', 'UNISEX', '2022-10-05 23:44:32', '2023-04-23 20:39:59', 'MC Quen Auth', 1, 3, 3, 3, 'AVAILABLE', 1, NULL, 670000),
	(15, '84645487', 'Giày cao gót đế xuồng', 1200000, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F53.1804656425816341.jpg?alt=media&token=42e7bdc4-8044-406e-9d22-a8832e24808e', 'FEMALE', '2022-10-05 23:54:23', '2023-04-23 20:40:56', 'fptpolytechic', 12, 4, 2, 2, 'AVAILABLE', 1, NULL, 1290000),
	(24, '45276478', 'Giày thể thao', 100000, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F95.1480880300308943.jpg?alt=media&token=1a3666fe-4ccf-4cb8-bfb6-8bb4e5078901', 'UNISEX', '2022-10-09 11:29:57', '2023-04-23 20:42:37', '', 2, 7, 2, 2, 'AVAILABLE', 1, NULL, 150000),
	(42, '18055492', 'Dép đen', 30000, 'https://firebasestorage.googleapis.com/v0/b/n3ts-8ba37.appspot.com/o/images%2F70.417418091367844.jpg?alt=media&token=20f93c6c-bfc5-4f8d-9a69-c579763f56aa', 'MALE', '2023-04-23 22:19:51', '2023-04-23 22:21:29', 'Đen , xuất xứ Việt Nam', 1, 7, 3, 1, 'AVAILABLE', 1, NULL, -1);

-- Dumping structure for table datn.product_details
CREATE TABLE IF NOT EXISTS `product_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `size_id` int NOT NULL,
  `color_id` int NOT NULL,
  `height_id` int NOT NULL,
  `material_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.product_details: ~39 rows (approximately)
INSERT INTO `product_details` (`id`, `product_id`, `size_id`, `color_id`, `height_id`, `material_id`, `quantity`) VALUES
	(1, 1, 2, 1, 3, 2, -14),
	(2, 1, 3, 1, 4, 2, 13),
	(3, 2, 6, 15, 4, 6, 49),
	(5, 3, 2, 2, 4, 6, -6),
	(6, 3, 1, 2, 5, 3, 19),
	(8, 1, 3, 3, 4, 2, 0),
	(11, 15, 3, 2, 5, 1, 10),
	(12, 15, 1, 6, 5, 1, 7),
	(13, 15, 2, 2, 1, 3, 9),
	(15, 4, 3, 1, 4, 2, 48),
	(36, 1, 2, 2, 3, 2, 20),
	(37, 24, 2, 1, 4, 2, 0),
	(38, 24, 3, 3, 4, 2, 21),
	(39, 25, 3, 7, 3, 2, 21),
	(40, 25, 2, 7, 3, 2, 18),
	(41, 26, 3, 8, 4, 6, 15),
	(42, 35, 2, 3, 4, 3, 20),
	(43, 35, 3, 2, 3, 4, 15),
	(44, 36, 3, 2, 5, 2, 15),
	(45, 36, 3, 4, 6, 2, 20),
	(47, 4, 2, 1, 3, 2, 49),
	(48, 6, 3, 2, 4, 1, 20),
	(49, 5, 4, 2, 4, 1, 31),
	(50, 7, 3, 1, 6, 3, 11),
	(51, 8, 2, 1, 4, 2, 19),
	(52, 11, 4, 6, 7, 1, 12),
	(53, 13, 5, 6, 6, 2, 23),
	(54, 14, 2, 4, 5, 1, 12),
	(55, 10, 6, 7, 8, 5, 77),
	(59, 2, 7, 15, 4, 6, 49),
	(60, 2, 8, 15, 4, 6, 49),
	(61, 2, 9, 15, 4, 6, 36),
	(62, 3, 3, 2, 4, 6, 42),
	(63, 3, 4, 2, 4, 6, 49),
	(64, 3, 5, 2, 4, 6, 50),
	(65, 4, 1, 1, 3, 6, 50),
	(66, 4, 1, 8, 4, 6, 49),
	(67, 4, 4, 8, 4, 6, 50),
	(68, 42, 3, 3, 3, 6, 110);

-- Dumping structure for table datn.promotions
CREATE TABLE IF NOT EXISTS `promotions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `begin_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `status` varchar(255) NOT NULL,
  `create_by` int NOT NULL,
  `update_by` int DEFAULT NULL,
  `is_delete` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.promotions: ~5 rows (approximately)
INSERT INTO `promotions` (`id`, `name`, `quantity`, `begin_date`, `end_date`, `status`, `create_by`, `update_by`, `is_delete`) VALUES
	(1, 'giảm 10% cho toàn bộ', 10, '2023-04-14 00:00:00', '2023-04-28 00:00:00', 'AVAILABLE', 1, 1, 0),
	(2, 'sknd', 20, '2023-04-14 00:00:00', '2023-04-14 00:00:00', 'UNAVAILABLE', 1, 1, 1),
	(3, 'sd', 22, '2023-04-14 00:00:00', '2023-04-25 00:00:00', 'UNAVAILABLE', 1, 1, 1),
	(4, 'am', 21, '2023-04-14 00:00:00', '2023-04-14 00:00:00', 'UNAVAILABLE', 1, 1, 1),
	(5, 'giảm 30% trong ngày 30/4 - 1/5', 30, '2023-04-30 00:00:00', '2023-05-01 00:00:00', 'AVAILABLE', 1, NULL, 0);

-- Dumping structure for table datn.promotion_blacklist
CREATE TABLE IF NOT EXISTS `promotion_blacklist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `promotion_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.promotion_blacklist: ~0 rows (approximately)

-- Dumping structure for table datn.promotion_categories
CREATE TABLE IF NOT EXISTS `promotion_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `promotion_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.promotion_categories: ~0 rows (approximately)
INSERT INTO `promotion_categories` (`id`, `promotion_id`, `category_id`) VALUES
	(1, 1, 5);

-- Dumping structure for table datn.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.roles: ~3 rows (approximately)
INSERT INTO `roles` (`id`, `name`) VALUES
	(1, 'ADMIN'),
	(2, 'USER'),
	(3, 'EMPLOYEE');

-- Dumping structure for table datn.shop
CREATE TABLE IF NOT EXISTS `shop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `ward` varchar(255) NOT NULL,
  `tel` varchar(15) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.shop: ~0 rows (approximately)
INSERT INTO `shop` (`id`, `owner_name`, `address`, `province`, `district`, `ward`, `tel`, `email`, `password_email`) VALUES
	(1, 'Nguyễn Thành Trung', 'Số 1, Lê Quang Đạo', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Phú Đô', '0961932630', 'laclacshop.info@gmail.com', 'zsodopqtkmuborwz');

-- Dumping structure for table datn.sizes
CREATE TABLE IF NOT EXISTS `sizes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.sizes: ~9 rows (approximately)
INSERT INTO `sizes` (`id`, `name`) VALUES
	(1, '35'),
	(2, '36'),
	(3, '37'),
	(4, '38'),
	(5, '39'),
	(6, '40'),
	(7, '41'),
	(8, '42'),
	(9, '43');

-- Dumping structure for table datn.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `ward` varchar(255) DEFAULT NULL,
  `province_id` varchar(255) DEFAULT NULL,
  `ward_code` varchar(255) DEFAULT NULL,
  `district_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.users: ~4 rows (approximately)
INSERT INTO `users` (`id`, `username`, `fullname`, `email`, `password`, `phone`, `address`, `status`, `avatar`, `province`, `district`, `ward`, `province_id`, `ward_code`, `district_id`) VALUES
	(1, 'thuylv', 'Lê Văn Thuỷ', 'anhthuy03072002@gmail.com', '$2a$10$ZKnu4mb9erOxn3LJBg4lkODL8POItZQFHf.5TLu2h5y/KJhZjln4q', '0705925361', 'Thôn 3', 'ACTIVE', NULL, 'Thanh Hóa', 'Thành phố Thanh Hóa', 'Xã Quảng Cát', '234', '280130', '1616'),
	(2, 'nghiatm', 'Trần Minh Nghĩa', 'nghiahtcon@gmail.com', '$2a$10$HB3LZNuZX044h6WWKL0nl.eR.X38XQjou4.H5aEUSTzLRYAv64GB.', '0393883934', '4a', 'ACTIVE', NULL, 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '201', '907557', '3440'),
	(3, 'trangtq', 'Tạ Quỳnh Trang', 'tranminhnghia.19102002@gmail.com', '$2a$10$WPSgbqnX5pyvnn5c.qefxuPUYVnKmqK7uVAa6odpNsID/Bki2f9F.', '0962987225', 'số 123', 'ACTIVE', NULL, 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '268', '220909', '2046'),
	(4, 'thiennd', 'Nguyễn Đức Thiện', 'thienndph18157@fpt.edu.vn', '$2a$10$WPSgbqnX5pyvnn5c.qefxuPUYVnKmqK7uVAa6odpNsID/Bki2f9F..5TLu2h5y/KJhZjln4q', '0962987225', 'số 123', 'ACTIVE', NULL, 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '201', '907557', '3440');

-- Dumping structure for table datn.user_roles
CREATE TABLE IF NOT EXISTS `user_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.user_roles: ~4 rows (approximately)
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`) VALUES
	(1, 1, 1),
	(2, 2, 2),
	(3, 3, 2),
	(4, 4, 1);

-- Dumping structure for table datn.vouchers
CREATE TABLE IF NOT EXISTS `vouchers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code_voucher` varchar(255) NOT NULL,
  `min_money` int NOT NULL,
  `begin_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `promotion` int NOT NULL,
  `quantity` int NOT NULL,
  `create_by` int NOT NULL,
  `update_by` int DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `is_delete` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.vouchers: ~7 rows (approximately)
INSERT INTO `vouchers` (`id`, `name`, `code_voucher`, `min_money`, `begin_date`, `end_date`, `promotion`, `quantity`, `create_by`, `update_by`, `status`, `is_delete`) VALUES
	(1, '10k cho đơn tối thiểu 500k', 'F3CFY01CA', 500000, '2023-04-04 00:00:00', '2023-04-30 00:00:00', 10000, 13, 1, 1, 'UNAVAILABLE', 0),
	(2, '20k cho đơn tối thiểu 500k', 'YFGI0S012', 500000, '2023-04-04 00:00:00', '2023-04-30 00:00:00', 20000, 38, 1, 1, 'UNAVAILABLE', 0),
	(3, '100k cho đơn tối thiểu 900k', 'Q26DHHZVR', 900000, '2023-04-04 00:00:00', '2023-04-30 00:00:00', 100000, 18, 1, 3, 'UNAVAILABLE', 0),
	(4, '20k cho đơn tối thiểu 500k', 'K7KPQKG18', 500000, '2022-12-21 00:00:00', '2023-08-28 00:00:00', 20000, -1, 1, 1, 'UNAVAILABLE', 0),
	(5, '20k  cho đơn tối thiểu 500k', 'G5YI3A528', 500000, '2022-12-22 00:00:00', '2022-12-31 00:00:00', 20000, 20, 1, 1, 'UNAVAILABLE', 0),
	(6, 'test', 'KXFVBXBWV', 11111, '2022-12-22 00:00:00', '2022-12-23 00:00:00', 11111, 11, 1, 3, 'UNAVAILABLE', 1),
	(7, 'fpoly1', '60DONQKHY', 500000, '2022-12-23 00:00:00', '2022-12-20 00:00:00', 20000, 10, 1, 3, 'UNAVAILABLE', 1);

-- Dumping structure for table datn.weight
CREATE TABLE IF NOT EXISTS `weight` (
  `id` int NOT NULL AUTO_INCREMENT,
  `weight` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.weight: ~5 rows (approximately)
INSERT INTO `weight` (`id`, `weight`) VALUES
	(1, 100),
	(2, 200),
	(3, 300),
	(4, 400),
	(5, 500);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
