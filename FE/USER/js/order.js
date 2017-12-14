var loginheader = {
	message:{},
	entity:{},
	messageinput:function(obj){
		return;
	},
	messageoutput:function(obj){

	},
	display:function(){
		loginheader.entity.style.display = "block";
	},
	hide:function(){
		loginheader.entity.style.display = "none";
	},
	initialize:function(){
		loginheader.entity = document.getElementById("login_header");
		loginheader.entity.getElementsByTagName("button")[0].onclick = function(){
			window.alert("您还是选择了以咸鱼身份登陆系统!");
			loginheader.hide();
			loginmain.hide();
			userheader.display();
			ordermain.initialize();
			ordermain.display();
		};
	}
}
var loginmain = {
	message:{
		tel:"",
		ver:""
	},
	entity:{},
	messageinput:function(obj){
		return;
	},
	messageoutput:function(obj){

	},
	display:function(){
		loginmain.entity.style.display = "block";
	},
	hide:function(){
		loginmain.entity.style.display = "none";
	},
	initialize:function(){
		loginmain.entity = document.getElementById("login_main");
		loginmain.entity.getElementsByClassName("send_ver")[0].onclick = function(){
			loginmain.message.tel = document.getElementsByClassName("phone_number")[0].value;
			window.alert("即将对" + loginmain.message.tel + "发短消息");
			//需要更新ver变量
		};
		loginmain.entity.getElementsByClassName("login_button")[0].onclick = function(){
			if(loginmain.entity.getElementsByClassName("ver_number")[0].value==loginmain.message.ver){
				window.alert("用户" + loginmain.message.tel + "已正式登陆");
				maincontroller.messageinput({value:"initial"});
			}
			else{
				window.alert("Emmm,你的密码好像不对...");
			}
		};
		var winHeight;
		if (window.innerHeight)
			winHeight = window.innerHeight;
		else if ((document.body) && (document.body.clientHeight))
			winHeight = document.body.clientHeight;
		loginmain.entity.style.height = (winHeight - 80) + "px";
		loginmain.entity.style.position="absolute";
		loginmain.entity.style.top="80px";
		loginmain.entity.style.width="100%";
	}
}

var userheader = {
	message:{
		desknum:"",
		upordown:"up",
	},
	entity:{},
	messageinput:function(obj){
		switch(obj.type){
			case "slideup":
				userheader.message.upordown="up";
				userheader.entity.getElementsByTagName("span")[0].innerHTML=" ▼";
				break;
			case "desknum":
				userheader.message.desknum=obj.value;
				userheader.entity.getElementsByClassName("user_text")[0].innerHTML = userheader.message.desknum + userheader.entity.getElementsByClassName("user_text")[0].innerHTML;
				break;
		}
	},
	messageoutput:function(obj){

	},
	display:function(){
		userheader.entity.style.display = "block";
	},
	hide:function(){
		userheader.entity.style.display = "none";
	},
	initialize:function(){
		window.alert("从其他组件中获取桌号中...");
		userheader.entity=document.getElementById("user_header");
		userheader.entity.getElementsByClassName("user_text")[0].innerHTML=userheader.message.desknum+"桌"+'<span style="color:gray;font-size:16px">▼</span>';
		userheader.entity.getElementsByTagName("img")[0].onclick=function(){
			maincontroller.messageinput({value:"gotologin"});
		};
		userheader.entity.getElementsByClassName("user_text")[0].onclick=function(){
			if(userheader.message.upordown=="up"){
				window.alert("将要显示选桌信息，蛤蛤");
				tableselectslide.initialize();
				tableselectslide.display();
				userheader.entity.getElementsByTagName("span")[0].innerHTML=" ▲";
				userheader.message.upordown="down";
			}
			else{
				tableselectslide.hide();
				window.alert("将要收起选桌信息，蛤蛤");
				userheader.entity.getElementsByTagName("span")[0].innerHTML=" ▼";
				userheader.message.upordown="up";	
			}
		};
		userheader.entity.getElementsByClassName("user_check_ordered")[0].onclick=function(){
			window.alert("准备显示点菜信息");			
		};
	}
}

