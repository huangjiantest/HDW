var loginrouter = express.Router();
loginrouter.all("/login",loginControl.login);//调用控制器的login函数
loginrouter.all("/logout",loginControl.logout);//调用控制器的logout函数
module.exports = loginrouter;//输出路由

//express() 表示创建express应用程序
//exports 表示模块的导出对象，用于导出模块的属性和公共方法
//exports.functionName = function() 和   module.exports = function()