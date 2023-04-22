var moshi =$("#moshi").val();
var intervalId=null;//定时器
var flag_dingshiqi=true;
//数量记数
var cuowu_count = 0;
var zhengque_count = 0;
//答案数组
let shuzu =[];
//页面加载执行		
$(document).ready(function (){
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
		if(intervalId!=null||intervalId!="" ||intervalId!=undefined){
			//将计时器停止
			clearInterval(intervalId);
			intervalId=null;
		}
		
	})
	//100以内的数 5组拼接
	var biao = "<tr class='pinjie-table'>";
	var ge="";
	for(var i=0 ;i<moshi;i++){
		var shuhe = getShuHe();
		console.log(shuhe);
		ge+="<td> <input style='width: 80%' readonly value='"+shuhe+"'/><input style='width: 80%;' id='shuzhi"+i+"' /></td>"
	}
	biao+=ge+"</tr>"
	$("#biaoge").append(biao);
});
 //100以内的随机数
  function random(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
  }

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
 //练习数量
$("#moshi").change(function(){
	//自动任务不启动
	flag_dingshiqi=false;
	//将计时器停止
	if(intervalId!=null||intervalId!="" ||intervalId!=undefined){
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
	if(intervalId!=null||intervalId!="" ||intervalId!=undefined){
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
				var shuhe = getShuHe();
				console.log(shuhe);
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
			var shuhe = getShuHe();
			console.log(shuhe);
			ge+="<td> <input style='width: 50px;' readonly value='"+shuhe+"'/><input style='width: 50px;' id='shuzhi"+i+"' /></td>"
		}
		biao+=ge+"</tr>"
		$("#biaoge").append(biao);
	}
	//自动任务不启动
	flag_dingshiqi=false;
	if(intervalId!=null||intervalId!="" ||intervalId!=undefined){
		console.log(intervalId);
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
			if(intervalId!=null||intervalId!="" ||intervalId!=undefined){
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
