var moshi =$("#moshi").val();
var intervalId=null;//定时器
var flag_dingshiqi=true;
//数量记数
var cuowu_count = 0;
var zhengque_count = 0;
//答案数组
let shuzu =[];
//类型
var type ;
//页面加载执行		
$(document).ready(function (){
	//获取传入的类型
	var req = GetRequest();
	type = req['type'];
	var typeText = "";
	console.log(type)
	//训练类型： 1,100以内的加法。2,100以内减法 3,多位数相加。4,多位数减法。5,多位数连加连减。6,多位数乘法。7,多位数除法。
	 switch (type) { //判断当前题目类型
		case '1':
			typeText = "100以内加法";
			break;
		case '2':
			typeText = "100以内减法（正数）";
			break;
		case '3':
			typeText = "100以内乘法";
			break;
		case '4':
			typeText = "100以内除法";
			$("#yushu").show();
			break;
		case '5':
			typeText = "多位数连加连减";
			break;
		case '6':
			typeText = "多位数乘法";
			break;
		case '7':
			typeText = "多位数除法";
			break;
		case '8':
			typeText = "多为加法";
			break;
		case '9'://补数
			typeText = "补数";
			break;
	    }
		//将标题修改
	    $("#tit_text").html(typeText);  
		$("#tit_p").text(typeText);
	
	$(".btn").on("click",function(){
		$("#mask").hide();
		if(flag_dingshiqi==true){
			flag_dingshiqi=false
			//点击（使用说明页）确定后：3秒后开始倒计时
			setTimeout(function (){              
			   //开始时间
			   var starttime= $("#second").val();
			   // 结束时间
			   var endtime="0";
			   //启动倒计时
			   daojishi(starttime,endtime);
			}, 3000);//3秒
		}
		
	})
	$("#myEnd").hide();
	
	$("#ok_all").on("click",function(){
		$("#myEnd").hide();
		//将计时器恢复为1分钟
		$("#second").val(1);
		if(intervalId!=null||intervalId!="" ||intervalId!=undefined ||intervalId!="null"){
			//将计时器停止
			clearInterval(intervalId);
			intervalId=null;
		}
		
	})
	//100以内的数 5组拼接
	var biao = "<tr class='pinjie-table'>";
	var ge="";
	for(var i=0 ;i<moshi;i++){
		var shuhe = "";
		if(type!=undefined && type=='1'){
			shuhe = getShuHe();
		}else if(type!=undefined && type=='2'){
			shuhe = getShuCha();
		}else if(type!=undefined && type=='3'){
			shuhe = getShuCheng();
		}else if(type!=undefined && type=='4'){
			shuhe = getShuchu();
		}
		
		ge+="<td> <input style='width: 80%' readonly value='"+shuhe+"'/><input style='width: 80%;' id='shuzhi"+i+"' /></td>"
	}
	biao+=ge+"</tr>"
	$("#biaoge").append(biao);
});
 //100以内的随机数
  function random(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
  }
  //100以内的加法
 function getShuHe(){
	 var fastOne=0;
	 var nextOne=0;
	 for (var i = 1; i <=2; i++) {
		 if(i == 1){
			fastOne = random(1, 100);
		 }else{
			nextOne = random(1, 100);
		 }
	 }
	 shuzu.push(fastOne+nextOne);
	 console.log(shuzu);
	 return fastOne+"+"+nextOne +"=";
 }
 //100以内的减法
 function getShuCha(){
 	 var fastOne=0;
 	 var nextOne=0;
 	 for (var i = 1; i <=2; i++) {
 		 if(i == 1){
 			fastOne = random(50, 100);
 		 }else{
 			nextOne = random(1, 50);
 		 }
 	 }
 	 shuzu.push(fastOne-nextOne);
 	 console.log(shuzu);
 	 return fastOne+"-"+nextOne +"=";
 }
 //100以内的乘法
 function getShuCheng(){
 	 var fastOne=0;
 	 var nextOne=0;
 	 for (var i = 1; i <=2; i++) {
 		 if(i == 1){
 			fastOne = random(1, 100);
 		 }else{
 			nextOne = random(1, 100);
 		 }
 	 }
 	 shuzu.push(fastOne * nextOne);
 	 console.log(shuzu);
 	 return fastOne+"×"+nextOne +"=";
 }
 //100以内的除法
 function getShuchu(){
 	 var fastOne=0;
 	 var nextOne=0;
 	 for (var i = 1; i <=2; i++) {
 		 if(i == 1){
 			fastOne = random(50, 100);
 		 }else{
 			nextOne = random(1, 50);
 		 }
 	 }
	 var yushu = fastOne % nextOne;
	/* var shang = (fastOne-yushu) / nextOne;
	 if(yushu!=0){
		shuzu.push(shang+"余"+yushu); 
	 }else{
		 shuzu.push(shang);
	 }
 	 return fastOne+"÷"+nextOne +"="; */
	 var chushu = fastOne-yushu;
	 var shang = chushu /nextOne;
	 shuzu.push(shang);
	 return chushu +"÷"+nextOne+"="
 }
 //练习数量
