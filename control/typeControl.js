var typeControl = function(){};
//显示商品分类列表
typeControl.prototype.typeList = function(req,res,next){
	var ep = new EventProxy();
	dataSource.getConn(ep);
	if(req.params.pid){
		adminModule.typeList(ep,[req.params.pid]);
	}else{
		adminModule.typeList(ep);
	}
	ep.on("success",function(data){
		res.json(data).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}

//增加商品分类
typeControl.prototype.typeAdd = function(req,res,next){
	console.log();
	var ep = new EventProxy();
	dataSource.getConn(ep);
	adminModule.typeAdd(ep,[req.body.typename,req.body.typeinfo,req.body.pid]);
	ep.on("success",function(data){
		if(data.insertId){
			res.json(config.info.suc).end();
		}else{
			res.json(config.error.typeAddErr).end();
		}
	});
	ep.fail(function( err ){
		next(err);
	});
}

//删除商品分类
typeControl.prototype.typeDel = function(req,res,next){
	var ep = new EventProxy();
	dataSource.getConn(ep);
	adminModule.typeDel(ep,[req.params.id]);
	ep.on("success",function(){
		res.json(config.info.suc).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}

module.exports = function(){
	return new typeControl();
}
