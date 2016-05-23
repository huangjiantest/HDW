var adviceControl = function (){}
adviceControl.prototype.adviceList = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	adviceModule.adviceList(ep);
	ep.on("success",function( data ){
		res.json(data).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}

adviceControl.prototype.adviceDel = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	adviceModule.adviceDel(ep,[ req.params.mid ]);
	ep.on("success",function( data ){
		res.json( config.info.suc ).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}

adviceControl.prototype.previews = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	adviceModule.previews(ep,[req.params.mid]);
	ep.on("success",function( data ){
		res.json(data).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}

module.exports=function(){
	return new adviceControl();
}