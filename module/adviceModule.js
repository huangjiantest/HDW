var adviceModule = function(){}
adviceModule.prototype.adviceList = function( ep ){
	ep.on("conn",function( conn ){
		var sql = "select * from message";
		conn.query(sql,ep.done("success"));
		conn.release(); 
	});
}

adviceModule.prototype.adviceDel = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "delete from message where mid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}

adviceModule.prototype.previews = function ( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "select * from message where mid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}

module.exports = function(){
	return new adviceModule();
}