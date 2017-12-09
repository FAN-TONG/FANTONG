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
				loginheader.hide();
				loginmain.hide();
				userheader.display();
				ordermain.initialize();
				ordermain.display();
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
		upordown:"down",
	},
	entity:{},
	messageinput:function(obj){
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
			window.alert("检测登陆状态并依据情况允许进入登陆页面");
			if(1){
				//先默认不让进
				userheader.hide();
				ordermain.hide();
				loginheader.display();
				loginmain.display();
			}
		};
		userheader.entity.getElementsByClassName("user_text")[0].onclick=function(){
			if(userheader.message.upordown=="down"){
				window.alert("将要显示选桌信息，蛤蛤");
				userheader.entity.getElementsByTagName("span")[0].innerHTML="▲";
				userheader.message.upordown="up";
			}
			else{
				window.alert("将要收起选桌信息，蛤蛤");
				userheader.entity.getElementsByTagName("span")[0].innerHTML="▼";
				userheader.message.upordown="down";	
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

// 一个重要的想法，需要一个中间虚拟的组件，用于存储登陆状态数据，对各个按钮的事件进行集中管制




setTimeout(function(){
	loginheader.initialize();
	loginmain.initialize();
	userheader.initialize();
	ordermain.initialize();
	orderfooter.initialize();
	orderfooter.display();
	userheader.display();
	ordermain.display();
},2000)