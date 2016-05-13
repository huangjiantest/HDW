var adminIndexControl = function(){};
adminIndexControl.prototype.index = function(req,res,next){
	//从数据库取数据
	//找到模版,渲染页面输出
	res.render("adminIndex.html",{user:req.session.admin});
}

//显示管理员列表
adminIndexControl.prototype.adminList = function(req,res,next){
	var ep = new EventProxy();
	dataSource.getConn(ep);//把ep传入dataSource对象的getConn属性
	adminModule.adminList(ep);//把ep传入adminModule对象的adminList属性
	ep.on("success",function(data){//如果success函数成功，就执行后面函数
		res.json(data);//把数据传到前端
		//res.render("admin/adminList.html",{admins:data});
	});
	ep.fail(function( err ){
		next(err);
	});
}

//增加管理员
adminIndexControl.prototype.adminAdd = function(req,res,next){
	console.log();
	var ep = new EventProxy();
	dataSource.getConn(ep);//把ep传入dataSource对象的getConn属性
	//传参数到adminModule原型的adminAdd函数
	adminModule.adminAdd(ep,[req.body.aname,req.body.email,req.body.password]);
	ep.on("success",function(data){//如果success函数成功，就执行后面函数
		if(data.insertId){//如果传入数据都合法
			res.json(config.info.suc).end();//就执行成功函数
		}else{
			res.json(config.error.adminAddErr).end();
		}
	});
	ep.fail(function( err ){
		next(err);
	});
}

//删除管理员
adminIndexControl.prototype.adminDel = function(req,res,next){
	var ep = new EventProxy();
	dataSource.getConn(ep);//把ep传入dataSource对象的getConn属性
	adminModule.adminDel(ep,[req.params.id]);
	ep.on("success",function(data){//如果success函数成功，就执行后面函数
		res.json(config.info.suc).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}

module.exports = function() {
	return new adminIndexControl();
}