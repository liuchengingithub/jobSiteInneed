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

 Date: 01/11/2022 19:23:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for resume_table
-- ----------------------------
DROP TABLE IF EXISTS `resume_table`;
CREATE TABLE `resume_table`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `birthDate` date NOT NULL,
  `gender` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phoneNumber` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `city` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `experience` json NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of resume_table
-- ----------------------------
INSERT INTO `resume_table` VALUES (1, 1, '佐藤荣作', '1996-02-29', '男', '18650001234', 'satou@gmail.com', '福冈', '[{\"id\": \"OwCFaxAU7RqRxnxp90sp7\", \"time\": [\"2023-01-20T11:59:57.950Z\", \"2023-12-20T11:59:57.950Z\"], \"company\": \"东芝\", \"position\": \"技术总监\", \"description\": \"。。\"}, {\"id\": \"1\", \"time\": [\"2020-01-04T13:15:37.594Z\", \"2020-12-04T13:15:37.594Z\"], \"company\": \"LINE\", \"position\": \"高级前端工程师\", \"description\": \"1.负责公司软件系统的前端构建，各类交互设计与实现，通用组件的开发，持续更新完善公司前端开发框架；2、负责配合UI设计师实现业务需求，持续优化页面性能，提升用户体验；3、协同后台开发人员定义数据接口，共同完成项目；\"}, {\"id\": \"2\", \"time\": [\"2019-04-04T13:15:37.594Z\", \"2019-06-04T13:15:37.594Z\"], \"company\": \"Google\", \"position\": \"前端工程师\", \"description\": \"做了一点微小的工作\"}]');
INSERT INTO `resume_table` VALUES (2, 2, '小野绿', '1992-02-29', '男', '15067890000', 'ono@gmail.com', '京都', '[{\"id\": \"doRGroz_oaCdgZCo2cUyq\", \"time\": [\"2022-01-23T12:56:54.667Z\", \"2022-03-23T12:56:54.667Z\"], \"company\": \"蘋果\", \"position\": \"程序員\", \"description\": \"。。。\"}, {\"id\": \"9LEGo46v4IPJDMsULKNd8\", \"time\": [\"2022-01-21T11:04:42.300Z\", \"2022-03-21T11:04:42.300Z\"], \"company\": \"123\", \"position\": \"123\", \"description\": \"。。。\"}]');
INSERT INTO `resume_table` VALUES (29, 3, '中村', '2022-01-20', '男', '18650001234', '2304497447@qq.com', '东京都', '[]');

SET FOREIGN_KEY_CHECKS = 1;
