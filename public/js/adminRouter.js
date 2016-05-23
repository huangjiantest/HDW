$(function(){
	var router = new Router({
	    container: '#container',
	    enterTimeout : 200,
	    leaveTimeout : 200
	});
	//显示管理员列表
	var adminList = {
		 url : "/adminList",
		 className : "adminList",
		 ajaxData : function(){
		 	var that = this;
		 	return $._ajax({
		 		url  : "/admin/admin",
		 		type : "get"
		 	}).done(function( data ){
		 		that.data = data;
		 	});
		 },
		 render : function(){
		 	return ejs.render($("#adminList").html(),{admins:this.data});
		 }
	}
	var adminAdd = {
		url : "/adminAdd",
		render : function(){
			return $("#adminAdd").html();
		},
		bind : function(){
			var t = $(this);
			$(this).find("#sub").click(function(){
				var aname = t.find("#aname").val();
				var email = t.find("#email").val();
				var password = t.find("#password").val();
				if( $.validate.isEmpty(aname) == false ){
					return t.find(".alert").alertMes({message:"用户名不能为空"});
				}
				if( $.validate.isEmpty(email) == false ){
					return t.find(".alert").alertMes({message:"邮箱不能为空"});
				}
				if( $.validate.isEmpty(password) == false ){
					return t.find(".alert").alertMes({message:"密码不能为空"});
				}
				if( $.validate.isEmail(email) == false ){
					return t.find(".alert").alertMes({type:"danger",message:"邮箱格式不正确"});
				}
				$._ajax({
					url : "/admin/admin",
					data : {"aname":aname,"email":email,"password":password}
				}).done(function( obj ){
					if( obj.code ){
						//如果增加成功，返回管理员列表
						location.href = "/admin/index#/adminList";
					}else{
						$(this).find(".alert").alertMes({type:"danger",message:obj.msg});
					}
				});
			});
		}
	}
	var adminDel = {
		url : "/adminDel/:id",
		ajaxData : function(){
		 	var t = this;
		 	$._ajax({
		 		url  : "/admin/admin/" + t.params.id,
		 		type : "delete"
		 	}).done(function(){
		 		location.href = "/admin/index#/adminList";
		 	});
		 	return false;    //停止路由
		}
	}
	
	//新闻管理
	var newsList = {
		url : "/newsList",
		ajaxData : function(){
			var that = this;
			return $._ajax({
				url  : "/admin/news",
				type : "get"
			}).done(function( data ){
				that.data = data;
			});
		},
		render : function(){
			return ejs.render($("#newsList").html(),{news:this.data});
		}
	}
	var newsAdd = {
		url : "/newsAdd",
		ajaxData : function(){
			var that = this;
			return $._ajax({
				url  : "/admin/admin",
				type : "get"
			}).done(function( data ){
				that.data = data;
			});
		},
		render : function(){
			return ejs.render($("#newsAdd").html(),{admins:this.data});
		},
		bind : function(){
			var t = $(this);
			t.find("#editor").wysiwyg();
			$(this).find("#sub").click(function(){
				var ntitle = t.find("#ntitle").val();
				var content = t.find("#editor").html();
				var author = t.find("#author").val();
				if( $.validate.isEmpty(ntitle) == false ){
					return t.find(".alert").alertMes({message:"新闻标题不能为空"});
				}
				$._ajax({
					url : "/admin/news",
					data : {"ntitle":ntitle,"content":content,"author":author}
				}).done(function( obj ){
					if( obj.code ){
						//如果增加成功，返回管理员列表
						location.href = "/admin/index#/newsList";
					}else{
						$(this).find(".alert").alertMes({type:"danger",message:obj.msg});
					}
				});
				
			});
		}
	}
	var newsDel = {
		url : "/newsDel/:nid",
		ajaxData : function(){
			var t = this;
			$._ajax({
				url  : "/admin/news/" + t.params.nid,
				type : "delete"
			}).done(function(){
				location.href = "/admin/index#/newsList";
			});
			return false;
		}
	}
	
	var previews = {
		url : "/previews/:nid",
		ajaxData : function(){
			var that = this;
			return $._ajax({
				url  : "/admin/advices/" + that.params.nid,
				type : "get"
			}).done(function( data ){
				that.data = data;
			});
		},
		render : function(){
			return ejs.render($("#newspreviews").html(),{n:this.data[0]});
		}
	}
	
	var previewss = {
		url : "/previewss/:mid",
		ajaxData : function(){
			var that = this;
			return $._ajax({
				url  : "/admin/news/" + that.params.mid,
				type : "get"
			}).done(function( data ){
				that.data = data;
			});
		},
		render : function(){
			return ejs.render($("#messageprive").html(),{message:this.data[0]});
		}
	}
	
	//留言管理
	var adviceList = {
		url : "/adviceList",
		ajaxData : function(){
			var that = this;
			return $._ajax({
				url  : "/admin/advices",
				type : "get"
			}).done(function( data ){
				that.data = data;
			});
		},
		render : function(){
			return ejs.render($("#adviceList").html(),{advices:this.data});
		}
	}
	var adviceDel = {
		url : "/adviceDel/:mid",
		ajaxData : function(){
			var t = this;
			$._ajax({
				url  : "/admin/advices/" + t.params.mid,
				type : "delete"
			}).done(function(){
				location.href = "/admin/index#/adviceList";
			});
			return false;
		}
	}
	
	//默认页面
	var home = {
		url : "/",
		render : function(){
			return "<h1>欢迎来到Sea-Island-Trip后台管理页面</h1>"
		}
	}
	router.push(adminList)
		  .push(adminAdd)
		  .push(adminDel)
		  .push(newsList)
		  .push(newsAdd)
		  .push(newsDel)
		  .push(previews)
		  .push(home)
		  .push(adviceList)
		  .push(adviceDel)
		  .setDefault('/').init();
});