var dataSource = function(){
	this.pool  = mysql.createPool({
	  connectionLimit : 10,
	  host            : 'localhost',
	  user            : 'root',
	  password        : '',
	  database        : 'trip',
	  dateStrings     : true
	});
}

dataSource.prototype.getConn = function( ep ){
	this.pool.getConnection( ep.done("conn") );
}

module.exports = function(){
	return new dataSource();
}