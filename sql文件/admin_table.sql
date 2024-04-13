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

 Date: 01/11/2022 19:20:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_table
-- ----------------------------
DROP TABLE IF EXISTS `admin_table`;
CREATE TABLE `admin_table`  (
  `id` int NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '登录名',
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `roleId` int NOT NULL,
  `roleState` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_table
-- ----------------------------
INSERT INTO `admin_table` VALUES (1, 'admin123', 'admin123', 3, 1);

-- ----------------------------
-- Table structure for application_table
-- ----------------------------
DROP TABLE IF EXISTS `application_table`;
CREATE TABLE `application_table`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `positionId` int NOT NULL,
  `positionName` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `companyId` int NOT NULL,
  `companyName` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `userId` int NOT NULL,
  `userName` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `resumeId` int NOT NULL,
  `applyState` int NOT NULL COMMENT '0:\'收到简历\', 1:\'已邀请面试\', 2:\'简历已拒绝\', 3:\'面试中\', 4:\'求职者拒绝面试邀请\', 5:\'面试已通过\', 6:\'面试未通过\', 7:\'所应聘职位已下线\'',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of application_table
-- ----------------------------
INSERT INTO `application_table` VALUES (1, 1, '中级前端工程师', 1, '亚马逊', 1, '佐藤', 1, 1);
INSERT INTO `application_table` VALUES (2, 2, '高级前端工程师', 2, '乐天', 1, '佐藤', 1, 2);
INSERT INTO `application_table` VALUES (3, 2, 'Java开发工程师', 1, '亚马逊', 2, '小野', 2, 3);
INSERT INTO `application_table` VALUES (4, 4, 'C++开发工程师', 2, '乐天', 2, '小野', 2, 3);
INSERT INTO `application_table` VALUES (5, 4, 'C++开发工程师', 2, '乐天', 1, '佐藤', 1, 0);
INSERT INTO `application_table` VALUES (26, 3, 'Java开发工程师', 1, '亚马逊', 2, '小野', 2, 1);

-- ----------------------------
-- Table structure for company_table
-- ----------------------------
DROP TABLE IF EXISTS `company_table`;
CREATE TABLE `company_table`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `roleId` int NOT NULL,
  `roleState` tinyint(1) NULL DEFAULT 1 COMMENT '有效状态',
  `companyName` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `introduction` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '公司介绍',
  `position` json NULL,
  `avatar` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '头像',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of company_table
-- ----------------------------
INSERT INTO `company_table` VALUES (1, 'amazon', 'Qwer4321', 2, 1, '亚马逊', NULL, '[1, 2]', NULL);
INSERT INTO `company_table` VALUES (2, 'rakuten', 'Qwer4321', 2, 0, '乐天', NULL, '[3, 4]', NULL);
INSERT INTO `company_table` VALUES (3, 'google@google.com', 'Qwer4321', 2, 1, '谷歌', '\"\"', '\"\"', '\"\"');
INSERT INTO `company_table` VALUES (11, 'apple@apple.com', 'Qwer4321', 2, 1, '苹果', '\"\"', '\"\"', '\"\"');
INSERT INTO `company_table` VALUES (12, '12345@qq.com', 'Qwer4321', 2, 1, '123', '\"\"', '\"\"', '\"\"');

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

-- ----------------------------
-- Table structure for position_table
-- ----------------------------
DROP TABLE IF EXISTS `position_table`;
CREATE TABLE `position_table`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `positionName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `companyId` int NOT NULL,
  `companyName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `city` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `jobCategory` json NOT NULL,
  `year` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `minSalary` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `maxSalary` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `education` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `postDate` date NOT NULL,
  `positionState` int NOT NULL COMMENT '0:\'待审核\', 1:\'有效\', 2:\'审核未通过\', 3:\'已下线\'',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of position_table
-- ----------------------------
INSERT INTO `position_table` VALUES (1, '中级前端工程师', 1, '亚马逊', '大阪。。。', '[\"前端开发\", \"Flash开发\"]', '3到5年', '10000', '20000', '大专及以上', '<p><span style=\"color: rgba(0,0,0,0.85);background-color: rgb(255,255,255);font-size: 14px;\"><strong>1.负责公司软件系统的前端构建，各类交互设计与实现，通用组件的开发，持续更新完善公司前端开发框架；2、负责配合UI设计师实现业务需求，持续优化页面性能，提升用户体验；3、协同后台开发人员定义数据接口，共同完成项目；4、熟悉前端主流框架Angular、Vue2和3，有实际项目经验，了解其核心功能的实现原理；5、熟悉面向组件的开发模式，熟悉webpack等构建工具；7、有Grafana、Highcharts、Echarts数据可视化图表库使用经验；</strong></span></p>\n<p></p>\n<p><span style=\"color: rgba(0,0,0,0.85);background-color: rgb(255,255,255);font-size: 14px;\"><em>1.负责公司软件系统的前端构建，各类交互设计与实现，通用组件的开发，持续更新完善公司前端开发框架；2、负责配合UI设计师实现业务需求，持续优化页面性能，提升用户体验；3、协同后台开发人员定义数据接口，共同完成项目；4、熟悉前端主流框架Angular、Vue2和3，有实际项目经验，了解其核心功能的实现原理；5、熟悉面向组件的开发模式，熟悉webpack等构建工具；7、有Grafana、Highcharts、Echarts数据可视化图表库使用经验；1.负责公司软件系统的前端构建，各类交互设计与实现，通用组件的开发，持续更新完善公司前端开发框架；2、负责配合UI设计师实现业务需求，持续优化页面性能，提升用户体验；</em></span></p>\n<p></p>\n<p><span style=\"color: rgba(0,0,0,0.85);background-color: rgb(255,255,255);font-size: 14px;\">3、协同后台开发人员定义数据接口，共同完成项目；4、熟悉前端主流框架Angular、Vue2和3，有实际项目经验，了解其核心功能的实现原理；5、熟悉面向组件的开发模式，熟悉webpack等构建工具；7、有Grafana、Highcharts、Echarts数据可视化图表库使用经验；1.负责公司软件系统的前端构建，各类交互设计与实现，通用组件的开发，持续更新完善公司前端开发框架；2、负责配合UI设计师实现业务需求，持续优化页面性能，提升用户体验；3、协同后台开发人员定义数据接口，共同完成项目；4、熟悉前端主流框架Angular、Vue2和3，有实际项目经验，了解其核心功能的实现原理；5、熟悉面向组件的开发模式，熟悉webpack等构建工具；7、有Grafana、Highcharts、Echarts数据可视化图表库使用经验；</span>&nbsp;</p>\n', '2022-10-21', 1);
INSERT INTO `position_table` VALUES (2, '高级前端工程师', 2, '乐天', '东京', '[\"前端开发\", \"Web前端\"]', '5年以上', '30000', '40000', '本科及以上', '<p>2、负责公司前端产品的功能开发；3、负责前端前沿技术的调研和跟进，包括但不限于框架、组件等；4、负责前端性能和体验优化，提升前端研发效率5、持续关注新技术，引入并优化前端的质量、性能、用户体验6、上级安排的其他工作</p>\r\n', '2022-10-23', 1);
INSERT INTO `position_table` VALUES (3, 'Java开发工程师', 1, '亚马逊', '东京', '[\"后端开发\", \"Java开发\"]', '1到3年', '10000', '20000', '研究生', '1.五年及以上JAVA开发经验，五个以上完整的开发项目经验2.精通Java基础技术，并熟悉restful架构，理解前后端分离的开发模式；3.精通Springboot，Springcloud,Spring MVC, MyBatis等框架及整合；4.熟悉Oracle、MySQL、PostgreSQL，有良好的数据库设计和调优能力，能熟练使用Redis或memcached等缓存组件5.熟练使用maven、git、jenkins等项目管理、代码管理、自动化部署工具6.熟悉多线程技术、缓存技术、消息队列技术等；7.熟悉Linux操作系统并能配置Web环境，熟悉服务器集群和性能调优，熟悉docker，k8s者优先；8.有ios/android移动设备网页开发、微信开放平台开发经验者优先；9.工作态度认真积极，沟通能力良好，喜欢专研技术；10.计算机及相关专业全日制大专以上学历。11.注重团队协作，具备良好的学习能力、沟通能力、解决问题能力，能够承担较大工作压力。', '2022-09-08', 1);
INSERT INTO `position_table` VALUES (4, 'C++开发工程师', 2, '乐天', '群马', '[\"后端开发\", \"C++开发\"]', '不限', '30000', '40000', '本科及以上', '1.负责公司软件系统的前端构建，各类交互设计与实现', '2022-10-02', 1);
INSERT INTO `position_table` VALUES (5, 'java开发', 2, '乐天', '福冈', '[\"后端开发\", \"Java开发\"]', '5年以上', '30000', '40000', '研究生及以上', '<p>test</p>\r\n', '2022-10-08', 0);
INSERT INTO `position_table` VALUES (6, 'java开发', 1, '亚马逊', '福冈', '[\"后端开发\", \"Java开发\"]', '5年以上', '30000', '40000', '研究生及以上', '<p>test</p>\r\n', '2022-10-08', 0);

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

-- ----------------------------
-- Table structure for right_table
-- ----------------------------
DROP TABLE IF EXISTS `right_table`;
CREATE TABLE `right_table`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `pagepermission` tinyint(1) NULL DEFAULT 1,
  `grade` int NOT NULL DEFAULT 1,
  `father_right_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of right_table
-- ----------------------------
INSERT INTO `right_table` VALUES (1, '求职首页', '/home', 1, 1, NULL);
INSERT INTO `right_table` VALUES (2, '个人简历', '/profile', 1, 1, NULL);
INSERT INTO `right_table` VALUES (3, '简历编辑', '/profile/edit', 1, 2, 2);
INSERT INTO `right_table` VALUES (4, '我的投递', '/applylist', 1, 1, NULL);
INSERT INTO `right_table` VALUES (5, '职位管理', '/position_manage', 1, 1, NULL);
INSERT INTO `right_table` VALUES (6, '新建职位', '/position_manage/add', 1, 2, 5);
INSERT INTO `right_table` VALUES (7, '职位列表', '/position_manage/list', 1, 2, 5);
INSERT INTO `right_table` VALUES (8, '公司信息', '/company_info', 1, 1, NULL);
INSERT INTO `right_table` VALUES (9, '求职者管理', '/user_manage', 1, 1, NULL);
INSERT INTO `right_table` VALUES (10, 'hr管理', '/hr_manage', 1, 1, NULL);
INSERT INTO `right_table` VALUES (11, 'hr审核', '/hr_manage/audit', 1, 2, 10);
INSERT INTO `right_table` VALUES (12, 'hr列表', '/hr_manage/list', 1, 2, 10);
INSERT INTO `right_table` VALUES (13, '全站职位管理', '/admin_position_manage', 1, 1, NULL);
INSERT INTO `right_table` VALUES (14, '职位审核', '/admin_position_manage/audit', 1, 2, 13);
INSERT INTO `right_table` VALUES (15, '职位列表', '/admin_position_manage/list', 1, 2, 13);
INSERT INTO `right_table` VALUES (16, '职位分类', '/position_category', 1, 2, 13);

-- ----------------------------
-- Table structure for role_table
-- ----------------------------
DROP TABLE IF EXISTS `role_table`;
CREATE TABLE `role_table`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `roleType` int NOT NULL,
  `rights` json NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_table
-- ----------------------------
INSERT INTO `role_table` VALUES (1, '求职者', 1, '[\"/profile\", \"/profile/edit\", \"/applylist\"]');
INSERT INTO `role_table` VALUES (2, 'hr', 2, '[\"/position_manage\", \"/position_add\", \"/position_edit\", \"/company_info\"]');
INSERT INTO `role_table` VALUES (3, 'admin', 3, '[\"/hr_manage\", \"/hr_manage/audit\", \"/hr_manage/list\", \"/user_manage\", \"/admin_position_manage\", \"/admin_position_manage/audit\", \"/admin_position_manage/list\", \"/position_category\"]');

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
