var newsModule = function(){}
newsModule.prototype.newsList = function( ep ){
	ep.on("conn",function( conn ){
		var sql = "select * from news";
		conn.query(sql,ep.done("success"));
		conn.release(); 
	});
}

newsModule.prototype.newsDel = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "delete from news where nid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}

newsModule.prototype.previews = function ( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "select * from news where nid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}

module.exports = function(){
	return new newsModule();
}