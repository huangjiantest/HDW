var dataSource = function(){
	//创建数据库连接池
	this.pool = mysql.createPool({
		connectionLimit : 10,
		host : "localhost",
		user : "root",
		password : "",
		database : "epary",
		dateStrings : true//数据库时间改为正常年月显示
	});
}
//建立数据库连接
dataSource.prototype.getConn = function( ep ) {
	this.pool.getConnection(ep.done("conn"));//执行conn函数
}

module.exports = function() {
	return new dataSource();
}
