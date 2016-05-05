-function(){
	$.yanzheng = {};
	$.yanzheng.isEmpty = function(value){
		var reg = /^\S+$/;
		return reg.test(value);
	};
	$.yanzheng.isEmail = function(value){
		var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		return reg.test(value);
	}
	//option (type,title,message,timeout)
	//type (warning,danger,info,success)
	$.fn.alterMes = function(option){
		//判断type输入的合法性
		var typeObj = {warning:"警告！",danger:"错误！",info:"提示！",success:"正确！"};//JSON函数对象
		if(!option.type || !typeObj[option.type]){
			option.type = "info";
		}
		$(this).addClass("alert-" + option.type);
		$(this).find(".title").html(typeObj[option.type]);
		$(this).show("fast");
		$(this).find(".message").html(option.message);
		
		//重新绑定关闭事件
		var that = $(this);
		$(this).find(".close").click(function(){
			that.removeClass("alert-" + option.type);
			that.hide("fast");
		});
		
		var time = option.timeout || 2500;
		//自动消失
		setTimeout(function(){
			that.removeClass("alert-" + option.type);
			that.hide("fast");
		},time);
	}
	
	$._ajax = function(option){
		option.dataType = option.dataType || "json";//默认数据传送类型为json
		option.type = option.type || "post";//默认类型为post
		option.statusCode = {
			404 : function(){
				window.location.href = "/404.html";
			},
			500 : function(){
				window.location.href = "/500.html";
			}
		}
		$.loaddingStart();
		return $.ajax(option).done(function(){
			$.loaddingEnd();
		});
	}
	$.loaddingStart = function(){//增加模态框
		$("body").append("<div id='loadding' class='loadding'><img src='/img/check_flat/default.png'></div>");
	}
	$.loaddingEnd = function(){//移除模态框
		$("#loadding").remove();
	}
	
	/*
	 * 获取cookie
	 * 如果找到cookie,返回cookie value
	 * 如果没找到,返回""
	 */
	$.getCookie = function(name){
		var cookie = document.cookie;//获取客户端的cookie
		var start = cookie.indexOf(name);//在cookie中找到第一个name
		if(start == -1){
			return "";
		}
		start = start + name.length + 1 ;
		var end = cookie.indexOf(";",start);//从start开始找，直到找到;
		if(end == -1){//如果没找到;
			//decodeURIComponent转义
			return decodeURIComponent( cookie.slice(start,cookie.length) );//截取并返回整个cookie长度的数据
		}else{//如果找到了;
			return decodeURIComponent( cookie.slice(start,end) );//截取并返回从start到end之间的字符串
		}
	};
}();
