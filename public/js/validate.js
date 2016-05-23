-function($){
	
	$.validate = {};
	
	$.validate.isEmpty = function( str ){
		var reg = /^\S+$/;
		return reg.test(str);
	}
	
	$.validate.isEmail = function( str ){
		var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		return reg.test(str);
	}
	
	
	//option  type,message,times
	//type  warning,info,success,danger
	$.fn.alertMes = function( option ){
		var typeobj = { warning:"警告！",info:"提示！",success:"成功！",danger:"错误！" }
		if( !option.type || !typeobj[option.type] ){
			option.type = "info";
		}
		$(this).addClass("alert-"+option.type);
		$(this).find(".title").html(typeobj[option.type]);
		
		$(this).show("fast");
		$(this).find(".message").html(option.message);
		
		//绑定关闭事件
		var that = $(this);
		$(this).find(".close").click(function(){
			that.hide("fast");
			that.removeClass("alert-"+option.type);
		});
		
		option.times = option.times || 2000;
		setTimeout(function(){
			that.hide("fast");
			that.removeClass("alert-"+option.type);
		},option.times);
	}
	
	//5-03
	$._ajax = function( option ){
		
		option.type = option.type || "post";
		option.dataType = option.dataType || "json";
		option.statusCode = {
			404 : function(){
				window.location.href = "/404.html";
			},
			500 : function(){
				window.location.href = "/500.html";
			}
		};
		//$.loadingstart();
		return $.ajax( option ).always(function(){
			$.loadingend();
		});
	}
	
//	$.loadingstart = function(){
//		$("body").append("<div id='load' class='load'><img src='/img/loading.gif' /></div>");
//	}
	$.loadingend = function(){
		$("#load").remove();
	}
	
	
	// 客户端的cookie缓存
	$.getCookie = function( name ){
		var cookie = document.cookie;  //获取客户端中的cookie
		console.log(cookie)
		var start = cookie.indexOf(name);  //indexOf  在cookie中检索name 如果存在返回出现的第一个name的位置     如果没找到则返回-1
		if( start == -1 ){
			return "";
		}
		
		start = start + name.length +1;
		var end = cookie.indexOf(";",start);  //从start位置开始检索  直到找到";"为止,如果没找到则返回-1
		if(end == -1){  //如果返回-1 则说明是最后一个，直接截取到最后
			return decodeURIComponent(cookie.slice(start));   //decodeURIComponent   URI组件中的未转义字符
		}else{
			return decodeURIComponent(cookie.slice(start,end)); //slice  从start位置开始截取到end位置结束
		}
	}
	
	
}($)


//自定义路由
//-function(){
//	window.onhashchange = function(){
//		if( location.hash == "#/adminList" ){
//			$._ajax({
//				url  : "/admin/adminList",
//				type : "get"
//			}).done(function( data ){
//				var html = ejs.render( $("#adminList").html(),{admins:data});
//				$("#container").html( html );
//			});
//		}
//	}
//}();















