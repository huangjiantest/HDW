//查看管理员列表(查询数据库)
var adminModule = function(){};
adminModule.prototype.adminList = function(ep){
	ep.on("conn",function(conn){//如果数据库连接成功，就执行下面函数
		var sql = "select * from admin";
		conn.query(sql,ep.done("success"));//如果SQL语句成功，就执行success函数
		conn.release();//关闭数据库
	});
}

//增加管理员(插入数据库)
adminModule.prototype.adminAdd = function(ep,data){
	ep.on("conn",function(conn){//如果数据库连接成功，就执行下面函数
		//插入的参数用?显示
		var sql = "insert into admin values(default,?,?,?,now(),1)";
		conn.query(sql,data,ep.done("success"));//如果SQL语句成功，就执行success函数
		conn.release();//关闭数据库
	});
}

//删除管理员(删除数据库数据)
adminModule.prototype.adminDel = function(ep,data){
	ep.on("conn",function(conn){//如果数据库连接成功，就执行下面函数
		//插入的参数用?显示
		var sql = "delete from admin where aid = ?";
		conn.query(sql,data,ep.done("success"));//如果SQL语句成功，就执行success函数
		conn.release();//关闭数据库
	});
}



//查询商品分类
adminModule.prototype.typeList = function(ep,data){
	ep.on("conn",function(conn){
		if(data){
			var sql = "select * from producttype where pid = ?";
			conn.query(sql,data,ep.done("success"));
		}else{
			var sql = "select p1.*,p2.typename as pname from producttype p1 left join producttype p2 on p1.pid = p2.tid order by p1.pid";;
			conn.query(sql,ep.done("success"));
		}
		conn.release();
	});
}

//增加商品分类(插入数据库)
adminModule.prototype.typeAdd = function(ep,data){
	ep.on("conn",function(conn){
		var sql = "insert into producttype values(default,?,?,?)";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}

//删除商品分类(删除数据库数据)
adminModule.prototype.typeDel = function(ep,data){
	ep.on("conn",function(conn){
		var sql = "delete from producttype where tid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}


//查询商品
adminModule.prototype.proList = function(ep){
	ep.on("conn",function(conn){
		var sql = "select p.*,t.typename from product p left join producttype t on p.type = t.tid";;
		conn.query(sql,ep.done("success"));
		conn.release();
	});
}

//增加商品(插入数据库)
adminModule.prototype.proAdd = function(ep,conn,data){
	var sql = "insert into product values(default,?,?,?,?,?)";
	conn.query(sql,data,ep.done("success"));
	conn.release();
}

//删除商品(删除数据库数据)
adminModule.prototype.proDel = function(ep,data){
	ep.on("conn",function(conn){
		var sql = "delete from product where pid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}

module.exports = function(){
	return new adminModule();
}
