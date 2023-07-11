//页面加载执行
$(document).ready(function (){
	$(".btn1").on("click",function(){
		//坐向
		var zuoxiang =$("#zuoxiang").val();
		if(zuoxiang==null || zuoxiang==""||zuoxiang=="undefined"){
			alert("请选择坐向！");
			return;
		}
		var demo2 = $("#demo2").val();
		if(demo2==null || demo2==""||demo2=="undefined"){
			alert("请选择排盘日期！");
			return;
		}
		//隐藏div
		$("#mask").hide();
	});
});

$("#db").click(function(){
	//$('#myModal').modal('show');/*当点击文本框的时候，要触发并显示模态框*/
	var date=new Date;
	var dangqian_nian = date.getFullYear();
	var dangqian_yue = date.getMonth()+1;
	let nianarr =  LoadNian(10);
	let yuenarr =  LoadYue();
	
	var _self = this;
	//阻止获得焦点
	document.activeElement.blur();
	_self.gearDate = document.createElement("div");
	_self.gearDate.className = "gearDate";
	
	var db_input = '<div class="date_ctrl slideInUp">' +
					'<div class="date_info_box lcalendar_info">' +
					'</div>';
	 for(var i=0;i<nianarr.length;i++ ){
		 db_input += '<div class="date_roll_mask">' +
                        '<div class="date_roll date_roll_minut">' +
                        '<div>' +
		 '<div>' +
		 '<div class="gear date_yy">'+nianarr[i]+'</div>' +
		 '<div class="date_grid">' +
		 '</div>' +
		 '</div>';
		for(var j=0;j<yuenarr.length;j++){
			db_input += '<div>' +
			'<div class="gear date_mm">'+yuenarr[j]+'</div>' +
			'<div class="date_grid">' +
			'</div>' +
			'</div>'; 
		}
	} 
	db_input += '<div class="date_btn_box">' +
	'<div class="date_btn lcalendar_cancel">取消</div>' +
	'<div class="date_btn lcalendar_finish">确定</div>' +
	'</div>' +
	'</div>';
	console.log(db_input);
	_self.gearDate.innerHTML =db_input;
	document.body.appendChild(_self.gearDate);
});
function LoadNian(nian){
	var date=new Date;
	var year=date.getFullYear(); //获取当前年份
	var str = [];
	for(var i=year-nian;i<year+nian;i++){
		str.push(i);
	}
	return str;
};
function LoadYue(){
	var str = [];
	for(var i=1;i<13;i++){
		str.push(i);
	}
	return str;
};