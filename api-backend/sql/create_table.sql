# 数据库初始化
# @author <a href="https://github.com/liyupi">程序员鱼皮</a>
# @from <a href="https://yupi.icu">编程导航知识星球</a>

-- 创建库
create database if not exists api;

-- 切换库
use api;
-- 用户表
create table if not exists user
(
    id           bigint auto_increment comment 'id' primary key,
    userName     varchar(256)                           null comment 'Account Name',
    userAccount  varchar(256)                           not null comment 'Account',
    userAvatar   varchar(1024)                          null comment 'Account Avatar',
    gender       tinyint                                null comment 'Gender',
    userRole     varchar(256) default 'user'            not null comment 'Role：user / admin',
    userPassword varchar(512)                           not null comment 'Password',
    `accessKey` varchar(512) not null comment 'accessKey',
    `secretKey` varchar(512) not null comment 'secretKey',
    createTime   datetime     default CURRENT_TIMESTAMP not null comment 'Creation time',
    updateTime   datetime     default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment 'Update time',
    isDelete     tinyint      default 0                 not null comment 'delete or not',
    constraint uni_userAccount
    unique (userAccount)
    ) comment 'User';

-- 接口信息
create table if not exists api.`interface_info`
(
    `id` bigint not null auto_increment comment 'primary key' primary key,
    `name` varchar(256) not null comment 'name',
    `description` varchar(256) null comment 'description',
    `url` varchar(512) not null comment 'url',
    `requestParams` text not null comment 'requestParams',
    `requestHeader` text null comment 'requestHeader',
    `responseHeader` text null comment 'responseHeader',
    `status` int default 0 not null comment 'status（0-close，1-open）',
    `method` varchar(256) not null comment 'method',
    `userId` bigint not null comment 'userId',
    `createTime` datetime default CURRENT_TIMESTAMP not null comment 'createTime',
    `updateTime` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment 'updateTime',
    `isDelete` tinyint default 0 not null comment 'delete or not(0-未删, 1-已删)'
    ) comment '接口信息';

-- 用户调用接口关系表
create table if not exists api.`user_interface_info`
(
    `id` bigint not null auto_increment comment '主键' primary key,
    `userId` bigint not null comment 'userId id',
    `interfaceInfoId` bigint not null comment 'interfaceInfoId id',
    `totalNum` int default 0 not null comment 'total calls',
    `leftNum` int default 0 not null comment 'Number of calls remaining',
    `status` int default 0 not null comment '0-normal，1-banned',
    `createTime` datetime default CURRENT_TIMESTAMP not null comment 'createTime',
    `updateTime` datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment 'updateTime',
    `isDelete` tinyint default 0 not null comment 'delete or not(0-未删, 1-已删)'
) comment '用户调用接口关系';

insert into api.`interface_info` (`name`, `description`, `url`,`requestParams`, `requestHeader`, `responseHeader`, `status`, `method`, `userId`) values ('许擎宇', '薛聪健', 'www.cary-king.net','string', '潘博涛', '谭聪健', 0, '石炫明', 9500534531);