//全局路径 和 系统模块
global.rootpath = __dirname;
global.fs = require("fs");

//引入第三方包
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');
global.express = require('express');
global.mysql = require('mysql');
global.EventProxy = require('eventproxy');
var log4js = require('log4js');   //日志
log4js.configure("config/log4j.json");
global.log = log4js.getLogger("logInfo");
var multer  = require('multer');
global.upload = multer({ dest: 'temps/' });

//引入自定义包
global.util = require("./util/util.js");
global.config = util.loadConfig(); //加载配置文件

//加载模型
global.dataSource = require("./module/dataSource.js")();
global.loginModule = require("./module/loginModule.js")();
global.adminModule = require("./module/adminModule.js")();
global.newsModule = require("./module/newsModule.js")();

//加载控制器
global.loginControl = require("./control/loginControl.js")();   //注意顺序问题  最底层先调用
global.adminIndexControl = require("./control/adminIndexControl.js")(); 
global.newsControl = require("./control/newsControl.js")();

//加载路由
global.loginRouter = require("./router/loginRouter.js");
global.adminRouter = require("./router/adminRouter.js");

//创建服务器
var app = express();

//配置body解析
app.use(bodyParser.urlencoded({ extended: true }));  //body解析中间件

// 设置session
app.use(session({   //session解析中间件
  secret: '^_^',   //加密
  resave: false,
  saveUninitialized: true,  //在没有session时初始化一个session
  rolling: true,  //每次访问都在当前时间点加上cookie的存活时间
  cookie: { maxAge : 1000*60*30 }  //cookie的存活时间
}));

//设置express的模板引擎
app.set("views","./views");
app.set('view engine', 'html');
app.engine('.html', ejs.__express);
ejs.delimiter = "$";   //改变后台渲染的符号

//登录路由
app.use("admin/favicon.ico",util.favicon);
app.use("/login",loginRouter);
app.use("/admin",util.checkLogin,adminRouter);  //进人admin要验证是否登录

//配置静态服务器
app.use(express.static('public'));  //托管静态页面

//配置404错误   404并非是一个错误  使用中间件来处理
app.use(function( req,res,next ){
	if( req.xhr ){   //判断是不是ajax请求
		res.status(404).end();
	}else{
		res.status(404).redirect('/404.html');
	}
});
//500服务器错误
app.use(function(err,req,res,next) {
  console.error(err.stack);
  log.error(err.stack);
  if( req.xhr ) {
		res.status(500).end();
	} else {
		res.status(500).redirect("/500.html");
	}
});

//设置错误守护
process.on("uncaughtException",function( err ){
	log.error(err.stack);
	console.error(err.stack);
});

app.listen(80,function(){
	console.log("服务器已开启");
});