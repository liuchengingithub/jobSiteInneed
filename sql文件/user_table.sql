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

 Date: 01/11/2022 19:23:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_table
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '登录名',
  `password` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '真实姓名',
  `roleId` int NOT NULL,
  `roleState` tinyint(1) NULL DEFAULT 1 COMMENT '1:有效，0:无效',
  `gender` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `phoneNumber` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `wantJob` json NULL,
  `resumeId` int NULL DEFAULT NULL,
  `applications` json NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_table
-- ----------------------------
INSERT INTO `user_table` VALUES (1, 'satou', 'Qwer4321', '佐藤', 1, 1, '男', '18650001234', 'satou@gmail.com', '[\"Web前端\"]', 1, '[1, 2, 4]');
INSERT INTO `user_table` VALUES (2, 'ono', 'Qwer4321', '小野', 1, 1, '女', '15067890000', 'ono@gmail.com', '[\"Java开发\"]', 2, '[2, 4, 3]');
INSERT INTO `user_table` VALUES (3, 'nakamura', 'Qwer4321', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user_table` VALUES (6, 'murakami@yahoo.com', 'Qwer4321', '', 1, 1, '女', NULL, NULL, NULL, NULL, '\"\"');
INSERT INTO `user_table` VALUES (40, 'ringo@yahoo.com', 'Qwer4321', '林檎', 1, 1, NULL, NULL, NULL, NULL, NULL, '\"\"');
INSERT INTO `user_table` VALUES (41, '12345@qq.com', 'Qwer4321', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, '\"\"');

SET FOREIGN_KEY_CHECKS = 1;
