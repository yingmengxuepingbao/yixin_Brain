//调日期阴历阳历转换
var date2 = new ruiDatepicker().init('#demo2');
//页面加载执行
$(document).ready(function (){
	$(".btn1").on("click",function(){
		var demo2 = $("#demo2").val();
		if(demo2==null || demo2==""||demo2=="undefined"){
			alert("请选择出生日期！");
			return;
		}
		//获取性别
		//性别
		var sex = $("input:radio:checked").val();
		if(sex==1){
			sex = "男";
		}else{
			sex = "女";
		}
		$("#xingbie").append(sex);
		//日历
		getSiZhu();
		//隐藏div
		$("#mask").hide();
	})
});

function getSiZhu(){
	var  date = $("#date1").val();
	var n_year,n_month,n_day,gz_year,gz_month,gz_day,g_year,g_month,g_day,g_hour,qianjie,houjie,sanjie,sijie,jieqi_one,jieqi_two,jieqi_tree,jieqi_four;
	var arr = date.split("-");
	g_year = arr[0];
	g_month = arr[1];
	g_day = arr[2];
	//公历
	var xiaoshi = $("#hour1").val();
	$("#gongli_1").append(g_year+"年"+g_month+"月"+g_day+"日 "+xiaoshi+":00:00");
	//农历
	var yinli= $("#yinli").val();
	$("#nongli_1").append(yinli);
	//根据公历转农历
	var nongli_data = calendar.solar2lunar(g_year,g_month,g_day);
	for (var key in nongli_data) {
		 //干支
		 gz_year = nongli_data["gzYear"];//干支年
		 gz_month = nongli_data["gzMonth"];//干支月
		 gz_day = nongli_data["gzDay"];//干支日
		 //节气日
		 qianjie = nongli_data["firstNode"];//当月「节」为几日开始
		 houjie = nongli_data["secondNode"];//当月「节」为几日开始
		 sanjie = nongli_data["treeNode"]; //下一个月的第一个节
		 sijie =  nongli_data["treeNode"]; //上一个月的第二个节
		 sijie = nongli_data["fourNode"] ;
		 //节气名
		 jieqi_one = nongli_data["oneJie"];
		 jieqi_two = nongli_data["towJie"];
		 jieqi_tree = nongli_data["treeJie"];
		 jieqi_four = nongli_data["fourJie"];
	}
	//判断八字在那两个节气之间
	if(g_day>qianjie && g_day<houjie){
		//前节
		$("#qianjie").append(g_year+"年"+g_month+"月"+qianjie+"日（"+jieqi_one+"）");
		//后节
		$("#houjie").append(g_year+"年"+g_month+"月"+houjie+"日（"+jieqi_two+"）");
	}
	if(g_day>houjie){
		//前节
		$("#qianjie").append(g_year+"年"+g_month+"月"+houjie+"日（"+jieqi_two+"）");
		if((Number(g_month)+1) >12){
			var mm=1;
			//后节
			$("#houjie").append(g_year+"年"+ mm +"月"+sanjie+"日（"+jieqi_tree+"）");
		}else{
			//后节
			$("#houjie").append(g_year+"年"+(Number(g_month)+1) +"月"+sanjie+"日（"+jieqi_tree+"）");
		}
		
	}
	if(g_day<qianjie){
		if((Number(g_month)-1)<1){
			var mm=12;
			//前节
			$("#qianjie").append(g_year+"年"+mm +"月"+sijie+"日（"+jieqi_four+"）");
		}else{
			//前节
			$("#qianjie").append(g_year+"年"+(Number(g_month)-1) +"月"+sijie+"日（"+jieqi_four+"）");
		}
		//后节
		$("#houjie").append(g_year+"年"+g_month+"月"+qianjie+"日（"+jieqi_one+"）");
	}
	var shizhi = $("#shizhi").val();
	var g_hour = calendar.getHourGanZhi(gz_day.substring(0,1),shizhi);
	//四柱八字
	$("#bazi").append(gz_year + gz_month +gz_day +g_hour);
}