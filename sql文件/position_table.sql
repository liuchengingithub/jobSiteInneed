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

 Date: 01/11/2022 19:22:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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

SET FOREIGN_KEY_CHECKS = 1;
