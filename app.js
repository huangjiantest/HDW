//全局路径
global.rootpath = __dirname;
global.fs = require("fs");

//引入第三方模块
var ejs = require("ejs");
var session = require("express-session");//缓存数据需要的模块
var bodyParser = require('body-parser');//post方式要用的模块
var log4js = require("log4js");
var multer  = require('multer');
global.upload = multer({ dest: 'temps/' });
log4js.configure("./config/log4j.json");
global.express = require("express");//创建服务器需要的模块
global.mysql = require("mysql");//创建数据库需要的模块
global.EventProxy = require('eventproxy');
global.log = log4js.getLogger("logInfo");

//引入自定义包
global.util = require("./util/util.js");
global.config = util.loadConfig(); //加载配置文件
//加载模型
global.dataSource = require("./module/dataSource.js")();
global.loginModule = require("./module/loginModule.js")();
global.adminModule = require("./module/adminModule.js")();
//加载控制器
global.loginControl = require("./control/loginControl.js")();
global.adminIndexControl = require("./control/adminIndexControl.js")();
global.typeControl = require("./control/typeControl.js")();
global.proControl = require("./control/proControl.js")();
//加载路由
global.loginRouter = require("./router/loginRouter.js");
global.adminRouter = require("./router/adminRouter.js");

//创建服务器
var app = express();
//配置body解析
app.use(bodyParser.urlencoded({ extended:true }));
//设置session
app.use(session({
	secret : "#$%^",//加密
	resave : false,
	saveUninitialized : true,//在没有session自动初始化一个session
	rolling : true,//每次访问都在当前的时候点加15分钟
	cookie : {maxAge : 1000 * 60 * 15}
}));

//模块引擎设置
app.set("views","./views");
app.set('view engine', 'html');
app.engine('.html', ejs.__express);
ejs.delimiter = "$";//在html页面用$符号表示

//登录路由
app.use("/login",loginRouter);
app.use("/admin",util.checkLogin,adminRouter);//进入admin目录验证是否登录

app.use(express.static("public"));//托管静态页面
app.use(function(req,res,next){//错误处理
	if(req.xhr){
		res.status(404).end();
	}else{
		res.status(404).redirect("/404.html");
	}
});
app.use(function(err, req, res, next) {
  console.error(err.stack);
  log.error(err.stack);
  if(req.xhr) {
	res.status(500).end();
  } else {
	res.status(500).redirect("/500.html");
  }
  //设置错误守护
  process.on("uncaughtException",function(err){
  	console.error(err.stack);
  	log.error(err.stack);
  });
});
app.listen(80,function(){
	console.log("服务器已开启");
});