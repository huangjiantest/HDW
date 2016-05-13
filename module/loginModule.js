var loginModule = function(){}
loginModule.prototype.login = function( ep,data ) {
	//触发数据库连接事件
	ep.on("conn",function( conn ){//如果数据库连接成功，就执行下面函数
		//查询条件
		var sql = "select * from admin where email = ? and password = ?";
		conn.query(sql,data,ep.done("success"));//如果sql语句成功，就执行success函数
		conn.release();//关闭数据库
	});
}

module.exports = function() {
	return new loginModule();
}
