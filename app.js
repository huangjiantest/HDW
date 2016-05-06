var express = require("express");//创建服务器需要的模块
var session = require("express-session");//缓存数据需要的模块
var bodyParser = require('body-parser');//post方式要用的模块
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
app.post("/login",function(req,res){//post方式接收浏览器信息
	setTimeout(function(){
		if(req.body.username == "admin@yuanku.org" && req.body.password == "123"){
			req.session.islogin = true;
			res.json({code:1,message:"登录成功！"}).end();
		}else{
			res.json({code:0,message:"用户名或密码错误！"}).end();
		}
	},2000);
});

app.get("/login",function(req,res){//get方式接收浏览器信息
	if(req.query.username == "admin@yuanku.org" && req.query.password == "123"){
		res.json({code:1,message:"登录成功！"}).end();
	}else{
		res.json({code:0,message:"用户名或密码错误！"}).end();
	}
});

-

app.use(express.static("public"));//托管静态页面
app.use(function(req,res,next){//错误处理
	if(req.xhr){
		res.status(404).end();
	}else{
		res.status(404).redirect("/404.html");
	}
});
app.listen(80);
console.log("服务器开启");