	//获取母宫卦五行
	function getWuXing(flagName){
		var bagua ={"乾":"阳阳阳","兑":"阴阳阳","离":"阳阴阳","震":"阴阴阳","巽":"阳阳阴","坎":"阴阳阴","艮":"阳阴阴","坤":"阴阴阴"};
		var wuxing ="";
		var mugong="";
		
		//外现
		//⚪⚪⚪ (第一个卦)
		if(flagName[0].substring(0,1)==flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)==flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)==flagName[flagName.length-1].substring(0,1)){
				mugong=flagName[0].substring(0,1)+flagName[1].substring(0,1)+flagName[2].substring(0,1);
		}
		//⚪⚪×（第二个卦）
		if(flagName[0].substring(0,1)==flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)==flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)!=flagName[flagName.length-1].substring(0,1)){
				mugong=flagName[0].substring(0,1)+flagName[1].substring(0,1)+flagName[2].substring(0,1);
		}
			//⚪××（第三个卦）
		if(flagName[0].substring(0,1)==flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)!=flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)!=flagName[flagName.length-1].substring(0,1)){
				mugong=flagName[0].substring(0,1)+flagName[1].substring(0,1)+flagName[2].substring(0,1);
		}
			//××× （第四个挂）
		if(flagName[0].substring(0,1)!=flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)!=flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)!=flagName[flagName.length-1].substring(0,1)){
				mugong=flagName[0].substring(0,1)+flagName[1].substring(0,1)+flagName[2].substring(0,1);
		}
		//内返
		//上四持世
		if(flagName[0].substring(0,1)!=flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)!=flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)==flagName[flagName.length-1].substring(0,1)){
				if(flagName[3].substring(0,1)=="阴"){
					flagName[3]="阳";
				}
				if(flagName[3].substring(0,1)=="阳"){
					flagName[3]="阴";
				}
				if(flagName[4].substring(0,1)=="阴"){
					flagName[4]="阳";
				}
				if(flagName[4].substring(0,1)=="阳"){
					flagName[4]="阴";
				}
				if(flagName[5].substring(0,1)=="阴"){
					flagName[5]="阳";
				}
				if(flagName[5].substring(0,1)=="阳"){
					flagName[5]="阴";
				}
				mugong=flagName[3]+flagName[4]+flagName[5];
		}
			//上五持世
		if(flagName[0].substring(0,1)!=flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)==flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)==flagName[flagName.length-1].substring(0,1)){
				if(flagName[3].substring(0,1)=="阴"){
					flagName[3]="阳";
				}
				if(flagName[3].substring(0,1)=="阳"){
					flagName[3]="阴";
				}
				if(flagName[4].substring(0,1)=="阴"){
					flagName[4]="阳";
				}
				if(flagName[4].substring(0,1)=="阳"){
					flagName[4]="阴";
				}
				if(flagName[5].substring(0,1)=="阴"){
					flagName[5]="阳";
				}
				if(flagName[5].substring(0,1)=="阳"){
					flagName[5]="阴";
				}
				mugong=flagName[3]+flagName[4]+flagName[5];
		}
			//上四持世
		if(flagName[0].substring(0,1)!=flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)==flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)!=flagName[flagName.length-1].substring(0,1)){
				if(flagName[3].substring(0,1)=="阴"){
					flagName[3]="阳";
				}
				if(flagName[3].substring(0,1)=="阳"){
					flagName[3]="阴";
				}
				if(flagName[4].substring(0,1)=="阴"){
					flagName[4]="阳";
				}
				if(flagName[4].substring(0,1)=="阳"){
					flagName[4]="阴";
				}
				if(flagName[5].substring(0,1)=="阴"){
					flagName[5]="阳";
				}
				if(flagName[5].substring(0,1)=="阳"){
					flagName[5]="阴";
				}
				mugong=flagName[3]+flagName[4]+flagName[5];
		}
		//内现
		if(flagName[0].substring(0,1)==flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)!=flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)==flagName[flagName.length-1].substring(0,1)){
				mugong=flagName[3]+flagName[4]+flagName[5];	
		}
		for ( var key in bagua) {   
			if(mugong == bagua[key]){
				if(key == "乾" || key == "兑"){
					wuxing="金";
				}
				if(key == "震" || key == "巽"){
					wuxing="木";
				}
				if(key == "坎"){
					wuxing="水";
				}
				if(key == "离"){
					wuxing="火";
				}
				if(key == "艮" || key == "坤"){
					wuxing="土";
				}
			}
		}
		return wuxing;
	}
	
	//六亲排盘
	function getLiuQin(wuxing,dizhi){
		var liuqin=new Array();
		var dizhi_wuxing = {"子":"水","丑":"土","寅":"木","卯":"木","辰":"土","巳":"火","午":"火","未":"土","申":"金","酉":"金","戌":"土","亥":"水"};
	
		var newDiZhi=new Array();
		//将地支转换成五行
		for(var i=0;i< dizhi.length;i++){
			for(var key in dizhi_wuxing){
				if(dizhi[i]==key){
					newDiZhi.push(dizhi_wuxing[key]) ;
					break;
				}
			}
		}
		
			if(wuxing=="金"){
				for(var j=0;j<newDiZhi.length;j++){
					if(newDiZhi[j]=="金"){
						liuqin.push("兄弟");
					}
					if(newDiZhi[j]=="木"){
						liuqin.push("妻财");
					}
					if(newDiZhi[j]=="水"){
						liuqin.push("子孙");
					}
					if(newDiZhi[j]=="火"){
						liuqin.push("官鬼");
					}
					if(newDiZhi[j]=="土"){
						liuqin.push("父母");
					}
				}
			}
			if(wuxing=="木"){
				for(var j=0;j<newDiZhi.length;j++){
					if(newDiZhi[j]=="金"){
						liuqin.push("官鬼");
					}
					if(newDiZhi[j]=="木"){
						liuqin.push("兄弟");
					}
					if(newDiZhi[j]=="水"){
						liuqin.push("父母");
					}
					if(newDiZhi[j]=="火"){
						liuqin.push("子孙");
					}
					if(newDiZhi[j]=="土"){
						liuqin.push("妻财");
					}
				}
			}
			if(wuxing=="水"){
				for(var j=0;j<newDiZhi.length;j++){
					if(newDiZhi[j]=="金"){
						liuqin.push("父母");
					}
					if(newDiZhi[j]=="木"){
						liuqin.push("子孙");
					}
					if(newDiZhi[j]=="水"){
						liuqin.push("兄弟");
					}
					if(newDiZhi[j]=="火"){
						liuqin.push("妻财");
					}
					if(newDiZhi[j]=="土"){
						liuqin.push("官鬼");
					}
				}
			}
			if(wuxing=="火"){
				for(var j=0;j<newDiZhi.length;j++){
					if(newDiZhi[j]=="金"){
						liuqin.push("妻财");
					}
					if(newDiZhi[j]=="木"){
						liuqin.push("父母");
					}
					if(newDiZhi[j]=="水"){
						liuqin.push("官鬼");
					}
					if(newDiZhi[j]=="火"){
						liuqin.push("兄弟");
					}
					if(newDiZhi[j]=="土"){
						liuqin.push("子孙");
					}
				}
			}
			if(wuxing=="土"){
				for(var j=0;j<newDiZhi.length;j++){
					if(newDiZhi[j]=="金"){
						liuqin.push("子孙");
					}
					if(newDiZhi[j]=="木"){
						liuqin.push("官鬼");
					}
					if(newDiZhi[j]=="水"){
						liuqin.push("妻财");
					}
					if(newDiZhi[j]=="火"){
						liuqin.push("父母");
					}
					if(newDiZhi[j]=="土"){
						liuqin.push("兄弟");
					}
				}
			}
		return liuqin;
	}
	
	
	//地支排盘    例如： ["阴变","阴变","阳","阳","阳","阳"]
	function dizhipaipan(myLiuYao){
		var bagua ={"乾":"阳阳阳","兑":"阴阳阳","离":"阳阴阳","震":"阴阴阳","巽":"阳阳阴","坎":"阴阳阴","艮":"阳阴阴","坤":"阴阴阴"};
		
		var  myDiZhi= new Array();
		if(myLiuYao.length>0 &&myLiuYao.length==6){
			var  shangyao = myLiuYao[0].substring(0,1)+myLiuYao[1].substring(0,1)+myLiuYao[2].substring(0,1);
			var  xiayao = myLiuYao[3].substring(0,1)+myLiuYao[4].substring(0,1)+myLiuYao[5].substring(0,1);
			for ( var key in bagua) {   
				if(shangyao == bagua[key]){
					if(key == "乾" || key == "震"){
						myDiZhi.push("戌");
						myDiZhi.push("申");
						myDiZhi.push("午");
					}
					if(key == "坎"){
						myDiZhi.push("子");
						myDiZhi.push("戌");
						myDiZhi.push("申");
					}
					if(key == "艮"){
						myDiZhi.push("寅");
						myDiZhi.push("子");
						myDiZhi.push("戌");
					}
					if(key == "巽"){
						myDiZhi.push("卯");
						myDiZhi.push("巳");
						myDiZhi.push("未");
					}
					if(key == "离"){
						myDiZhi.push("巳");
						myDiZhi.push("未");
						myDiZhi.push("酉");
					}
					if(key == "兑"){
						myDiZhi.push("未");
						myDiZhi.push("酉");
						myDiZhi.push("亥");
					}
					if(key == "坤"){
						myDiZhi.push("酉");
						myDiZhi.push("亥");
						myDiZhi.push("丑");
					}
				}
				
			}
			for ( var key in bagua) {   
				if(xiayao == bagua[key]){
					if(key == "乾" || key == "震"){
						myDiZhi.push("辰");
						myDiZhi.push("寅");
						myDiZhi.push("子");
					}
					if(key == "坎"){
						myDiZhi.push("午");
						myDiZhi.push("辰");
						myDiZhi.push("寅");
					}
					if(key == "艮"){
						myDiZhi.push("申");
						myDiZhi.push("午");
						myDiZhi.push("辰");
					}
					if(key == "巽"){
						myDiZhi.push("酉");
						myDiZhi.push("亥");
						myDiZhi.push("丑");
					}
					if(key == "离"){
						myDiZhi.push("亥");
						myDiZhi.push("丑");
						myDiZhi.push("卯");
					}
					if(key == "兑"){
						myDiZhi.push("丑");
						myDiZhi.push("卯");
						myDiZhi.push("巳");
					}
					if(key == "坤"){
						myDiZhi.push("卯");
						myDiZhi.push("巳");
						myDiZhi.push("未");
					}
					
				}
			}
		}
		
		return myDiZhi;
	}
	
	//八卦-画法
	function getBagua(flagName){
		var  myLiuYaoNew= new Array();
		var  myLiuYao= new Array();
		var  myLiuYaoTwo= new Array();
		//如果是阴，拼接“ - - ” 如果是阳拼接“——” 如果是阴变“- - ×” 如果是阳变“—— ·”
		if(flagName.length>0){
			var shi="";
			var ying="";
			//添加世应 ⚪⚪⚪ 上爻世 三爻应
			//⚪⚪⚪ 上爻世 三爻应
			if(flagName[0].substring(0,1)==flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)==flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)==flagName[flagName.length-1].substring(0,1)){
				shi = flagName.length-6;
				ying = flagName.length-3;
			}
			//下一持世  ⚪⚪×
			if(flagName[0].substring(0,1)==flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)==flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)!=flagName[flagName.length-1].substring(0,1)){
				shi = flagName.length-1;
				ying =flagName.length-4;
				
			}
			//下二持世 ⚪××
			if(flagName[0].substring(0,1)==flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)!=flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)!=flagName[flagName.length-1].substring(0,1)){
				shi = flagName.length-2;
				ying =flagName.length-5;
			}
			//下三持世 ×××
			if(flagName[0].substring(0,1)!=flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)!=flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)!=flagName[flagName.length-1].substring(0,1)){
				shi = flagName.length-3;
				ying =flagName.length-6;
			}
			//上四持世
			if(flagName[0].substring(0,1)!=flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)!=flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)==flagName[flagName.length-1].substring(0,1)){
				shi = flagName.length-4;
				ying =flagName.length-1;
			}
			//上五持世
			if(flagName[0].substring(0,1)!=flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)==flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)==flagName[flagName.length-1].substring(0,1)){
				shi = flagName.length-5;
				ying =flagName.length-2;
			}
			//上四持世
			if(flagName[0].substring(0,1)!=flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)==flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)!=flagName[flagName.length-1].substring(0,1)){
				shi = flagName.length-4;
				ying =flagName.length-1;
			}
			//下三持世
			if(flagName[0].substring(0,1)==flagName[flagName.length-3].substring(0,1) &&flagName[1].substring(0,1)!=flagName[flagName.length-2].substring(0,1) &&flagName[2].substring(0,1)==flagName[flagName.length-1].substring(0,1)){
				shi = flagName.length-3;
				ying =flagName.length-6;
			}
			for(var i=0;i<flagName.length;i++){
				
				if(flagName[i]=="阴"){
					if(i==shi){
						myLiuYao.push("- - 世");
						myLiuYaoTwo.push("-  - ");
					}else if(i==ying){
						myLiuYao.push("- - 应");
						myLiuYaoTwo.push("-  -");
					}else{
						myLiuYao.push("-  -");
						myLiuYaoTwo.push("-  -");
					}
				}
				if(flagName[i]=="阳"){
					if(i==shi){
						myLiuYao.push(" ——  世");
						myLiuYaoTwo.push(" —— ");
					}else if(i==ying){
						myLiuYao.push(" ——  应");
						myLiuYaoTwo.push(" —— ");
					}else{
						myLiuYao.push(" —— ");
						myLiuYaoTwo.push(" —— ");
					}
				}
				if(flagName[i]=="阴变"){
					if(i==shi){
						myLiuYao.push(" - - × 世 -->");
						myLiuYaoTwo.push(" —— ");
					}else if(i==ying){
						myLiuYao.push(" - - × 应 -->");
						myLiuYaoTwo.push(" —— ");
					}else{
						myLiuYao.push("- - ×  -->");
						myLiuYaoTwo.push(" —— ");
					}
				}
				if(flagName[i]=="阳变"){
					if(i==shi){
						myLiuYao.push(" —— · 世 -->");
						myLiuYaoTwo.push("-  -");
					}else if(i==ying){
						myLiuYao.push(" —— · 应 -->");
						myLiuYaoTwo.push("-  -");
					}else{
						myLiuYao.push(" —— ·  -->");
						myLiuYaoTwo.push("-  -");
					}
					
				}
			}
			var flag=false;
			//判断本卦中是否有变爻
			for(var len=0;len<flagName.length;len++){
				if(flagName[len]=="阳变"||flagName[len]=="阴变"){
					flag=true;
				}
			}
			//如果没有变爻，将之卦清空
			if(!flag){
				myLiuYaoTwo.splice(0,myLiuYaoTwo.length);
			}
		}
		myLiuYaoNew.push(myLiuYao);
		myLiuYaoNew.push(myLiuYaoTwo);
		return myLiuYaoNew;
	}
	
	//六神排盘
	function getLiuShen(day){
		var rLiushen="";
		
		//根据日辰查找六神
		var tiangan=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
		var liushen=["青龙","朱雀","勾陈","腾蛇","白虎","玄武"];
		for(var i=0;i<tiangan.length;i++){
			if(tiangan[i]==day.substring(0,1)){
				if(tiangan[i]=="甲" || tiangan[i]=="乙"){
					rLiushen=liushen[0];
					break  ;
				}
				if(tiangan[i]=="丙" || tiangan[i]=="丁"){
					rLiushen=liushen[1];
					break  ;
				}
				if(tiangan[i]=="戊"){
					rLiushen=liushen[2];
					break  ;
				}
				if(tiangan[i]=="己"){
					rLiushen=liushen[3];
					break  ;
				}
				if(tiangan[i]=="庚" || tiangan[i]=="辛"){
					rLiushen=liushen[4];
					break  ;
				}
				if(tiangan[i]=="壬" || tiangan[i]=="癸"){
					rLiushen=liushen[5];
					break  ;
				}
			}
		}
		var  myLiuShen= new Array();
		if(rLiushen!="" &&rLiushen!=null &&rLiushen!=undefined){
			for(var n=0;n<liushen.length;n++){
				if(rLiushen==liushen[n]){
					//将六神重新排列
					var hou = liushen.splice(n,liushen.length);
					var qian = liushen.splice(0,n);
					liushen.splice(0,liushen.length);
					liushen=hou.concat(qian);
					break;
				}
			}
			//重新赋值
			for(var m=liushen.length-1,o=0;m>=0;m--,o++){
				myLiuShen[o]=liushen[m];
			}
			
		}
		return myLiuShen;
	}
	
	//得到之卦的数组
	function getzhigua(bengua){
		var zhigua=new Array();
		for(var i=0;i<bengua.length;i++){
			if(bengua[i]=="阳变"){
				zhigua.push("阴");
			}else if(bengua[i]=="阴变"){
				zhigua.push("阳");
			}else{
				zhigua.push(bengua[i]);
			}
		}
		return zhigua;
	}
	
	//校验输入的硬币结果	
	function  jiaoyan(flagName,number){
		//阴
			var yin =["正正反","正反正","反正正"];
			//阳
			var yang = ["反反正","反正反","正反反"];
			//阴变
			var yinbian = "反反反";
			//阳变
			var yangbian = "正正正";
			//判断输入结果
			if(flagName.length<=3){
				//如果是一个字
				if(flagName.length==1){
					if(flagName!="阳" && flagName!="阴"){
						alert("第"+number+"次正反:输入有误！");
						return false;
					}else{
						return flagName;
					}
				}
				//如果是两个字
				if(flagName.length==2){
					
					if(flagName!="阳变" && flagName!="阴变"){
						alert("第"+number+"次正反:输入有误！");
						return false;
					}else{
						return flagName;
					}
				}
				//如果是三个字
				if(flagName.length==3){
					if(yinbian==flagName){
						flagName="阴变";
						return flagName;
					}
					if(yangbian==flagName){
						flagName="阳变";
						return flagName;
					}
					for(j = 0; j < yin.length; j++) {
   						if(flagName==yin[j]){
   							flagName="阴";
   							return flagName; 
   						}
					} 
					for(k = 0; k < yang.length; k++) {
   						if(flagName==yang[k]){
   							flagName="阳";
   							return flagName;
   						}
					} 
				alert("第"+number+"次正反:输入有误！");
				return false;
				}
			}else{
				alert("第"+number+"次正反:输入有误！");
				return false;
			}
	};