$("#moshi").change(function(){
	//自动任务不启动
	flag_dingshiqi=false;
	//将计时器停止
	if(intervalId!=null||intervalId!="" ||intervalId!=undefined ||intervalId!="null"){
		console.log("停止1："+intervalId)
		//将计时器停止
		clearInterval(intervalId);
		intervalId=null;
	}
	//拼接练习题
	lianxiti();
});
$("#chongxin").click(function(){
	//自动任务不启动
	flag_dingshiqi=false;
	//将计时器停止
	if(intervalId!=null||intervalId!="" ||intervalId!=undefined ||intervalId!="null"){
		console.log("停止2："+intervalId)
		//将计时器停止
		clearInterval(intervalId);
		intervalId=null;
	}
	//拼接练习题
	lianxiti();
})
//拼接练习题
function lianxiti(){
	moshi =$("#moshi").val();
	$(".pinjie-table").remove();
	shuzu=[];
	
	if(moshi>5){
		var  bianshu=moshi/5;
		var  biaoge="";
		var  biaoji =0;
		for(var n=0;n<bianshu;n++){
			var biao = "<tr class='pinjie-table'>";
			var ge="";
			for(var i=0 ;i<5;i++){
				var shuhe = "";
				if(type!=undefined && type=='1'){
					shuhe = getShuHe();
				}else if(type!=undefined && type=='2'){
					shuhe = getShuCha();
				}else if(type!=undefined && type=='3'){
					shuhe = getShuCheng();
				}else if(type!=undefined && type=='4'){
					shuhe = getShuchu();
				}
				ge+="<td> <input style='width: 80%;' readonly value='"+shuhe+"'/><input style='width: 80%;' id='shuzhi"+biaoji+"'/></td>"
				biaoji++;
			}
			biao+=ge+"</tr>"
			biaoge += biao;
		}
		$("#biaoge").append(biaoge);
	}else{
		var biao = "<tr class='pinjie-table'>";
		var ge="";
		for(var i=0 ;i<moshi;i++){
			var shuhe = "";
			if(type!=undefined && type=='1'){
				shuhe = getShuHe();
			}else if(type!=undefined && type=='2'){
				shuhe = getShuCha();
			}else if(type!=undefined && type=='3'){
				shuhe = getShuCheng();
			}else if(type!=undefined && type=='4'){
				shuhe = getShuchu();
			}
			ge+="<td> <input style='width: 50px;' readonly value='"+shuhe+"'/><input style='width: 50px;' id='shuzhi"+i+"' /></td>"
		}
		biao+=ge+"</tr>"
		$("#biaoge").append(biao);
	}
	//自动任务不启动
	flag_dingshiqi=false;
	if(intervalId!=null||intervalId!="" ||intervalId!=undefined ||intervalId!="null"){
		//将计时器停止
		clearInterval(intervalId);
		intervalId=null;
	}
	//更改倒计时
	$("#daojishi").val("");
	//开始时间
	var starttime= $("#second").val();
	// 结束时间
	var endtime="0";
	//启动倒计时
	daojishi(starttime,endtime);
}

//拼接时间
function daojishi(starttime,endtime) {
    var minute = document.getElementById("minute");
    var second = document.getElementById("second");
    intervalId = setInterval(function() {
        //倒计时结束
        if(starttime==0 && endtime==0){
			$("#myEnd").show();
			$("#daojishi").val("");
			moshi = $("#moshi").val();
			//判断答题结果是否正确
			for(var n=0;n<moshi;n++){
				var da_an = $("#shuzhi"+n).val();
				var jieguo =shuzu[n];
				if(da_an!=jieguo){
					cuowu_count++;
					$("#shuzhi"+n).css('background', 'red');
				}else{
					zhengque_count++;
				}
			}
			//显示答对，答错个数
			$(".zhengque").text(zhengque_count);
			$(".cuowu").text(cuowu_count);
			cuowu_count = 0;
			cuowu_count = 0;
			//将计时器停止
			if(intervalId!=null||intervalId!="" ||intervalId!=undefined ||intervalId!="null"){
				//将计时器停止
				clearInterval(intervalId);
				intervalId=null;
			}
			return;
        }
        //分钟不为0 秒钟为0
        if (endtime == 0) {
            if(starttime!=0 ) {
                starttime--;
                endtime = 59;
            }
        }else {
            endtime--;
        }
		var fenzhong="";
		var miaozhong="";
        if(starttime<10) {
            fenzhong= "0" + starttime + " ";
        }else {
            fenzhong= starttime + " ";
        }
        if(endtime<10){
            miaozhong = "0" + endtime;
        }else {
            miaozhong = endtime + " ";
        }
		$("#daojishi").val(fenzhong+":"+miaozhong);
    }, 1000)
}
//点击提交按钮
$("#tijiao").click(function(){
	var moshi =$("#moshi").val();
	$("#myEnd").show();
	$("#daojishi").val("");
	//判断答题结果是否正确
	for(var n=0;n<moshi;n++){
		var da_an = $("#shuzhi"+n).val();
		var jieguo =shuzu[n];
		if(da_an!=jieguo){
			cuowu_count++;
			$("#shuzhi"+n).css('background', 'red');
		}else{
			zhengque_count++;
		}
	}
	//显示答对，答错个数
	$(".zhengque").text(zhengque_count);
	$(".cuowu").text(cuowu_count);
	cuowu_count = 0;
	cuowu_count = 0;
	//将计时器停止
	if(intervalId!=null||intervalId!="" ||intervalId!=undefined){
		//将计时器停止
		clearInterval(intervalId);
		intervalId=null;
	}
});
//获取页面跳转的数据
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1];
        }
    }
    return theRequest;
}