var ordermain ={
	message:[{name:"测试菜",status:"已上菜",price:"20"}],
	entity:{},
	messageinput:function(obj){
	},
	messageoutput:function(obj){
		switch(obj.type){
			case "totalprice":
				var t=0;
				for(dish in ordermain.message){
					t+=(ordermain.message[dish].price-0);
				}
				return {type:"totalprice",val:t};
		}
	},
	display:function(){
		ordermain.entity.style.display = "block";
	},
	hide:function(){
		ordermain.entity.style.display = "none";
	},
	initialize:function(){
		ordermain.entity=document.getElementById("order_main");
		var ul = ordermain.entity.getElementsByTagName("ul")[0];
		ul.innerHTML="";
		window.alert("从其他组件中重新获取菜数据中...");
		for(dish in ordermain.message){
			var dishli = document.createElement("li");
			dishli.setAttribute("class","clearfix");
			var foodname = document.createElement("div");
			var foodstatus = document.createElement("div");
			var foodprice = document.createElement("div");
			foodname.innerHTML=ordermain.message[dish].name;
			foodstatus.innerHTML=ordermain.message[dish].status;
			foodprice.innerHTML=ordermain.message[dish].price+"￥";
			foodname.setAttribute("class","food_name");
			if(dishli.status=="已上菜"){
				foodstatus.setAttribute("class","food_condition condition_ok");
			}
			else{
				foodstatus.setAttribute("class","food_condition condition_not");
			}
			foodprice.setAttribute("class","food_price");
			dishli.appendChild(foodname);
			dishli.appendChild(foodstatus);
			dishli.appendChild(foodprice);
			ul.appendChild(dishli);
			var winHeight;
			if (window.innerHeight)
				winHeight = window.innerHeight;
			else if ((document.body) && (document.body.clientHeight))
				winHeight = document.body.clientHeight;
			ordermain.entity.style.height = (winHeight - 160) + "px";
			ordermain.entity.style.position="absolute";
			ordermain.entity.style.top="80px";
			ordermain.entity.style.width="100%";
		}
	}
}

var orderfooter = {
	message:{total:""},
	entity:{},
	messageinput:function(obj){
		switch(obj.type){
			case "totalprice":
				orderfooter.message.total=obj.val;
				break;
		}
	},
	messageoutput:function(obj){
	},
	display:function(){
		orderfooter.entity.style.display = "block";
	},
	hide:function(){
		orderfooter.entity.style.display = "none";
	},
	initialize:function(){
		orderfooter.entity=document.getElementById("order_footer");
		window.alert("从菜单中获取数据重新计算中");
		orderfooter.messageinput(ordermain.messageoutput({type:"totalprice"}));
		orderfooter.entity.getElementsByTagName("span")[0].innerHTML="共计￥" + orderfooter.message.total;
		orderfooter.entity.getElementsByTagName("button")[0].onclick=function(){
			window.alert("付款结算中...");
		}
	}
}

var tableselectslide = {
	message:{
		tables:[0,1,2,3],
		select:0
	},
	entity:{},
	messageinput:function(obj){
		switch(obj.type){
			case "slidedown":
				tableselectslide.entity.style.display="block";
				break;
		}
	},
	messageoutput:function(obj){
	},
	display:function(){
		tableselectslide.entity.style.display = "block";
	},
	hide:function(){
		tableselectslide.entity.style.display = "none";
	},
	initialize:function(){
		tableselectslide.entity=document.getElementById("table_select_slide");
		tableselectslide.entity.getElementsByTagName("ul")[0].innerHTML="";
		window.alert("获取/更新所有桌数据以及选中桌数据中");
		var i;
		var ul = tableselectslide.entity.getElementsByTagName("ul")[0];
		for(i=0;i<tableselectslide.message.tables.length;i++){
			var li = document.createElement("li");
			if(tableselectslide.message.tables[i]==tableselectslide.message.select){
				li.setAttribute("class","table_selected");
			}
			li.onclick=function(){
				tableselectslide.message.select=this.innerHTML.replace("桌","");
				tableselectslide.hide();
				tableselectslide.initialize();
				userheader.messageinput({type:"slideup"});
			}
			li.innerHTML=tableselectslide.message.tables[i]+"桌";
			ul.appendChild(li);
		}
	}
}

// 一个重要的想法，需要一个中间虚拟的组件，用于存储登陆状态数据，对各个按钮的事件进行集中管制

var maincontroller = {
	message:{},//可以存一下用户用户登录信息
	entity:{},//虚拟的
	messageinput:function(obj){
		//只接受操作信息
		switch(obj.value){
			case "initial":
				window.alert("初始信息获取中,展示个临时的页面");
				groupinitialize(allset);
				grouphide(allset);
				groupdisplay(orderpagedisplay);
				break;
			case "gotologin":
				window.alert("检测登陆状态并依据情况允许进入登陆页面");
				if(1){
					grouphide(allset);
					groupinitialize(loginpagedatacore);
					groupdisplay(loginpagedisplay);
				}
				break;
		}
	},
	messageoutput:function(obj){
	}
}

function groupinitialize(entityset){
	var i;
	for(i=0;i<entityset.length;i++){
		entityset[i].initialize();
	}
}

function grouphide(entityset){
	var i;
	for(i=0;i<entityset.length;i++){
		entityset[i].hide();
	}
}

function groupdisplay(entityset){
	var i;
	for(i=0;i<entityset.length;i++){
		entityset[i].display();
	}
}

var allset = [loginheader,loginmain,userheader,ordermain,orderfooter,tableselectslide];

var loginpagedatacore = [loginheader,loginmain];
var loginpagedisplay = [loginheader,loginmain];

var orderpagedatacore = [tableselectslide,userheader,ordermain,orderfooter];
var orderpagedisplay = [userheader,ordermain,orderfooter];

maincontroller.messageinput({value:"initial"});

ready = window.alert;

function debug(num){
	if(!num){
		window.alert = function(){};
	}
	else{
		window.alert = ready;
	}
}