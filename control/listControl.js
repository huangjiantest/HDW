var listControl = function (){};
listControl.prototype.li = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	listModule.list( ep );
	ep.on("success",function( data ){
		// res.json(data).end();
		res.send(res.render("gl.html",{lists:data})).end();
	});
	ep.fail(function( err ){
		next(err);
	});
};
listControl.prototype.list = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	listModule.list(ep);
	ep.on("success",function( data ){
		res.json(data).end();
	});
	ep.fail(function( err ){
		next(err);
	});
};
module.exports = function(){
	return new listControl();
};