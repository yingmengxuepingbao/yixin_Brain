//注册
var register = document.getElementById("register");
register.onclick = function() {
	var username =$("#username").val();
	var password =$("#password").val();
	var confirmPassword =$("#confirmPassword").val();
	var nickname =$("#nickname").val();
	var sex =$("#sex").val();
	var realname =$("#realname").val();
	var face =$("#face").val();
	var mobile =$("#mobile").val();
	var email =$("#email").val();
	var birthday =$("#birthday").val();
	if(username==null||username=="" ||username == undefined){
		var usernameVal = "账号不能为空";
		$("#username").css("border","2px solid red");
		$("#username").attr("placeholder",usernameVal);
		 return;
	}else{
		$("#username").css("border",'');
	}
	if(password==null ||password=="" || password == undefined){
		var passwordVal = "密码不能为空";
		$("#password").css("border","2px solid red");
		$("#password").attr("placeholder",passwordVal);
		 return;
	}else{
		$("#password").css("border",'');
	}
	var data ={
		username:username,
		password:password,
		confirmPassword:confirmPassword,
		nickname:nickname,
		sex:sex,
		realname:realname,
		face:face,
		mobile:mobile,
		birthday:birthday
	}
	var url="http://localhost:8088/passport/regist";
	//请求后台数据
	$.post(
		url
		,data
		,function(data) {
			console.log("1:");
			console.log(data);
			if(data.status==200){
			  //成功跳转主页
			  window.location.href="login.html";
		    }else{
			  alert("系统提示","注册失败","error");
		    }
			
		});
}
