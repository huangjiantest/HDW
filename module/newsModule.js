var newsModule = function(){}
newsModule.prototype.newsList = function( ep ){
	ep.on("conn",function( conn ){
		var sql = "select m.*,a.aname from message m left join admin a on m.peoples = a.aid";
		conn.query(sql,ep.done("success"));
		conn.release(); 
	});
}

newsModule.prototype.newsAdd = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "insert into message values(default,?,now(),?)";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}

newsModule.prototype.newsDel = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "delete from message where mid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}

newsModule.prototype.previews = function ( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "select m.*,a.aname from message m,admin a where m.peoples = a.aid and mid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}

module.exports = function(){
	return new newsModule();
}