var newsControl = function (){}
newsControl.prototype.newsList = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	newsModule.newsList(ep);
	ep.on("success",function( data ){
		res.json(data).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}

newsControl.prototype.newsAdd = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	newsModule.newsAdd(ep,[ req.body.mcontent,req.body.peoples ]);
	ep.on("success",function( data ){
		if( data.insertId ){
			res.json( config.info.suc ).end();
		}else{
			res.json(config.error.newsAdderr).end();
		}
	});
	ep.fail(function( err ){
		next(err);
	});
}

newsControl.prototype.newsDel = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	newsModule.newsDel(ep,[ req.params.mid ]);
	ep.on("success",function( data ){
		res.json( config.info.suc ).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}

newsControl.prototype.previews = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	newsModule.previews(ep,[req.params.mid]);
	ep.on("success",function( data ){
		res.json(data).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}

module.exports=function(){
	return new newsControl();
}