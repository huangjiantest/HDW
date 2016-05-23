var adminModule = function(){}
adminModule.prototype.adminList = function( ep ){
	ep.on("conn",function( conn ){
		var sql = "select * from admin";
		conn.query(sql,ep.done("success"));
		conn.release(); 
	});
}

adminModule.prototype.adminAdd = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "insert into admin values(default,?,?,?,1,now())";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}

adminModule.prototype.adminDel = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "delete from admin where aid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}

module.exports = function(){
	return new adminModule();
}