//======================可能用到的方法===================
//创建canvas元素
// var canvas = document.getElementById('canvas');
//获取上下文
// var context = canvas.getContext("2d");
//在x轴为10，y轴为10的位置画长为120，宽为80的长方形
//context.strokeRect(10,10,120,80);
//在x轴为120，y轴为120的位置画长为160，宽为100的长方形
//context.strokeRect(120,120,160,100);
//var rectangle=new Path2D();//构建对象
//rectangle.rect(10,10,50,50);//构建正方形
//var circle=new Path2D();//构建对象
//circle.arc(100,35,25,0,2*Math.PI);//构建原型
//context.stroke(rectangle);//画出对象 无填充的
//context.fill(circle);//画出对象  被填充的
//=======================全局变量========================
//创建canvas元素
var canvas = document.getElementById('canvas');
//线条
var path_name =null;
var pathPoints;
//画布的宽度和高度
var c_width=420 , c_height=460;
//不重复的随机数
var radonmarr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var radonmarr2 = [];
//画字母和数字
let poiu = [];
//获取当前数字所对应的字母
let poiulast = [];
//选择字母
let zimu = ['A', 'B', 'C', 'D', 'E'];
//每一题的id
var datanum = 1;
//1-5之间的随机数
var numnew = 0;
//答题计数
var dadui_count = 0;
var dacuo_count=0;
//定时器
var intervalId;
//======================优雅的分割线=====================

//页面加载执行
$(document).ready(function (){
    $(".btn1").on("click",function(){
        $("#mask").hide();
    })

    $("#myEnd").hide();
    $("#ok_all").on("click",function(){
        $("#myEnd").hide();
		//将倒计时恢复成1分钟
		$("#minute").text("01");
		//将置灰的按钮恢复
		$(".answerOptions").css("pointer-events","");  
		$("#nextQuestion").css("pointer-events",""); 
		//将计时器停止
		if(intervalId!=null||intervalId!="" ||intervalId!=undefined){
			//将计时器停止
			clearInterval(intervalId);
			intervalId=null;
		}
		//重新生成页面
		paintPaths();
    })
    //线条加载-获取不重复的随机数
    protoDel();
    //题目设置
    numnew = Math.round(Math.random()*(1-5)+5);
    $(".answer_title span").text(numnew);
    $(".shuzi_type li").css("background","")
    $(".heeader"+numnew).css("background","#caaa25")
});

