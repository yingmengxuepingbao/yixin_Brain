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
		var zao="";
		if(sex==1){
			sex = "男";
			zao="乾造";
		}else{
			sex = "女";
			zao="坤造";
		}
		$("#xingbie").append(sex);
		$("#zao").val(zao);
		//日历
		getSiZhu();
		//大运
		getQiYun();
		//十神
		getShiShen();
		//表格显示
		pinjieTable();
		
		
		
		//隐藏div
		$("#mask").hide();
	})
});

function getSiZhu(){
	var  date = $("#date1").val();
	var n_year,n_month,n_day,gz_year,gz_month,gz_day,g_year,g_month,g_day,g_hour,qianjie,houjie,sanjie,sijie,jieqi_one,jieqi_two,jieqi_tree,jieqi_four,kongwang;
	var arr = date.split("-");
	g_year = arr[0];
	g_month = arr[1];
	g_day = arr[2];
	//公历
	g_hour = $("#hour1").val();
	$("#gongli_1").append(g_year+"年"+g_month+"月"+g_day+"日 "+g_hour+":00:00");
	//农历
	var yinli= $("#yinli").val();
	$("#nongli_1").append(yinli);
	//根据公历转农历
	var nongli_data = calendar.solar2lunar(g_year,g_month,g_day);
	console.log(nongli_data); 
	for (var key in nongli_data) {
		 //干支
		 gz_year = nongli_data["gzYear"];//干支年
		 gz_month = nongli_data["gzMonth"];//干支月
		 gz_day = nongli_data["gzDay"];//干支日
		 //节气日
		/* qianjie = nongli_data["firstNode"];//当月「节」为几日开始
		 houjie = nongli_data["secondNode"];//当月「气」为几日开始
		 sanjie = nongli_data["treeNode"]; //下一个月的节
		 sijie =  nongli_data["treeNode"]; //上一个月的气
		 sijie = nongli_data["fourNode"] ;
		 //节气名
		 jieqi_one = nongli_data["oneJie"];
		 jieqi_two = nongli_data["towJie"];
		 jieqi_tree = nongli_data["treeJie"];
		 jieqi_four = nongli_data["fourJie"]; */
		 //空亡
		 kongwang = nongli_data["kongwang"];
	}
	/* //判断八字在那两个节气之间
	if(g_day>qianjie && g_day<houjie){
		//前节
		$("#qianjie").append(g_year+"年"+g_month+"月"+qianjie+"日（"+jieqi_one+"）");
		$("#qianjie_day").val(qianjie);
		//后节
		$("#houjie").append(g_year+"年"+g_month+"月"+houjie+"日（"+jieqi_two+"）");
		$("#houjie_day").val(houjie);
	}
	if(g_day>houjie){
		//前节
		$("#qianjie").append(g_year+"年"+g_month+"月"+houjie+"日（"+jieqi_two+"）");
		$("#qianjie_day").val(houjie);
		if((Number(g_month)+1) >12){
			var mm=1;
			//后节
			$("#houjie").append(g_year+"年"+ mm +"月"+sanjie+"日（"+jieqi_tree+"）");
		}else{
			//后节
			$("#houjie").append(g_year+"年"+(Number(g_month)+1) +"月"+sanjie+"日（"+jieqi_tree+"）");
		}
		$("#houjie_day").val(sanjie);
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
		$("#qianjie_day").val(sijie);
		//后节
		$("#houjie").append(g_year+"年"+g_month+"月"+qianjie+"日（"+jieqi_one+"）");
		$("#houjie_day").val(qianjie);
	} */
	//判断八字在哪两个节之间 八字只用节
	var jie_data = calendar.getJie(g_year,g_month,g_day);
	var oneJie,oneJieName,oneMonthJie,twoJie,twoJieName,towMonthJie;
	for (var key in jie_data) {
		oneJie = jie_data["day"];
		oneJieName = jie_data["dayName"];
		oneMonthJie = jie_data["month"];
		twoJie = jie_data["nexday"];
		twoJieName = jie_data["nexdayName"];
		towMonthJie = jie_data["nexMonth"];
	}
	//前节
	$("#qianjie").append(g_year+"年"+oneMonthJie+"月"+oneJie+"日（"+oneJieName+"）");
	$("#qianjie_day").val(oneJie);
	//后节
	$("#houjie").append(g_year+"年"+towMonthJie+"月"+twoJie+"日（"+twoJieName+"）");
	$("#houjie_day").val(twoJie);
	//空亡
	$("#kongwang").append(kongwang);
	
	var shizhi = $("#shizhi").val();
	var gz_hour = calendar.getHourGanZhi(gz_day.substring(0,1),shizhi);
	$("#gz_year").val(gz_year);
	$("#gz_month").val(gz_month);
	$("#gz_day").val(gz_day);
	$("#gz_hour").val(gz_hour);
	
	//四柱八字
	/* $("#bazi").append(gz_year + gz_month +gz_day +gz_hour); */
}
//拼接表格
function pinjieTable(){
	//根据八字 查出藏干 根据藏干天干查出藏干十神
	var nianzhi = $("#gz_year").val().substring(1,2);
	var yuezhi = $("#gz_month").val().substring(1,2);
	var tiangan = $("#gz_day").val().substring(0,1);
	var rizhi = $("#gz_day").val().substring(1,2);
	var shizhi = $("#gz_hour").val().substring(1,2);
	var nian = getCangGan(nianzhi,tiangan);
	var yue = getCangGan(yuezhi,tiangan);
	var ri = getCangGan(rizhi,tiangan);
	var shi = getCangGan(shizhi,tiangan);

	var nianTD="<td>" ,yueTD="<td>",riTD="<td>",shiTD="<td>";
	for(var i = 0;i<nian.length;i++){
		nianTD += nian[i] +"<br/>";
	}
	nianTD = nianTD+"</td>";
	for(var i = 0;i<yue.length;i++){
		yueTD += yue[i] +"<br/>";
	}
	yueTD = yueTD+"</td>";
	for(var i = 0;i<ri.length;i++){
		riTD += ri[i] +"<br/>";
	}
	riTD = riTD+"</td>";
	for(var i = 0;i<shi.length;i++){
		shiTD += shi[i] +"<br/>";
	}
	shiTD = shiTD+"</td>";
	
	var tab = "<tbody >"+
			"<tr>"+
				"<td>&nbsp;</td>"+
				"<td>年柱</td>"+
				"<td>月柱</td>"+
				"<td>日柱</td>"+
			    "<td>时柱</td>"+
			"</tr>"+
			"<tr>"+
			"<td>十神</td>"+
			"<td>"+$("#nian_shishen").val()+"</td>"+
			"<td>"+$("#yue_shishen").val()+"</td>"+
			"<td>日元</td>"+
			"<td>"+$("#shi_shishen").val()+"</td>"+
			"</tr>"+
			"<tr>"+
			"<td><b>"+$("#zao").val()+"</b></td>"+	
			"<td ><b>"+$("#gz_year").val()+"</b></td>"+	
			"<td><b>"+$("#gz_month").val()+"</b></td>"+	
			"<td><b>"+$("#gz_day").val()+"</b></td>"+	
			"<td><b>"+$("#gz_hour").val()+"</b></td>"+	
			"</tr>"+
			"<tr>"+
				"<td class='row_head'>藏干</td>"+
				nianTD +yueTD +riTD +shiTD+
			"</tr>"+
		"</tbody>";
		$(".scbz").append(tab);
}
//获取十神信息
function getShiShen(){
	var gz_year =$("#gz_year").val().substring(0,1);
	var gz_month = $("#gz_month").val().substring(0,1);
	var gz_day = $("#gz_day").val().substring(0,1);
	var gz_hour = $("#gz_hour").val().substring(0,1);
	
	var nian,yue,riyuan,shi;
	//将天干转为五行
	nian = ganToXing(gz_year);
	yue  = ganToXing(gz_month);
	riyuan = ganToXing(gz_day);
	shi  = ganToXing(gz_hour);
		
	$("#nian_shishen").val(getWuXingBiJiao(riyuan,nian)) ;
	$("#yue_shishen").val(getWuXingBiJiao(riyuan,yue));
	$("#shi_shishen").val(getWuXingBiJiao(riyuan,shi));
}
//将天干转为阴阳五行
function ganToXing(tiangan){
	var tiangan_wuxing ={"甲":"阳木","乙":"阴木","丙":"阳火","丁":"阴火","戊":"阳土","己":"阴土","庚":"阳金","辛":"阴金","壬":"阳水","癸":"阴水"};
	var wuxing;
	for(var key in tiangan_wuxing){
		if(tiangan==key){
			wuxing = tiangan_wuxing[key] ;
		}
	}
	return wuxing;
}
//五行比较 
function getWuXingBiJiao(riyuan,duibi){
	var shishen = ['比肩','劫财','食神','伤官','偏财','正财','七杀','正官','偏印','正印'];//同性、异性
	var ret_shishen ;
	//阳
	if(riyuan == "阳木"){
		if(duibi == "阳木"){
			ret_shishen = shishen[0];
		}
		if(duibi == "阳火"){
			ret_shishen = shishen[2];
		}
		if(duibi == "阳土"){
			ret_shishen = shishen[4];
		}
		if(duibi == "阳金"){
			ret_shishen = shishen[6];
		}
		if(duibi == "阳水"){
			ret_shishen = shishen[8];
		}
		if(duibi == "阴木"){
			ret_shishen = shishen[1];
		}
		if(duibi == "阴火"){
			ret_shishen = shishen[3];
		}
		if(duibi == "阴土"){
			ret_shishen = shishen[5];
		}
		if(duibi == "阴金"){
			ret_shishen = shishen[7];
		}
		if(duibi == "阴水"){
			ret_shishen = shishen[9];
		}
	}
	if(riyuan == "阳火"){
		if(duibi == "阳木"){
			ret_shishen = shishen[8];
		}
		if(duibi == "阳火"){
			ret_shishen = shishen[0];
		}
		if(duibi == "阳土"){
			ret_shishen = shishen[2];
		}
		if(duibi == "阳金"){
			ret_shishen = shishen[4];
		}
		if(duibi == "阳水"){
			ret_shishen = shishen[6];
		}
		if(duibi == "阴木"){
			ret_shishen = shishen[9];
		}
		if(duibi == "阴火"){
			ret_shishen = shishen[1];
		}
		if(duibi == "阴土"){
			ret_shishen = shishen[3];
		}
		if(duibi == "阴金"){
			ret_shishen = shishen[5];
		}
		if(duibi == "阴水"){
			ret_shishen = shishen[7];
		}
	}
	if(riyuan == "阳土"){
		if(duibi == "阳木"){
			ret_shishen = shishen[6];
		}
		if(duibi == "阳火"){
			ret_shishen = shishen[8];
		}
		if(duibi == "阳土"){
			ret_shishen = shishen[0];
		}
		if(duibi == "阳金"){
			ret_shishen = shishen[2];
		}
		if(duibi == "阳水"){
			ret_shishen = shishen[4];
		}
		if(duibi == "阴木"){
			ret_shishen = shishen[7];
		}
		if(duibi == "阴火"){
			ret_shishen = shishen[9];
		}
		if(duibi == "阴土"){
			ret_shishen = shishen[1];
		}
		if(duibi == "阴金"){
			ret_shishen = shishen[3];
		}
		if(duibi == "阴水"){
			ret_shishen = shishen[5];
		}
	}
	if(riyuan == "阳金"){
		if(duibi == "阳木"){
			ret_shishen = shishen[4];
		}
		if(duibi == "阳火"){
			ret_shishen = shishen[6];
		}
		if(duibi == "阳土"){
			ret_shishen = shishen[8];
		}
		if(duibi == "阳金"){
			ret_shishen = shishen[0];
		}
		if(duibi == "阳水"){
			ret_shishen = shishen[2];
		}
		if(duibi == "阴木"){
			ret_shishen = shishen[5];
		}
		if(duibi == "阴火"){
			ret_shishen = shishen[7];
		}
		if(duibi == "阴土"){
			ret_shishen = shishen[9];
		}
		if(duibi == "阴金"){
			ret_shishen = shishen[1];
		}
		if(duibi == "阴水"){
			ret_shishen = shishen[3];
		}
	}
	if(riyuan == "阳水"){
		if(duibi == "阳木"){
			ret_shishen = shishen[2];
		}
		if(duibi == "阳火"){
			ret_shishen = shishen[4];
		}
		if(duibi == "阳土"){
			ret_shishen = shishen[6];
		}
		if(duibi == "阳金"){
			ret_shishen = shishen[8];
		}
		if(duibi == "阳水"){
			ret_shishen = shishen[0];
		}
		if(duibi == "阴木"){
			ret_shishen = shishen[3];
		}
		if(duibi == "阴火"){
			ret_shishen = shishen[5];
		}
		if(duibi == "阴土"){
			ret_shishen = shishen[7];
		}
		if(duibi == "阴金"){
			ret_shishen = shishen[9];
		}
		if(duibi == "阴水"){
			ret_shishen = shishen[1];
		}
	}
	//阴
	if(riyuan == "阴木"){
		if(duibi == "阳木"){
			ret_shishen = shishen[1];
		}
		if(duibi == "阳火"){
			ret_shishen = shishen[3];
		}
		if(duibi == "阳土"){
			ret_shishen = shishen[5];
		}
		if(duibi == "阳金"){
			ret_shishen = shishen[7];
		}
		if(duibi == "阳水"){
			ret_shishen = shishen[9];
		}
		if(duibi == "阴木"){
			ret_shishen = shishen[0];
		}
		if(duibi == "阴火"){
			ret_shishen = shishen[2];
		}
		if(duibi == "阴土"){
			ret_shishen = shishen[4];
		}
		if(duibi == "阴金"){
			ret_shishen = shishen[6];
		}
		if(duibi == "阴水"){
			ret_shishen = shishen[8];
		}
	}
	if(riyuan == "阴火"){
		if(duibi == "阳木"){
			ret_shishen = shishen[9];
		}
		if(duibi == "阳火"){
			ret_shishen = shishen[1];
		}
		if(duibi == "阳土"){
			ret_shishen = shishen[3];
		}
		if(duibi == "阳金"){
			ret_shishen = shishen[5];
		}
		if(duibi == "阳水"){
			ret_shishen = shishen[7];
		}
		if(duibi == "阴木"){
			ret_shishen = shishen[8];
		}
		if(duibi == "阴火"){
			ret_shishen = shishen[0];
		}
		if(duibi == "阴土"){
			ret_shishen = shishen[2];
		}
		if(duibi == "阴金"){
			ret_shishen = shishen[4];
		}
		if(duibi == "阴水"){
			ret_shishen = shishen[6];
		}
	}
	if(riyuan == "阴土"){
		if(duibi == "阳木"){
			ret_shishen = shishen[7];
		}
		if(duibi == "阳火"){
			ret_shishen = shishen[9];
		}
		if(duibi == "阳土"){
			ret_shishen = shishen[1];
		}
		if(duibi == "阳金"){
			ret_shishen = shishen[3];
		}
		if(duibi == "阳水"){
			ret_shishen = shishen[5];
		}
		if(duibi == "阴木"){
			ret_shishen = shishen[6];
		}
		if(duibi == "阴火"){
			ret_shishen = shishen[8];
		}
		if(duibi == "阴土"){
			ret_shishen = shishen[0];
		}
		if(duibi == "阴金"){
			ret_shishen = shishen[2];
		}
		if(duibi == "阴水"){
			ret_shishen = shishen[4];
		}
	}
	if(riyuan == "阴金"){
		if(duibi == "阳木"){
			ret_shishen = shishen[5];
		}
		if(duibi == "阳火"){
			ret_shishen = shishen[7];
		}
		if(duibi == "阳土"){
			ret_shishen = shishen[9];
		}
		if(duibi == "阳金"){
			ret_shishen = shishen[1];
		}
		if(duibi == "阳水"){
			ret_shishen = shishen[3];
		}
		if(duibi == "阴木"){
			ret_shishen = shishen[4];
		}
		if(duibi == "阴火"){
			ret_shishen = shishen[6];
		}
		if(duibi == "阴土"){
			ret_shishen = shishen[8];
		}
		if(duibi == "阴金"){
			ret_shishen = shishen[0];
		}
		if(duibi == "阴水"){
			ret_shishen = shishen[2];
		}
	}
	if(riyuan == "阴水"){
		if(duibi == "阳木"){
			ret_shishen = shishen[3];
		}
		if(duibi == "阳火"){
			ret_shishen = shishen[5];
		}
		if(duibi == "阳土"){
			ret_shishen = shishen[7];
		}
		if(duibi == "阳金"){
			ret_shishen = shishen[9];
		}
		if(duibi == "阳水"){
			ret_shishen = shishen[1];
		}
		if(duibi == "阴木"){
			ret_shishen = shishen[2];
		}
		if(duibi == "阴火"){
			ret_shishen = shishen[4];
		}
		if(duibi == "阴土"){
			ret_shishen = shishen[6];
		}
		if(duibi == "阴金"){
			ret_shishen = shishen[8];
		}
		if(duibi == "阴水"){
			ret_shishen = shishen[0];
		}
	}
	return ret_shishen;
}
//起运
function getQiYun(){
	var yang = ['甲','丙','戊','庚','壬'];
	var yin = ['乙','丁','己','辛','癸'];
	var qianjie_day = $("#qianjie_day").val();
	var houjie_day = $("#houjie_day").val();
	var  date = $("#date1").val();
	var g_year,g_month,g_day,qiyun_nian,qiyun_yue;
	var arr = date.split("-");
	g_day = arr[2];
	var tiangan = $("#gz_year").val().substring(0,1);
	var zao = $("#zao").val();
	var shunxu;
	if(zao=="乾造"){
		if(yang.indexOf(tiangan) != -1){
			qiyun_nian = (Number(houjie_day)-Number(g_day));
			qiyun_yue = qiyun_nian%3;
			qiyun_nian = (qiyun_nian-qiyun_yue) / 3;//三天为1年
			qiyun_yue = qiyun_yue * 4;//一天为4个月，一小时为5天
			shunxu="顺";
		}
		if(yin.indexOf(tiangan)!= -1){
			qiyun_nian = (Number(g_day)-Number(qianjie_day)) ;
			qiyun_yue = qiyun_nian%3;
			qiyun_nian = (qiyun_nian-qiyun_yue) / 3;//三天为1年
			qiyun_yue = qiyun_yue * 4;//一天为4个月，一小时为5天
			shunxu="逆";
		}
	}
	if(zao=="坤造"){
		if(yang.indexOf(tiangan)!= -1){
			qiyun_nian = (Number(g_day)-Number(qianjie_day));
			qiyun_yue = qiyun_nian%3;
			qiyun_nian = (qiyun_nian-qiyun_yue) / 3;//三天为1年
			qiyun_yue = qiyun_yue * 4;//一天为4个月，一小时为5天
			shunxu="逆";
		}
		if(yin.indexOf(tiangan)!= -1){
			qiyun_nian = (Number(houjie_day)-Number(g_day));
			qiyun_yue = qiyun_nian%3;
			qiyun_nian = (qiyun_nian-qiyun_yue) / 3;//三天为1年
			qiyun_yue = qiyun_yue * 4;//一天为4个月，一小时为5天
			shunxu="顺";
		}
	}
	//如何是负数获取绝对值
	qiyun_nian = Math.abs(qiyun_nian);
	qiyun_yue = Math.abs(qiyun_yue);
	$("#qiYunData").val(qiyun_nian);
	$("#qiyun").append(qiyun_nian+"岁"+qiyun_yue+"月");
	//大运排盘
	var daYunArr =  paiDaYun(shunxu);
	var dayunDiv="";
	var nianfen =Number(arr[0]) ;
	for(var i=0;i<daYunArr.length;i++){
		nianfen += Number(qiyun_nian);
		dayunDiv +="<div class='dayunDiv'>"+ daYunArr[i]+"<p>"+ nianfen +"</p> </div>";
	}
	$("#dayun").append(dayunDiv);
}
//藏干
function getCangGan(dizhi,tiangan){
	var canggan = {'子':'癸','午':'丁、己','卯':'乙','酉':'辛','寅':'甲、丙、戊','申':'庚、壬、戊','巳':'丙、庚、戊','亥':'壬、甲','辰':'戊、乙、癸','戌':'戊、辛、丁','丑':'己、癸、辛','未':'己、丁、乙'};
	var canganList;
	for(var key in canggan){
		if(dizhi==key){
			canganList = canggan[key] ;
		}
	}
	var arr =[];
	if(canganList.indexOf("、")){
		arr =canganList.split("、");
	}else{
		arr = canganList;
	}
	var wuxingArr = [];
	//获取五行阴阳
	for(let i = 0; i < arr.length; i++){
		wuxingArr.push(ganToXing(arr[i]));
	}
	var shishen = [];
	//获取十神
	var tianganWuxing = ganToXing(tiangan);
	for(let i = 0; i < wuxingArr.length;i++){
		shishen.push( getWuXingBiJiao(tianganWuxing,wuxingArr[i]) );
	}
	
	var retArr=[];
	for(let i = 0; i < arr.length; i++){
		retArr.push(arr[i]+shishen[i]);
	}
	return retArr;
} 
//大运-排十步大运
function paiDaYun(shunxu){
	var tiangan=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
	var dizhi=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
	var qiYunData = $("#qiYunData").val();
	var gz_month  =$("#gz_month").val();
	var yue_gan = gz_month.substring(0,1);
	var yue_zhi = gz_month.substring(1,2);
	var yuegan_biao,yuezhi_biao;
	yuegan_biao = tiangan.indexOf(yue_gan);
	yuezhi_biao = dizhi.indexOf(yue_zhi);
	var daYunArr=[];
	if(shunxu=="顺"){
		for(var i =1 ;i<=10;i++){
			var t_biao = Number(yuegan_biao)+i;
			if(t_biao>9){
				t_biao = t_biao-9;
			}
			var d_biao = Number(yuezhi_biao)+i;
			if(d_biao>11){
				d_biao = d_biao-11;
			}
			daYunArr.push(tiangan[t_biao] +""+ dizhi[d_biao]);
		}
	}
	if(shunxu=="逆"){
		for(var i =0 ;i<=10;i++){
			if(i!=0){
				var t_biao = Number(yuegan_biao)-i;
				if(t_biao<0){
					t_biao = Number(t_biao)+10;
				}
				var d_biao = Number(yuezhi_biao)-i;
				if(d_biao<0){
					d_biao = Number(d_biao)+12;
				}
				daYunArr.push(tiangan[t_biao] +""+ dizhi[d_biao]);
			}
		}
	}
	return daYunArr;
}