var listModule = function(){}
listModule.prototype.list = function( ep ){
	ep.on("conn",function( conn ){
		var sql = "select * from message";
		conn.query(sql,ep.done("success"));
		conn.release(); 
	});
}
module.exports = function(){
	return new listModule();
}