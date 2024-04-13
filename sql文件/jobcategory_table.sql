/*
 Navicat MySQL Data Transfer

 Source Server         : demo
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : inneed

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 01/11/2022 19:21:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for jobcategory_table
-- ----------------------------
DROP TABLE IF EXISTS `jobcategory_table`;
CREATE TABLE `jobcategory_table`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `grade` int NOT NULL DEFAULT 1,
  `fatherCategoryId` int NULL DEFAULT NULL,
  `categoryState` tinyint(1) NULL DEFAULT 1 COMMENT '1为有效，0为无效',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jobcategory_table
-- ----------------------------
INSERT INTO `jobcategory_table` VALUES (1, '后端开发', 1, NULL, 1);
INSERT INTO `jobcategory_table` VALUES (2, 'Java开发', 2, 1, 0);
INSERT INTO `jobcategory_table` VALUES (3, 'C++开发', 2, 1, 1);
INSERT INTO `jobcategory_table` VALUES (4, '前端开发', 1, NULL, 1);
INSERT INTO `jobcategory_table` VALUES (5, 'Web前端', 2, 4, 1);
INSERT INTO `jobcategory_table` VALUES (6, 'Flash开发', 2, 4, 1);
INSERT INTO `jobcategory_table` VALUES (19, '测试', 1, NULL, 1);
INSERT INTO `jobcategory_table` VALUES (20, '测试工程师', 2, 19, 1);
INSERT INTO `jobcategory_table` VALUES (21, '软件测试', 2, 19, 1);
INSERT INTO `jobcategory_table` VALUES (22, '自动化测试', 2, 19, 1);
INSERT INTO `jobcategory_table` VALUES (23, '移动开发', 1, NULL, 1);
INSERT INTO `jobcategory_table` VALUES (24, 'iOS', 2, 23, 1);
INSERT INTO `jobcategory_table` VALUES (25, 'Android', 2, 23, 1);
INSERT INTO `jobcategory_table` VALUES (36, '运维', 1, NULL, 1);
INSERT INTO `jobcategory_table` VALUES (37, '运维工程师', 2, 36, 1);
INSERT INTO `jobcategory_table` VALUES (38, 'IT技术支持', 2, 36, 0);
INSERT INTO `jobcategory_table` VALUES (50, 'Web前端s', 2, 4, 1);
INSERT INTO `jobcategory_table` VALUES (51, 'Flash开发', 2, 4, 1);
INSERT INTO `jobcategory_table` VALUES (55, '网络工程师', 2, 36, 1);

SET FOREIGN_KEY_CHECKS = 1;
