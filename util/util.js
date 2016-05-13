exports.loadConfig = function( path ) {
	path = path || rootpath + "/config/message.json";//路径
	var data = fs.readFileSync(path);//读取目标路径文件
	return JSON.parse(data);//JSON转化
}

exports.checkLogin = function( req,res,next ) {
	if( req.session.admin ) {
		next();
	} else {
		res.redirect("/login.html");
	}
}

exports.favicon = function(req,res,next){
	res.redirect("favicon.ico");
}

exports.upfile = function(ep,file){
	var start = file.originalname.lastIndexOf(".");
	var extname = file.originalname.slice(start);
	var filename = new Date().getTime() + extname;
	
	var readPath = rootpath + "/" + file.path;
	var writePath = rootpath + "/public/upfile/" + filename;
	
	var rs = fs.createReadStream(readPath);
	var ws = fs.createWriteStream(writePath);
	rs.pipe(ws);
	ws.on("finish",ep.done("fileup",function(){
		fs.unlink(readPath,function(err){
			if(err){log.debug(err.stack)};
		});
		return filename;
	}));
}
