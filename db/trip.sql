/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2016/5/20 16:46:32                           */
/*==============================================================*/


drop table if exists admin;

drop table if exists news;

drop table if exists message;

create database trip default character set utf8 collate utf8_general_ci;

/*==============================================================*/
/* Table: admin                                                 */
/*==============================================================*/
create table admin
(
   aid                  int not null auto_increment,
   aname                varchar(50),
   email                varchar(50),
   password             varchar(50),
   addtime              datetime,
   issuper              int,
   primary key (aid)
)default charset=utf8;

/*==============================================================*/
/* Table: news                                                  */
/*==============================================================*/
create table news
(
   nid                  int not null auto_increment,
   ntitle               varchar(100),
   content              varchar(200),
   addtime              datetime,
   email                varchar(50),
   nname                varchar(100),
   primary key (nid)
)default charset=utf8;

/*==============================================================*/
/* Table: message                                                    */
/*==============================================================*/
create table message
(
   mid                  int not null auto_increment,
   mcontent             text,
   time                 datetime,
   peoples              varchar(20),
   primary key (mid)
)default charset=utf8;

