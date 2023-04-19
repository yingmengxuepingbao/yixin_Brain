 //初始化验证码
var verifyCode = new GVerify({
	id : "picyzm",
	type : "blend"
});
//点击按钮验证
var code = document.getElementById("code_input");
var btn = document.getElementById("btn");
btn.onclick = function() {
	var userName = $("#userName").val();
	var password = $("#password").val();
	if(userName==null||userName=="" ||userName == undefined){
		var userNameVal = "用户名不能为空";
		$("#userName").css("border","2px solid red");
		$("#userName").attr("placeholder",userNameVal);
		 return;
	}else{
		$("#userName").css("border",'');
	}
	if(password==null ||password=="" || password == undefined){
		var passwordVal = "密码不能为空";
		$("#password").css("border","2px solid red");
		$("#password").attr("placeholder",passwordVal);
		 return;
	}else{
		$("#password").css("border",'');
	}
	var res = verifyCode.validate(code.value);
	//验证码不正确
	if (!res) {
		$("#code_input").css("border","2px solid red");
		return;
	}else{
		$("#code_input").css("border",'');
	}
	
	var data ={
		username:userName,
		password:password
	}
	var url="http://localhost:8088/passport/login";
	//请求后台数据
	$.post(
		url
		,data
		,function(data) {
			console.log("1:");
			console.log(data);
			if(data.status==200){
			  //成功跳转主页
			  window.location.href="../../index.html";
		    }else{
			  alert("系统提示","添加失败","error");
		    }
			
		});
}