//拼接时间
function daojishi( starttime,endtime) {
    var minute = document.getElementById("minute");
    var second = document.getElementById("second");
    intervalId = setInterval(function() {
        //倒计时结束
        if(starttime==0 && endtime==0){
            var dadui = $("#dadui").val();
            if(dadui<0){
				if(dadui_count==0){
					$("#dacuo_val").text("0");
				}else{
					$("#dadui_val").text(dadui_count);
				}
				if(dacuo_count==0){
					$("#dacuo_val").text("0");
				}else{
					$("#dacuo_val").text(dacuo_count);
				}
                $("#myEnd").show();
				//将选项和下一题按钮置灰
				$(".answerOptions").css("pointer-events","none"); 
				$("#nextQuestion").css("pointer-events","none"); 
				dadui_count=0;
				dacuo_count=0;
				return;
            }
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

        if(starttime<10) {
            minute.innerHTML =  "0" + starttime + " ";
        }else {
            minute.innerHTML =  starttime + " ";
        }
        if(endtime<10){
            second.innerHTML = "0" + endtime;
        }else {
            second.innerHTML = endtime + " ";
        }
    }, 1000)

}

//======================优雅的分割线=============================================
//获取一个不重复的随机数
function protoDel() {
	if(radonmarr.length > 0){
		var index = Math.floor((Math.random() * radonmarr.length));
		console.log(radonmarr);
		var temp = radonmarr[index];
		if(temp==undefined){
		    $("#myEnd").show();
		    $(".myMess")
		}
		console.log("temp="+temp);
		var num = radonmarr.indexOf(temp);//获取到取到值的索引
		if(num==-1){
		    num = 9;
		}
		console.log(num);
		radonmarr2 = radonmarr.splice(num,1);//删除后成为新的数组
		randomize(temp);
	}
    
}
//获取数据
function randomize(data) {
    let pathData = mydata[data];
    var objArr = transform(pathData)
    createPaths(objArr)
}
//对象转数组
function transform(obj) {
    var arr = [];
    for (var item in obj) {
        arr.push(obj[item]);
    }
    return arr;
}


//计算图形
function createPaths(newnum) {
    let points = [];
    path_name = new Path2D();
    pathPoints = new Path2D();
    for (var o = 0; o < newnum.length; o++) {
        points = newnum[o];
        var radius = 1.5;
        var size = points.length;//数组长度
        //头
        if (points.length > 0) {
            var header = points[0];//每次循环取数组中的第一个
            path_name.moveTo(header.x, header.y);//把路径移动到画布中的指定点，不创建线条
            pathPoints.moveTo(header.x + radius, header.y);
            pathPoints.arc(header.x, header.y, radius, 0, Math.PI * 2);//创建弧/曲线（用于创建圆形或部分圆）
        }
        //中间的内容
        var mids = [];
        for (var i = 0; i < size - 1; i++) {
            var mids_ap1 = points[i];
            var mids_ap2 = points[i + 1];
            mids.push({
                x: (mids_ap1.x + mids_ap2.x) / 2,
                y: (mids_ap1.y + mids_ap2.y) / 2
            });
        }
        for (var i = 1; i < size - 2; i++) {
            var mids_bp1 = points[i];
            var mids_bp2 = mids[i];
            path_name.quadraticCurveTo(mids_bp1.x, mids_bp1.y, mids_bp2.x, mids_bp2.y);//	创建二次贝塞尔曲线
        }
        //尾部
        var tailp1 = points[i];
        var tailp2 = points[i + 1];
        path_name.quadraticCurveTo(tailp1.x, tailp1.y, tailp2.x, tailp2.y);
        pathPoints.moveTo(tailp2.x + radius, tailp2.y);
        pathPoints.arc(tailp2.x, tailp2.y, radius, 0, Math.PI * 2);
        paintPaths();
        poiu.push(header);//顶部数字底部字母
        numberNumlast(tailp2);//正确答案
    }
}
//正确答案
function numberNumlast(tailp2) {
    let newobjadd = {};//重组对象
    let newarr = [];//重组数组
    poiulast.push(tailp2);
    if (poiulast.length == 5) {
        for (var i = 0; i < 5; i++) {
            newobjadd = {
                id: poiulast[i].x,
                name: i + 1,
                zimu: zimu[i]
            }
            newarr.push(newobjadd)
        }

        $(".daan_type").empty();
        let newpxobj = newarr.sort(sortId);
        let listtype = '';
        for (var p = 0; p < newpxobj.length; p++) {
            let htmldom = '<li data-num="'+newpxobj[p].name+'"id="'+datanum+'-'+p+'" class="active-li"><span>'+zimu[p]+'</span></li>';
            listtype +=  htmldom
        }
        let list_ul = '<ul class="answerOptions" id="'+datanum+'">'+listtype+'</ul>';
        $(".daan_type").append(list_ul);
    }
}
//数组对象排序
function sortId(a, b) {
    return a.id - b.id
}
//生成图形，调整样式
function paintPaths() {
    //获取上下文
    var context = canvas.getContext("2d");
    //清除指定的像素
    context.clearRect(0, 0, c_width, c_height);//clearRect(x, y, width, height)在给定的矩形内清除指定的像素
    //曲线样式
    context.shadowBlur = 5;
    context.fillStyle = "#111";
    context.shadowColor = "#666";
    context.lineWidth = 5;//	设置或返回当前的线条宽度
    context.shadowOffsetX = -1.5;
    context.shadowOffsetY = 1.5;
    context.stroke(path_name);//	绘制已定义的路径

    //圆点样式
    context.lineWidth = 10;
    context.fillStyle = "#111";//设置或返回用于填充绘画的颜色、渐变或模式
    context.shadowBlur = 0;
    context.shadowColor = "#666";
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fill(pathPoints);//填充当前绘图（路径）
    context.stroke(pathPoints);
}
//=====================优雅的分割线==============================
//点击选项
$("body").on("click", '.active-li', function () {
    $(this).siblings('li').removeClass("active"); // 删除其他兄弟元素的样式
    $(this).addClass("active");           // 添加当前元素的样式
    var button_count =$("#button_count").val();
    if(button_count < 0 ){
        //开始时间
        var starttime= $("#minute").text();
        // 结束时间
        var endtime="0";
        //启动倒计时
        daojishi(starttime,endtime);
        $("#button_count").val(1);
    }
    //答案对比
    //题目数字
    let neewyour =numnew;
    neewyour = Number(neewyour);
    //选择的
    let rightyour = $(this).attr("data-num");
    rightyour = Number(rightyour);
    if(rightyour == neewyour) {
        dadui_count++;
    }else{
		dacuo_count++;
	}
});
//点击下一题
function nextQuestionStart(){
    if(!$(".active-li").hasClass("active")) {
        alert("请选择答案");
        return false
    }
    //获取1-10之间的随机数
    numnew = Math.round(Math.random()*(1-5)+5);
    $(".shuzi_type li").css("background","");
    $(".heeader"+numnew).css("background","#caaa25");
	$(".daan_type li").css("background","");
	$(".active-li").removeClass("active");
    datanum = datanum + 1;//每点击下一组加一
    $(".answer_title span").text(numnew);//提交选项
    poiulast = [];//清空答案字母
    poiu = [];//清空文字
    protoDel();
}