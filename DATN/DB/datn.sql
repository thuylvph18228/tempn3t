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

-- Dumping structure for table datn.brands
CREATE TABLE IF NOT EXISTS `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.brands: ~16 rows (approximately)
INSERT INTO `brands` (`id`, `name`, `status`) VALUES
	(1, 'Adidas', 'AVAILABLE'),
	(2, 'Vans', 'AVAILABLE'),
	(3, 'Converse', 'AVAILABLE'),
	(4, 'Versace', 'AVAILABLE'),
	(8, 'Nike', 'AVAILABLE'),
	(9, 'nhãn hiệu 1', 'AVAILABLE'),
	(10, 'Sandal', 'AVAILABLE'),
	(11, 'Cao gót', 'AVAILABLE'),
	(12, 'Dior', 'AVAILABLE'),
	(13, 'nhãn hiệu 1', 'AVAILABLE'),
	(14, 'nhãn hiệu B', 'AVAILABLE'),
	(15, 'Juno', 'AVAILABLE'),
	(16, 'Biti’s Hunter', 'AVAILABLE'),
	(17, 'HM', 'AVAILABLE'),
	(18, 'dungna', 'AVAILABLE'),
	(19, 'dungna', 'AVAILABLE');

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
  `create_by` int NOT NULL,
  `update_by` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.categories: ~6 rows (approximately)
INSERT INTO `categories` (`id`, `name`, `status`, `create_by`, `update_by`) VALUES
	(3, 'Sneaker', 'AVAILABLE', 1, NULL),
	(4, 'Cao gót', 'AVAILABLE', 1, NULL),
	(5, 'Sandal', 'AVAILABLE', 1, NULL),
	(6, 'Guốc', 'AVAILABLE', 1, NULL),
	(7, 'giày bệt', 'AVAILABLE', 1, 1),
	(8, 'Dép cao gót', 'AVAILABLE', 1, 1);

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
	(15, 'Vân ANh');

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
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.images: ~56 rows (approximately)
INSERT INTO `images` (`id`, `path`, `product_id`) VALUES
	(1, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 24),
	(2, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 25),
	(3, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 25),
	(4, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 25),
	(5, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 25),
	(6, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 25),
	(7, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 1),
	(11, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 2),
	(12, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 1),
	(13, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 1),
	(15, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 2),
	(49, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 34),
	(50, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 34),
	(51, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 35),
	(52, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 35),
	(53, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 36),
	(54, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 36),
	(55, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 36),
	(62, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 3),
	(63, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 3),
	(64, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 4),
	(65, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 4),
	(66, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 4),
	(67, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 5),
	(68, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 5),
	(69, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 5),
	(70, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 5),
	(71, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 6),
	(72, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 6),
	(73, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 6),
	(74, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 6),
	(75, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 6),
	(76, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 6),
	(77, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 8),
	(78, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 8),
	(79, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 8),
	(80, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 8),
	(81, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 8),
	(82, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 8),
	(83, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 9),
	(84, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 9),
	(85, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 9),
	(86, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 37),
	(87, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 38),
	(88, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 15),
	(89, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 15),
	(90, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 11),
	(91, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 13),
	(92, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 14),
	(93, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 14),
	(94, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 10),
	(95, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 33),
	(96, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 33),
	(97, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 33),
	(98, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 33),
	(99, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 39);

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
	(11, 'Vân Anh');

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
  PRIMARY KEY (`id`),
  KEY `code` (`code`),
  KEY `code_ghn` (`code_ghn`),
  KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.orders: ~58 rows (approximately)
INSERT INTO `orders` (`id`, `code`, `code_ghn`, `customer_name`, `created_date`, `update_date`, `phone`, `address`, `province`, `district`, `ward`, `description`, `order_type`, `payment_type`, `voucher_id`, `status`, `create_by`, `update_by`, `is_pay`) VALUES
	(1, 'abc', NULL, 'Trần Minh Ng', '2022-10-05 19:06:51', '2022-10-21 17:30:18', '0961932630', 'Số 1 ', 'Hà nội', 'Từ Liêm', 'Mỹ Đình', NULL, 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0),
	(2, 'aaa', NULL, 'Trần Minh Ng', '2022-10-05 19:08:21', '2022-10-20 16:37:31', '0961932630', 'Số 2', 'Hà Nội', 'Từ Liêm', 'Mỹ Đình', NULL, 'OFFLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0),
	(41, '1234567', NULL, 'Trần Minh Ng', '2022-10-12 21:17:33', '2022-10-20 17:22:54', '0961932630', 'số 1', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Phúc Xá', NULL, 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0),
	(42, '12345678', NULL, 'Trần Minh Ng', '2022-10-12 21:19:03', '2022-10-21 16:48:47', '0961932630', 'số 1', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Phúc Xá', NULL, 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0),
	(43, '1235434', NULL, 'Trần Minh Ng', '2022-10-12 21:48:58', '2022-10-21 21:03:34', '0961932630', 'Số 1', 'Thành phố Hà Nội', 'Quận Long Biên', 'Phường Giang Biên', NULL, 'ONLINE', 'ONLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 1, NULL, 0),
	(44, '105865', NULL, 'Trần Minh Ng', '2022-10-13 11:29:25', '2022-10-20 16:48:06', '0961932630', 'Số 1', 'Thành phố Hà Nội', 'Quận Tây Hồ', 'Phường Xuân La', NULL, 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', 1, NULL, 0),
	(46, '100000001', NULL, 'Trần Minh Ng', '2022-10-13 14:28:28', '2022-10-13 15:05:13', '0961932630', 'Số 2', 'Thành phố Hà Nội', 'Quận Hai Bà Trưng', 'Phường Bạch Đằng', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CANCELLED', 1, NULL, 0),
	(48, '13369231', NULL, 'Trần Minh Ng', '2022-10-13 14:31:58', '2022-10-20 17:19:22', '0961932630', 'Số 1', 'Tỉnh Điện Biên', 'Huyện Điện Biên', 'Xã Sam Mứn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0),
	(49, '13791216', NULL, 'Trần Minh Ng', '2022-10-13 16:20:02', '2022-10-20 16:34:34', '0961932630', 'Số 3', 'Thành phố Hà Nội', 'Quận Hoàn Kiếm', 'Phường Đồng Xuân', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', 1, NULL, 0),
	(50, '12251366', NULL, 'Trần Minh Ng', '2022-10-17 22:21:09', '2022-11-30 22:53:38', '0961932630', 'Số 2', 'Tỉnh Hà Giang', 'Huyện Yên Minh', 'Xã Phú Lũng', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0),
	(51, '10964079', NULL, 'Trần Minh Ng', '2022-10-17 22:29:41', '2022-10-17 22:45:19', '0961932630', 'Số 3', 'Tỉnh Cao Bằng', 'Huyện Bảo Lâm', 'Xã Lý Bôn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0),
	(54, '11865681', '', 'Trần Minh Ng', '2022-10-19 10:15:08', '2022-10-19 11:25:24', '0961932630', 'Số 123', 'Hà Nội', 'Quận Cầu Giấy', 'Phường Dịch Vọng Hậu', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0),
	(55, '16837828', 'LLGBET', 'Trần Minh Ng', '2022-10-19 11:08:06', '2022-10-21 21:31:43', '0961930630', 'Số 12', 'Hà Nội', 'Quận Đống Đa', 'Phường Hàng Bột', '', 'ONLINE', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 1, NULL, 0),
	(56, '18546794', NULL, 'Trần Minh Ng', '2022-10-19 11:45:06', '2022-10-20 17:16:41', '0961932630', 'Số 12', 'Hà Nội', 'Quận Tây Hồ', 'Phường Yên Phụ', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', 1, NULL, 0),
	(57, '14411613', NULL, 'Trần Minh Ng', '2022-10-19 15:47:36', NULL, '0961932630', 'Số 1234', 'Hà Nội', 'Quận Bắc Từ Liêm', 'Phường Xuân Đỉnh', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0),
	(58, '16922928', NULL, 'Trần Minh Ng', '2022-10-19 15:55:38', NULL, '0961932630', 'Số 123', 'Hà Nội', 'Quận Hai Bà Trưng', 'Phường Bạch Mai', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0),
	(59, '16681783', NULL, 'Trần Minh Ng', '2022-10-20 23:31:07', NULL, '0961932630', 'Số 123', 'Hà Nội', 'Quận Hoàn Kiếm', 'Phường Tràng Tiền', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0),
	(60, '19374338', 'LLGBEW', 'Trần Minh Ng', '2022-10-21 16:46:32', '2022-10-21 21:13:50', '0961932630', 'Số 123', 'Hà Nội', 'Quận Thanh Xuân', 'Phường Thanh Xuân Nam', '', 'ONLINE', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 1, NULL, 0),
	(61, '17610674', NULL, 'Trần Minh Ng', '2022-10-22 20:45:06', '2022-10-28 14:31:58', '0598578484', '6655', 'Hưng Yên', 'Huyện Phù Cừ', 'Xã Tống Phan', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', 1, 1, 0),
	(62, '19302808', NULL, 'Trần Minh Ng', '2022-10-22 20:49:36', NULL, '09765443333', 'ffr', 'Điện Biên', 'Huyện Tuần Giáo', 'Xã Quài Tở', '', 'ONLINE', 'ONLINE', NULL, 'CONFIRMED', 1, NULL, 0),
	(63, '12676417', NULL, 'Trần Minh Ng', '2022-10-22 20:52:16', NULL, '097666666666', 'rrrrtr', 'Hòa Bình', 'Huyện Lạc Sơn', 'Xã Xuất Hóa', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0),
	(64, '12563911', NULL, 'Trần Minh Ng', '2022-10-22 21:02:38', '2022-10-28 14:30:56', '0598578484', 'hhttttt', 'Lào Cai', 'Huyện Mường Khương', 'Xã Thanh Bình', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', 1, 1, 0),
	(65, '10538605', NULL, 'Trần Minh Ng', '2022-10-28 11:50:13', '2022-10-28 14:53:39', '04939333887', 'so1', 'Phú Thọ', 'Huyện Thanh Ba', 'Xã Quảng Yên', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, 1, 0),
	(69, '16469505', NULL, 'Trần Minh Ng', '2022-10-31 14:55:14', '2022-11-23 23:30:35', '0961932630', 'số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', NULL, NULL, 0),
	(70, '18166507', NULL, 'Trần Minh Ng', '2022-10-31 15:46:35', '2022-10-31 23:16:37', '0961932630', 'Số 1', 'Hà Nội', 'Quận Tây Hồ', 'Phường Tứ Liên', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, 1, 0),
	(73, '18600119', 'LLGHWR', 'Trần Minh Ng', '2022-11-01 14:17:06', '2022-11-01 14:18:05', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, 1, 0),
	(74, '11809232', NULL, 'Trần Minh Ng', '2022-11-02 13:24:17', NULL, '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0),
	(75, '14098326', NULL, 'Trần Minh Ng', '2022-11-02 13:30:14', NULL, '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0),
	(77, '11710250', NULL, 'Trần Minh Ng', '2022-11-02 13:57:58', NULL, '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0),
	(79, '11311402', NULL, 'Trần Minh Ng', '2022-11-16 22:21:29', NULL, '0961932630', 'số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0),
	(80, '14113035', NULL, 'Trần Minh Ng', '2022-11-17 21:17:42', NULL, '0961932630', 'số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0),
	(81, '11859170', NULL, 'Trần Minh Ng', '2022-11-18 15:25:16', NULL, '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0),
	(82, '11226978', NULL, 'Trần Minh Ng', '2022-11-21 20:29:03', NULL, '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Xuân Phương', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0),
	(83, '11566030', NULL, 'Trần Minh Ng', '2022-11-21 20:56:34', NULL, '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0),
	(84, '16451862', NULL, 'Trần Minh Ng', '2022-11-21 20:59:48', NULL, '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0),
	(86, '13471154', NULL, 'Trần Minh Ng', '2022-11-21 22:09:29', NULL, '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, 0),
	(87, '15187611', NULL, 'Trần Minh Ng', '2022-11-21 22:15:18', '2023-03-26 18:52:03', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'UNCONFIRM', NULL, NULL, 0),
	(88, '15396251', NULL, 'Trần Minh Ng', '2022-11-23 09:48:54', '2022-12-21 08:02:52', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', NULL, NULL, 0),
	(89, '14678583', 'LLUL3U', 'Trần Minh Ng', '2022-11-23 09:52:53', '2022-11-23 23:39:59', '0961932630', 'Số 1', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, NULL, 0),
	(90, '14250674', NULL, 'Trần Minh Ng', '2022-11-24 23:13:03', '2022-11-30 22:55:42', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', NULL, NULL, 0),
	(91, '12940658', NULL, 'Trần Minh Ng', '2022-11-24 23:27:58', '2022-11-30 22:54:56', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'CONFIRMED', NULL, NULL, 0),
	(93, '17557900', 'LLUGDH', 'Trần Minh Ng', '2022-11-29 21:23:25', '2022-11-29 21:27:09', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, 0),
	(94, '16936840', NULL, 'Trần Minh Ng', '2022-11-29 22:05:54', '2022-11-29 22:50:35', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE', 'OFFLINE', NULL, 'DELIVERING', 1, NULL, 0),
	(95, '18734039', NULL, 'Trần Minh Ng', '2022-11-29 22:22:40', NULL, '0961932630', '', '', '', '', '', 'OFFLINE', 'OFFLINE', NULL, 'DELIVERED', 1, NULL, 0),
	(96, '19809544', NULL, 'Trần Minh Ng', '2022-11-29 23:18:43', '2022-11-29 23:20:43', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, NULL, 0),
	(99, '12884057', NULL, 'Trần Minh Ng', '2022-12-04 12:16:34', NULL, '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, 0),
	(100, '12041744', NULL, 'Trần Minh Ng', '2022-12-04 14:20:12', '2022-12-04 14:33:01', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, NULL, 0),
	(101, '19843497', NULL, 'Trần Minh Ng', '2022-12-10 12:04:15', NULL, '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'OFFLINE', 'OFFLINE', NULL, 'DELIVERED', 1, NULL, 0),
	(102, '14346130', NULL, 'Trần Minh Ng', '2022-12-10 14:07:53', '2022-12-10 14:12:18', '0961932630', 'Số 123', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, NULL, 0),
	(113, '16440333', 'LLU49Q', 'Trần Minh Ng', '2022-12-15 21:42:28', '2022-12-23 14:47:06', '0961932630', 'Số 1 Lê Quang Đạo', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'VNPAY', NULL, 'CONFIRMED', 3, NULL, 1),
	(114, '10720868', 'LLUBXE', 'Trần Minh Ng', '2022-12-20 08:01:35', '2022-12-20 08:03:28', '0961932630', 'Số 1 Lê Quang Đạo', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Tây Mỗ', '', 'ONLINE_WEB', 'VNPAY', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', 3, NULL, 1),
	(115, '12607427', NULL, 'Trần Minh Ng', '2022-12-20 08:05:35', '2022-12-20 08:07:05', '0961932630', 'Số 1 Lê Quang Đạo', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Trung Văn', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'DELIVERED', 3, NULL, 1),
	(116, '12921360', 'LLU3VD', 'Trần Minh Ng', '2022-12-21 08:06:49', '2022-12-21 08:08:42', '0961932638', 'Số 123', 'Hà Nội', 'Huyện Phú Xuyên', 'Xã Nam Tiến', '', 'ONLINE', 'OFFLINE', NULL, 'DELIVERED', 1, NULL, 1),
	(117, '19339931', NULL, 'Trần Minh Ng', '2022-12-21 08:11:17', '2022-12-21 08:13:04', '0962987225', 'Số 1 Lê Quang Đạo', 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '', 'ONLINE_WEB', 'VNPAY', NULL, 'DELIVERED', 3, NULL, 1),
	(118, '10639449', NULL, 'Trần Minh Ng', '2022-12-22 21:00:44', '2022-12-22 21:06:20', '0962987225', 'số 123', 'Hồ Chí Minh', 'Thành Phố Thủ Đức', 'Phường An Khánh', '', 'ONLINE_WEB', 'VNPAY', NULL, 'DELIVERED', 3, NULL, 1),
	(119, '15555665', NULL, 'Trần Minh Ng', '2022-12-23 14:39:44', '2022-12-23 14:49:09', '0962987225', 'số 123', 'Hồ Chí Minh', 'Thành Phố Thủ Đức', 'Phường An Khánh', '', 'ONLINE_WEB', 'VNPAY', NULL, 'DELIVERED', 3, NULL, 1),
	(120, '16140412', NULL, 'Trần Minh Ng', '2022-12-23 14:41:32', '2022-12-23 14:47:05', '0961932999', 'Số 123', 'Hà Nội', 'Huyện Ứng Hòa', 'Xã Viên Nội', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', NULL, NULL, NULL),
	(121, '19610356', NULL, 'Trần Minh Ng', '2022-12-23 14:54:55', NULL, '0961962333', 'Số 1', 'Hà Nội', 'Quận Cầu Giấy', 'Phường Yên Hoà', '', 'ONLINE', 'OFFLINE', NULL, 'CONFIRMED', 1, NULL, NULL),
	(122, '16764759', NULL, 'Tạ Quỳnh Trang', '2023-03-26 18:25:58', NULL, '0962987225', 'số 123', 'Hòa Bình', 'Huyện Mai Châu', 'Xã Tân Thành', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_CONFIRMATION', NULL, NULL, NULL),
	(123, '15926165', 'LLNVP3', 'Trần Minh Nghĩa', '2023-03-26 18:29:49', '2023-03-26 18:38:21', '0393883934', 'Số 4A', 'Hà Nội', 'Quận Cầu Giấy', 'Phường Trung Hoà', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', NULL, NULL, NULL),
	(124, '15874245', 'LLNVP4', 'Tạ Quỳnh Trang', '2023-03-26 18:47:36', '2023-03-26 19:57:19', '0962987225', 'số 123', 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '', 'ONLINE_WEB', 'OFFLINE', NULL, 'WAIT_FOR_THE_SHIPPER_TO_PICK_UP', NULL, NULL, NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.order_details: ~95 rows (approximately)
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
	(68, 65, 2, 4, 2, 839000, 1),
	(69, 65, 3, 5, 2, 50000, 1),
	(70, 69, 1, 8, 2, 682000, 1),
	(72, 70, 2, 4, 2, 839000, 1),
	(73, 70, 1, 1, 2, 682000, 1),
	(83, 70, 15, 11, 1, 1200000, 1),
	(85, 69, 15, 13, 1, 1200000, 1),
	(89, 73, 15, 12, 1, 1200000, 1),
	(90, 74, 15, 12, 1, 1200000, 1),
	(91, 75, 1, 8, 1, 682000, 1),
	(93, 77, 15, 12, 1, 1200000, 1),
	(95, 79, 1, 1, 2, 682000, 1),
	(96, 79, 1, 2, 1, 682000, 1),
	(97, 80, 1, 1, 2, 682000, 1),
	(98, 80, 1, 2, 1, 682000, 1),
	(100, 82, 1, 1, 2, 682000, 1),
	(101, 82, 2, 3, 1, 839000, 1),
	(102, 83, 1, 2, 2, 682000, 1),
	(103, 84, 2, 4, 1, 839000, 1),
	(104, 86, 1, 1, 2, 682000, 1),
	(105, 87, 1, 1, 2, 682000, 1),
	(106, 88, 1, 1, 2, 682000, 1),
	(107, 89, 2, 3, 2, 839000, 1),
	(108, 89, 1, 1, 2, 682000, 1),
	(109, 90, 1, 1, 2, 682000, 1),
	(110, 90, 2, 3, 1, 839000, 1),
	(111, 91, 1, 1, 1, 682000, 1),
	(112, 91, 2, 3, 2, 839000, 1),
	(114, 93, 2, 3, 1, 839000, 1),
	(115, 93, 1, 1, 2, 682000, 1),
	(116, 93, 15, 12, 1, 1200000, 1),
	(117, 94, 1, 1, 2, 682000, 1),
	(118, 94, 25, 40, 1, 500000, 1),
	(119, 95, 1, 1, 2, 682000, 1),
	(120, 95, 25, 40, 1, 500000, 1),
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
	(152, 119, 39, 56, 2, 200000, NULL),
	(153, 119, 39, 57, 2, 200000, NULL),
	(154, 119, 39, 58, 2, 200000, NULL),
	(155, 119, 1, 1, 1, 8200000, NULL),
	(157, 120, 3, 5, 2, 700000, NULL),
	(158, 121, 1, 1, 2, 8200000, NULL),
	(159, 121, 4, 15, 2, 700000, NULL),
	(160, 122, 4, 15, 1, 700000, NULL),
	(161, 123, 7, 50, 1, 4000000, NULL),
	(162, 124, 1, 1, 1, 8200000, NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.order_history: ~22 rows (approximately)
INSERT INTO `order_history` (`id`, `order_id`, `order_detail_id`, `product_detail_id`, `create_by`, `update_by`, `action`, `quantity`, `description`, `status`, `created_date`) VALUES
	(10, 1, 2, 3, 1, 1, 'DOI', 1, NULL, 'DONE', NULL),
	(11, 41, 55, 38, 1, NULL, 'DOI', 1, NULL, 'DONE', NULL),
	(12, 41, 55, 38, 1, NULL, 'TRA', 1, NULL, 'DONE', NULL),
	(14, 44, 3, 1, 1, NULL, 'DOI', 1, NULL, 'DONE', NULL),
	(15, 70, 72, 4, NULL, 1, 'DOI', 1, NULL, 'DONE', NULL),
	(18, 89, 108, 1, 3, NULL, 'DOI', 1, 'hàng lỗi', 'WAIT', NULL),
	(19, 89, 107, 3, 3, NULL, 'TRA', 1, NULL, 'WAIT', NULL),
	(22, 96, 121, 1, NULL, 1, 'DOI', 1, 'Hàng lỗi', 'DONE', NULL),
	(25, 100, 126, 3, 3, NULL, 'DOI', 1, NULL, 'WAIT', '2022-12-04 14:33:35'),
	(26, 100, 126, 3, 3, NULL, 'TRA', 1, NULL, 'WAIT', '2022-12-04 14:33:35'),
	(27, 101, 127, 1, 1, NULL, 'DOI', 1, NULL, 'DONE', '2022-12-10 13:20:05'),
	(28, 102, 128, 1, NULL, 1, 'DOI', 1, NULL, 'DONE', '2022-12-10 14:16:05'),
	(29, 102, 128, 1, NULL, 1, 'TRA', 1, NULL, 'DONE', '2022-12-10 14:16:05'),
	(30, 115, 144, 1, NULL, 1, 'TRA', 1, NULL, 'DONE', '2022-12-20 08:07:53'),
	(32, 116, 147, 6, 1, NULL, 'DOI', 1, 'đổi trả', 'DONE', '2022-12-21 08:09:42'),
	(33, 116, 146, 1, 1, NULL, 'TRA', 1, NULL, 'DONE', '2022-12-21 08:09:42'),
	(34, 117, 148, 1, NULL, 1, 'DOI', 1, NULL, 'DONE', '2022-12-21 08:13:49'),
	(35, 117, 149, 5, NULL, 1, 'TRA', 1, NULL, 'DONE', '2022-12-21 08:13:49'),
	(48, 118, 150, 1, NULL, 1, 'TRA', 1, NULL, 'DONE', '2022-12-22 22:08:08'),
	(49, 118, 151, 5, NULL, 1, 'DOI', 1, NULL, 'WAIT', '2022-12-22 22:08:08'),
	(50, 119, 152, 56, 1, NULL, 'TRA', 2, NULL, 'DONE', '2022-12-23 14:53:08'),
	(51, 119, 153, 57, 1, NULL, 'DOI', 1, NULL, 'DONE', '2022-12-23 14:53:08');

-- Dumping structure for table datn.origin
CREATE TABLE IF NOT EXISTS `origin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `origin` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.products: ~24 rows (approximately)
INSERT INTO `products` (`id`, `code`, `name`, `price`, `image`, `sex`, `created_date`, `update_date`, `description`, `brand_id`, `category_id`, `weight_id`, `origin_id`, `status`, `create_by`, `update_by`) VALUES
	(1, '17269865', 'Giày Thể Thao Biti’s Hunter Street White', 8200000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'UNISEX', '2022-10-02 14:49:31', '2022-12-23 10:58:02', 'Giày Thể Thao Biti’s Hunter Street White(Trắng) \n- Đế Eva cao su - nhẹ như bay - Độ nhẹ tối đa 300g/chiếc \n- Đàn hồi tốt mà vẫn chịu được mài mòn, chịu lực cao \n- Đế lót EVA Kháng khuẩn, hút ẩm tốt và êm ái. \n- Mũ quai si nubuck: Cao cấp, bóng mịn, êm nhờ cấu trúc chặt chẽ theo từng sợi của lớp si. \n- Lót quai thun cá sấu & vải tricot êm mềm\n- Có dây buộc \n- Do màn hình và điều kiện ánh sáng khác nhau, màu sắc thực tế của sản phẩm có thể chênh lệch khoảng 3-5%.\nĐiều kiện và thời gian bảo hành:\nThời gian hỗ trợ bảo hành kể từ ngày mua hàng: 3 tháng kể từ ngày mua hàng.\nĐiều kiện áp dụng:\nKhách hàng mua sản phẩm Biti’s sẽ được bảo hành miễn phí đối với các trường hợp sau: Hở keo, dứt chỉ, gãy móc khoá, bung hoạ tiết trang trí (nơ, nút, hoa, …)', 16, 3, 2, 1, 'AVAILABLE', 1, 1),
	(2, '78269851', 'Sneaker Royal', 839000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'UNISEX', '2022-10-02 09:52:06', '2022-12-04 12:43:21', NULL, 3, 5, 2, 1, 'AVAILABLE', 1, 1),
	(3, '17766985', 'Nike Air Force 1', 700000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'UNISEX', '2022-10-03 23:24:22', '2022-12-23 11:09:29', '- Size: 36-43\n🖋Giày đầy đủ phụ kiện (hộp, giấy gói, giấy tờ, tất tặng kèm)  được đóng gói cẩn thận.\n🖋Chất liệu: da thật 100%, da nhăn mềm mại không bám bẩn rất dễ vệ sinh.\n🖋Đế: Đế đúc liền khối phần dưới có các đường họa tiết (chống trơn trượt) và in logo thương hiệu giày.\n🖋Form: Form dáng chuẩn 1:1 , được gia công tỉ mỉ tạo độ hài hòa giữa phần thân và phần đế\n🖋Giày hot trend, kiểu dáng đẹp sang chảnh dễ phối đồ có thể mang đi chơi, đi học dự tiệc , đi làm...', 8, 3, 1, 1, 'AVAILABLE', 1, 1),
	(4, '17290985', 'Sneaker Nữ', 700000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'FEMALE', '2022-10-05 10:24:30', '2022-12-23 11:26:11', 'Giày Thể Thao Nữ cá tính\nGiày đầy đủ phụ kiện (hộp, giấy gói, giấy tờ, tất tặng kèm) được đóng gói cẩn thận. 🖋Chất liệu: da thật 100%, da nhăn mềm mại không bám bẩn rất dễ vệ sinh. 🖋Đế: Đế đúc liền khối phần dưới có các đường họa tiết (chống trơn trượt) và in logo thương hiệu giày. 🖋Form: Form dáng chuẩn 1:1 , được gia công tỉ mỉ tạo độ hài hòa giữa phần thân và phần đế 🖋Giày hot trend, kiểu dáng đẹp sang chảnh dễ phối đồ có thể mang đi chơi, đi học dự tiệc , đi làm...', 1, 3, 1, 1, 'AVAILABLE', 1, 1),
	(5, '65467889', 'Jordan Dior', 1200000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'UNISEX', '2022-10-05 10:25:04', '2022-12-23 11:37:51', 'Giày Jordan 1 Low White Metallic Gold là một biến thể Jordan 1 low mới, được thiết kế để Nike cho ra mắt trong những ngày thị trường sneaker đang rất nhộn nhịp. Được chế tác từ da lộn chất lượng cao, cùng màu Vàng Gold khiến những đôi AJ1 này mang lại cảm giác sang trọng ngay lập tức khi on feet. \nThiết kế cổ điển như những đôi "Triple White" thông thường cặp cũng với điểm nhấn là Nike Swooshes màu vàng kim loại chạy dọc mỗi bên và các chi tiết mang tính biểu tượng như toe box đục lỗ cũng xuất hiện. Logo Jumpman được thêu trên lưỡi gà, trong khi logo đôi cánh của Thương hiệu Jordan được đặc trưng ở gót giày.', 12, 3, 1, 1, 'AVAILABLE', 1, 1),
	(6, '12354321', 'Giày Vans', 550000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'UNISEX', '2022-10-05 10:25:27', '2022-12-23 11:48:44', 'Giày Jordan 1 Low White Metallic Gold là một biến thể Jordan 1 low mới, được thiết kế để Nike cho ra mắt trong những ngày thị trường sneaker đang rất nhộn nhịp. Được chế tác từ da lộn chất lượng cao, cùng màu Vàng Gold khiến những đôi AJ1 này mang lại cảm giác sang trọng ngay lập tức khi on feet. Thiết kế cổ điển như những đôi "Triple White" thông thường cặp cũng với điểm nhấn là Nike Swooshes màu vàng kim loại chạy dọc mỗi bên và các chi tiết mang tính biểu tượng như toe box đục lỗ cũng xuất hiện. Logo Jumpman được thêu trên lưỡi gà, trong khi logo đôi cánh của Thương hiệu Jordan được đặc trưng ở gót giày.', 2, 3, 2, 1, 'AVAILABLE', 1, 1),
	(7, '78908654', 'Giày Alexander McQueen', 4000000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'UNISEX', '2022-10-05 10:25:46', '2022-12-23 11:59:38', 'Giày Alexander McQueenlà một biến thể mới, được thiết kế để Nike cho ra mắt trong những ngày thị trường sneaker đang rất nhộn nhịp. Được chế tác từ da lộn chất lượng cao, cùng màu Vàng Gold khiến những đôi AJ1 này mang lại cảm giác sang trọng ngay lập tức khi on feet. \nThiết kế cổ điển như những đôi "Triple White" thông thường cặp cũng với điểm nhấn là Nike Swooshes màu vàng kim loại chạy dọc mỗi bên và các chi tiết mang tính biểu tượng như toe box đục lỗ cũng xuất hiện. Logo Jumpman được thêu trên lưỡi gà, trong khi logo đôi cánh của Thương hiệu Jordan được đặc trưng ở gót giày.', 1, 3, 3, 2, 'AVAILABLE', 1, 1),
	(8, '34567897', 'YZ 700', 600000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'MALE', '2022-10-05 10:26:09', '2022-12-23 12:05:06', 'Giày Jordan 1 Low White Metallic Gold là một biến thể Jordan 1 low mới, được thiết kế để Nike cho ra mắt trong những ngày thị trường sneaker đang rất nhộn nhịp. Được chế tác từ da lộn chất lượng cao, cùng màu Vàng Gold khiến những đôi AJ1 này mang lại cảm giác sang trọng ngay lập tức khi on feet. \nThiết kế cổ điển như những đôi "Triple White" thông thường cặp cũng với điểm nhấn là Nike Swooshes màu vàng kim loại chạy dọc mỗi bên và các chi tiết mang tính biểu tượng như toe box đục lỗ cũng xuất hiện. Logo Jumpman được thêu trên lưỡi gà, trong khi logo đôi cánh của Thương hiệu Jordan được đặc trưng ở gót giày.', 1, 3, 2, 1, 'AVAILABLE', 1, 1),
	(9, '89087654', 'Sneaker cổ cao', 650000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'FEMALE', '2022-10-05 10:26:25', '2022-12-23 12:18:40', 'Giày Thể Thao Nữ Cao Cấp Phối Lưới Thoáng Khí Đế Nhựa Trong 2 Màu Trắng Hồng\n👉 Hàng Sẵn Kho, Mẫu mới hot hit\nĐộ lạ, rất hiếm đụng hàng các shop trên thị trường \nPhong cách tạo trẻ trung và sang trọng cho phái nữ \nSản phẩm sử dụng đa dạng kết hợp dùng đi chơi, đi làm, dùng cho các chị em, các mẹ, các bé, đồ đôi mẹ & bé, tuổi teen, đồ đồng phục, .... vv \n👉 Chiều cao gót: cao gót 5cm\nChất liệu đế: nhựa dẻo cao cấp \nMũi da lì phối thân nhựa dẻo cao cấp, chất dù dai phối lưới thoáng khí họa tiết đính đá long lanh tạo nên sự sang trọng đẳng cấp mà lại phong cách trẻ.\nSử dụng quanh năm \nChất liệu bên trong: Lót đệm phối lưới mềm mại rất êm chân', 1, 3, 2, 1, 'AVAILABLE', 1, 1),
	(10, '78643215', 'Nike AF1', 1000000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'FEMALE', '2022-10-05 10:26:47', '2022-12-23 13:37:05', 'Nike AF1', 3, 3, 3, 2, 'AVAILABLE', 1, 1),
	(11, '86643678', 'Sneaker Jordan', 400000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'UNISEX', '2022-10-05 10:27:04', '2022-12-23 13:31:31', 'Sneaker Jordan', 1, 3, 1, 4, 'AVAILABLE', 1, 1),
	(13, '74567364', 'MC Quen Auth', 650000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'UNISEX', '2022-10-05 23:44:32', '2022-12-23 13:33:02', 'MC Quen Auth', 1, 3, 3, 3, 'AVAILABLE', 1, 1),
	(14, '85746274', 'Giày Sandal', 750000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'FEMALE', '2022-10-05 23:50:02', '2022-12-23 13:34:57', 'Sandal 2023', 12, 5, 3, 1, 'AVAILABLE', 1, 1),
	(15, '84645487', 'Giày cao gót đế xuồng', 1200000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'FEMALE', '2022-10-05 23:54:23', '2022-12-23 13:20:43', 'fptpolytechic', 12, 4, 2, 2, 'AVAILABLE', 1, 1),
	(24, '45276478', 'Giày thể thao', 100000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'UNISEX', '2022-10-09 11:29:57', NULL, '', 1, 3, 1, 1, 'AVAILABLE', 1, NULL),
	(25, '56747678', 'giày abcc', 500000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'FEMALE', '2022-11-01 14:34:08', '2022-11-01 14:59:08', 'đây là mô tả', 3, 3, 2, 1, 'AVAILABLE', 1, 1),
	(26, '67845689', 'Nike', 500000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'UNISEX', '2022-12-10 14:28:18', '2022-12-10 15:29:38', 'Sản phẩm tốt', 8, 3, 2, 1, 'AVAILABLE', 1, 1),
	(27, '54765878', 'Nike123', 100000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'UNISEX', '2022-12-10 15:09:29', NULL, '', 8, 3, 1, 1, 'AVAILABLE', 1, NULL),
	(32, '65786598', 'dfdsfdfd', 1000000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'FEMALE', '2022-12-14 21:20:03', NULL, 'mô tả sản phẩm', 1, 3, 1, 1, 'AVAILABLE', 1, NULL),
	(33, '34567654', 'Boot', 1000000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'FEMALE', '2022-12-14 21:25:08', '2022-12-23 13:39:51', 'Mô tả sản phẩm', 1, 4, 1, 3, 'AVAILABLE', 1, 1),
	(34, '14828495', 'test', 200000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'FEMALE', '2022-12-20 07:56:01', NULL, 'Mô tả sản phẩm', 10, 3, 1, 3, 'AVAILABLE', 1, NULL),
	(35, '17269851', 'test 12345', 200000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'MALE', '2022-12-20 07:57:51', '2022-12-23 13:41:03', 'Mô tả sản phẩm', 11, 3, 1, 3, 'AVAILABLE', 1, 1),
	(36, '15215507', 'Boot', 200000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'FEMALE', '2022-12-21 08:04:02', '2022-12-23 13:41:21', 'Mô tả sản phẩm', 1, 3, 1, 3, 'AVAILABLE', 1, 1),
	(39, '15374283', 'rrrr', 200000, 'https://cf.shopee.vn/file/b739792b2d1d833fbd7f0a2ec6a692e4', 'MALE', '2022-12-21 08:04:02', '2022-12-23 13:41:21', 'Mô tả sản phẩm', 1, 3, 1, 3, 'AVAILABLE', 1, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.product_details: ~33 rows (approximately)
INSERT INTO `product_details` (`id`, `product_id`, `size_id`, `color_id`, `height_id`, `material_id`, `quantity`) VALUES
	(1, 1, 2, 1, 3, 2, 14),
	(2, 1, 3, 1, 4, 2, 20),
	(3, 2, 3, 4, 4, 1, 0),
	(4, 2, 4, 4, 4, 1, 7),
	(5, 3, 2, 2, 4, 2, 11),
	(6, 3, 1, 2, 5, 3, 21),
	(8, 1, 3, 3, 4, 2, 10),
	(11, 15, 3, 2, 5, 1, 10),
	(12, 15, 1, 6, 5, 1, 9),
	(13, 15, 2, 2, 1, 3, 9),
	(15, 4, 3, 4, 4, 2, 10),
	(36, 1, 2, 2, 3, 2, 20),
	(37, 24, 2, 1, 4, 2, 0),
	(38, 24, 3, 3, 4, 2, 22),
	(39, 25, 3, 7, 3, 2, 21),
	(40, 25, 2, 7, 3, 2, 18),
	(41, 26, 3, 8, 4, 6, 15),
	(42, 35, 2, 3, 4, 3, 20),
	(43, 35, 3, 2, 3, 4, 15),
	(44, 36, 3, 2, 5, 2, 15),
	(45, 36, 3, 4, 6, 2, 20),
	(47, 4, 2, 3, 5, 2, 3),
	(48, 6, 3, 2, 4, 1, 22),
	(49, 5, 4, 2, 4, 1, 33),
	(50, 7, 3, 1, 6, 3, 12),
	(51, 8, 2, 1, 4, 2, 22),
	(52, 11, 4, 6, 7, 1, 12),
	(53, 13, 5, 6, 6, 2, 23),
	(54, 14, 2, 4, 5, 1, 12),
	(55, 10, 6, 7, 8, 5, 78),
	(56, 39, 3, 2, 4, 3, 32),
	(57, 39, 4, 3, 4, 3, 30),
	(58, 39, 5, 6, 6, 3, 99);

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.promotions: ~0 rows (approximately)

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.promotion_categories: ~0 rows (approximately)

-- Dumping structure for table datn.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.roles: ~2 rows (approximately)
INSERT INTO `roles` (`id`, `name`) VALUES
	(1, 'ADMIN'),
	(2, 'USER');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.sizes: ~7 rows (approximately)
INSERT INTO `sizes` (`id`, `name`) VALUES
	(1, '35'),
	(2, '36'),
	(3, '37'),
	(4, '38'),
	(5, '39'),
	(6, '40'),
	(7, '41');

-- Dumping structure for table datn.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `ward` varchar(255) DEFAULT NULL,
  `province_id` varchar(255) NOT NULL,
  `ward_code` varchar(255) DEFAULT NULL,
  `district_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.users: ~3 rows (approximately)
INSERT INTO `users` (`id`, `username`, `fullname`, `email`, `password`, `phone`, `address`, `status`, `avatar`, `province`, `district`, `ward`, `province_id`, `ward_code`, `district_id`) VALUES
	(1, 'thuylv', 'Lê Văn Thuỷ', 'thuylv@gmail.com', '$2a$10$ZKnu4mb9erOxn3LJBg4lkODL8POItZQFHf.5TLu2h5y/KJhZjln4q', '0705925361', 'Hà Nội', 'ACTIVE', NULL, 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Xuân Phương', '201', '13010', '3440'),
	(2, 'nghiatm', 'Trần Minh Nghĩa', 'nghiatm@gmail.com', '$2a$12$Jxa.32bExx8hXWRpi4hte.0cA2cF4Cj1.oM4IdObxmKkpIiojoGHG', '0393883934', '4a', 'BLOCKED', NULL, 'Hà Nội', 'Quận Nam Từ Liêm', 'Phường Mễ Trì', '201', '907557', '3440'),
	(3, 'trangtq', 'Tạ Quỳnh Trang', 'trangtq@gmail.com', '$2a$10$L9so50cGDMrWi21CmPhtoes5PyEp7BsOPJD7yDnD7xx7C4/PJ6qpe', '0962987225', 'số 123', 'BLOCKED', NULL, 'Hưng Yên', 'Huyện Văn Lâm', 'Xã Tân Quang', '268', '220909', '2046');

-- Dumping structure for table datn.user_roles
CREATE TABLE IF NOT EXISTS `user_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.user_roles: ~0 rows (approximately)
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`) VALUES
	(1, 1, 1),
	(2, 2, 2),
	(3, 3, 2);

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

-- Dumping data for table datn.vouchers: ~0 rows (approximately)
INSERT INTO `vouchers` (`id`, `name`, `code_voucher`, `min_money`, `begin_date`, `end_date`, `promotion`, `quantity`, `create_by`, `update_by`, `status`, `is_delete`) VALUES
	(1, '', 'F3CFY01CA', 50000, '2022-11-10 00:00:00', '2022-11-15 00:00:00', 10000, 20, 1, NULL, 'AVAILABLE', 0),
	(2, '', 'YFGI0S012', 50000, '2022-11-10 00:00:00', '2022-11-16 00:00:00', 20000, 20, 1, 1, 'AVAILABLE', 1),
	(3, '', 'Q26DHHZVR', 500000, '2022-12-20 00:00:00', '2022-12-22 00:00:00', 100000, 20, 1, 1, 'AVAILABLE', 0),
	(4, 'khuyến mãi', 'K7KPQKG18', 500000, '2022-12-21 00:00:00', '2022-12-31 00:00:00', 200000, 20, 1, NULL, 'UNAVAILABLE', 0),
	(5, 'Khuyến mãi 1', 'G5YI3A528', 500000, '2022-12-22 00:00:00', '2022-12-31 00:00:00', 20000, 20, 1, NULL, 'AVAILABLE', 0),
	(6, 'test', 'KXFVBXBWV', 11111, '2022-12-22 00:00:00', '2022-12-23 00:00:00', 11111, 11, 1, 1, 'UNAVAILABLE', 1),
	(7, 'fpoly1', '60DONQKHY', 500000, '2022-12-23 00:00:00', '2022-12-20 00:00:00', 20000, 10, 1, 1, 'UNAVAILABLE', 0);

-- Dumping structure for table datn.weight
CREATE TABLE IF NOT EXISTS `weight` (
  `id` int NOT NULL AUTO_INCREMENT,
  `weight` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datn.weight: ~0 rows (approximately)
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
