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
			maincontroller.messageinput("menu");
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
		loginmain.entity.style.height = (winHeight - 50) + "pt";
		loginmain.entity.style.position="absolute";
		loginmain.entity.style.top="50pt";
		loginmain.entity.style.width="100%";
	}
}

var userheader = {
	message:{
		desknum:"",
		upordown:"up",
		nextstatus:"已点"
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
			if(userheader.message.nextstatus=="已点"){
				window.alert("准备显示点菜信息");	
				userheader.message.nextstatus="点菜";
				userheader.entity.getElementsByClassName("user_check_ordered")[0].innerHTML="点菜";	
				maincontroller.messageinput({value:"order"});
			}
			else if(userheader.message.nextstatus=="点菜"){
				window.alert("准备显示菜单");
				userheader.message.nextstatus="已点";
				userheader.entity.getElementsByClassName("user_check_ordered")[0].innerHTML="已点";
				maincontroller.messageinput({value:"menu"});
			}	
		};
	}
}

var ordermain ={
	message:[{name:"测试菜",status:"已上菜",price:"20"},
			 {name:"测试菜",status:"已上菜",price:"20"},
			 {name:"测试菜",status:"已上菜",price:"20"},
			 {name:"测试菜",status:"已上菜",price:"20"},
			 {name:"测试菜",status:"已上菜",price:"20"},
			 {name:"测试菜",status:"已上菜",price:"20"},
			 {name:"测试菜",status:"已上菜",price:"20"},
			 {name:"测试菜",status:"已上菜",price:"20"},
			 {name:"测试菜",status:"已上菜",price:"20"}],
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
			foodprice.innerHTML=ordermain.message[dish].price+"¥";
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
			ordermain.entity.style.height = (winHeight - 90) + "pt";
			ordermain.entity.style.position="absolute";
			ordermain.entity.style.top="50pt";
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
		orderfooter.entity.getElementsByTagName("span")[0].innerHTML="共计¥" + orderfooter.message.total;
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

var selectmain ={
	message:{
		leftcnt:{
			type:[0,0,0,0,0,0,0,0,0],
		},
		rightcnt:{
			dish:{
				tj:[
					{
						name:"辣炒土豆丝",
						price:"20.00",
						count:0,
						src:"",
						id:""
					},
					{
						name:"辣炒菊花",
						price:"20.00",
						count:0,
						src:"",
						id:""
					},
					{
						name:"辣炒苦瓜",
						price:"20.00",
						count:0,
						src:"",
						id:""
					},
					{
						name:"辣炒藕片",
						price:"20.00",
						count:0,
						src:"",
						id:""
					},
					{
						name:"辣炒蛤蛤",
						price:"20.00",
						count:0,
						src:"",
						id:""
					}
				],
				cs:[],
				lc:[],
				yc:[],
				sc:[],
				zc:[],
				mc:[],
				xc:[],
				hc:[]
			}
		}
	},
	entity:{},
	messageinput:function(obj){

	},
	messageoutput:function(obj){
		switch(obj.type){
			case "total":
				var total=0;
				for(type in selectmain.message.rightcnt.dish){
					var index;
					switch(type){
						case "tj":index=0;break;
						case "cs":index=1;break;
						case "lc":index=2;break;
						case "yc":index=3;break;
						case "sc":index=4;break;
						case "zc":index=5;break;
						case "mc":index=6;break;
						case "xc":index=7;break;
						case "hc":index=8;break;
					}
					var arr = selectmain.message.rightcnt.dish[type];
					for(dishn in arr){
						var dish = arr[dishn];
						total+=(dish.price*dish.count);
					}
				}
				return total;
				break;
			case "list":
				var list = [];
				var price;
				var name;
				var id;
				var count;
				for(type in selectmain.message.rightcnt.dish){
					var index;
					switch(type){
						case "tj":index=0;break;
						case "cs":index=1;break;
						case "lc":index=2;break;
						case "yc":index=3;break;
						case "sc":index=4;break;
						case "zc":index=5;break;
						case "mc":index=6;break;
						case "xc":index=7;break;
						case "hc":index=8;break;
					}
					var arr = selectmain.message.rightcnt.dish[type];
					for(dishn in arr){
						var dish = arr[dishn];
						name=dish.name;
						count=dish.count;
						id=dish.id;
						price=(dish.price*dish.count);
						if(price==0){
							continue;
						}
						list.push({name:name,price:price,count:count,id:id});
					}
				}
				return list;
		}
	},
	display:function(){
		selectmain.entity.style.display = "block";
	},
	hide:function(){
		selectmain.entity.style.display = "none";
	},
	initialize:function(){
		window.alert("做个伸手党，向后台要菜数据中！");
		selectmain.entity=document.getElementById("select_main");
		var i;
		var typelist=document.getElementById("dish_style");
		for(i=0;i<9;i++){
			var li = typelist.getElementsByTagName("li")[i];
			li.getElementsByTagName("i")[0].innerHTML=selectmain.message.leftcnt.type[i];
			li.onclick=function(){window.alert("即将滑动到相应位置~");}
			if(selectmain.message.leftcnt.type[i]>0){
				li.getElementsByTagName("i")[0].style.display="block";
			}
		}
		for(type in selectmain.message.rightcnt.dish){
			var index;
			switch(type){
				case "tj":index=0;break;
				case "cs":index=1;break;
				case "lc":index=2;break;
				case "yc":index=3;break;
				case "sc":index=4;break;
				case "zc":index=5;break;
				case "mc":index=6;break;
				case "xc":index=7;break;
				case "hc":index=8;break;
			}
			var ul = document.getElementById("dish_list").getElementsByTagName("ul")[index];
			var arr = selectmain.message.rightcnt.dish[type];
			for(dishn in arr){
				var dish = arr[dishn];
				var elestr = '<li><img src="'
				            +dish.src 
				            +'"/><div><span>'
				            +dish.name  
				            +'</span><div><div>¥<span>'
				            +dish.price
				            +'</span></div><div><i>-</i><span>'
				            +dish.count
				            +'</span><i>+</i></div></div></div></li>';
				ul.innerHTML += elestr;
			}
		}
		var plus;
		plus = selectmain.entity.getElementsByTagName("i");
		for(i in plus){
			plus[i].onclick = function(){
				var name = this.parentNode.parentNode.parentNode.childNodes[0].innerHTML;
				var cntplace = this.parentNode.getElementsByTagName("span")[0];
				console.log(name);
				for(type in selectmain.message.rightcnt.dish){
					var index;
					switch(type){
						case "tj":index=0;break;
						case "cs":index=1;break;
						case "lc":index=2;break;
						case "yc":index=3;break;
						case "sc":index=4;break;
						case "zc":index=5;break;
						case "mc":index=6;break;
						case "xc":index=7;break;
						case "hc":index=8;break;
					}
					var arr = selectmain.message.rightcnt.dish[type];
					for(dishn in arr){
						var dish = arr[dishn];
						if(dish.name==name){
							console.log(dish);
							console.log(plus[i].innerHTML);
							if(this.innerHTML=="+"){
								cntplace.innerHTML++;
								dish.count++;
							}
							else{
								cntplace.innerHTML--;
								dish.count--;
							}
						}
					}	
				}	
			}	
		}
		var minus
		var winHeight;
		if (window.innerHeight)
			winHeight = window.innerHeight;
		else if ((document.body) && (document.body.clientHeight))
			winHeight = document.body.clientHeight;
		document.getElementById("dish_style").style.height = (winHeight - 90) + "pt";
		document.getElementById("dish_list").style.height = (winHeight - 90) + "pt";
		selectmain.entity.style.height = (winHeight - 90) + "pt";
		selectmain.entity.style.position="absolute";
		selectmain.entity.style.top="55pt";
		selectmain.entity.style.width="100%";
		window.alert("我的妈暂时不绑事件了，怂了");
	}
}

var selectfooter = {
	message:{
		image:"",
		upordown:"down"
	},
	entity:{},
	messageinput:function(obj){
		switch(obj.value){
			case "total":
				selectfooter.entity.getElementsByClassName("price_sum")[0].getElementsByTagName("span")[0].innerHTML="共计¥"+obj.value.total;
				break;
		}
	},
	messageoutput:function(obj){
	},
	display:function(){
		selectfooter.entity.style.display = "block";
	},
	hide:function(){
		selectfooter.entity.style.display = "none";
	},
	initialize:function(){
		window.alert("索要数据中，好吧我觉得应该都是空的，蛤蛤");
		selectfooter.entity = document.getElementById("select_footer");
		var ul = selectfooter.entity.getElementsByClassName("order_done_context")[0].getElementsByTagName("ul");
		ul.innerHTML="";
		window.alert("不初始化菜单，仅从外部控件接受并增加菜");
		selectfooter.entity.getElementsByClassName("food_car")[0].onclick = function(){
			if(selectfooter.message.upordown=="down"){
				var list = selectmain.messageoutput({type:"list"});
				var ul = selectfooter.entity.getElementsByClassName("order_done_context")[0].getElementsByTagName("ul")[0];
				ul.innerHTML="";
				var i;
				for(i=0;i<list.length;i++){
					var li = '<li class="clearfix">'
							+'<div class="food_name">'
							+list[i].name
							+'</div>'
							+'<div class="add_number">'
							+'</div>'
							+'<div class="food_price">'
							+"¥"
							+list[i].price
							+'</div>'
							+'</li>';
					ul.innerHTML += li;
				}
				selectfooter.entity.getElementsByClassName("order_done")[0].style.display = "block";
				selectfooter.message.upordown="up";
			}
			else{
				selectfooter.message.upordown="down";
				selectfooter.entity.getElementsByClassName("order_done")[0].style.display = "none";
			}			
		};
		selectfooter.entity.getElementsByClassName("order_done_tittle")[0].getElementsByTagName("button")[0].onclick=function(){
			window.alert("正在帮你重置中，蛤蛤");
		}
		selectfooter.entity.getElementsByClassName("account")[0].onclick = function(){
			window.alert("提交订单中...");
			maincontroller.messageinput({value:"sendorder"});
			window.alert("提交完订单后需要重置部分数据~");
		}
	}
}

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
				groupdisplay(selectpagedisplay);
				break;
			case "gotologin":
				window.alert("检测登陆状态并依据情况允许进入登陆页面");
				if(1){
					grouphide(allset);
					groupinitialize(loginpagedatacore);
					groupdisplay(loginpagedisplay);
				}
				break;
			case "menu":
				window.alert("前往菜单");
				grouphide(allset);
				groupdisplay(selectpagedisplay);
				break;
			case "order":
				window.alert("前往订单");
				grouphide(allset);
				groupdisplay(orderpagedisplay);
				break;
			case "sendorder":
				var arr=[];
				arr=selectmain.messageoutput({type:"list"});
				console.log(arr);
				window.alert("发送订单中")
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

var allset = [loginheader,loginmain,userheader,ordermain,orderfooter,tableselectslide,selectmain,selectfooter];

var loginpagedatacore = [loginheader,loginmain];
var loginpagedisplay = [loginheader,loginmain];

var orderpagedatacore = [tableselectslide,userheader,ordermain,orderfooter];
var orderpagedisplay = [userheader,ordermain,orderfooter];

var selectpagedatacore = [tableselectslide,userheader,selectmain,selectfooter];
var selectpagedisplay = [userheader,selectmain,selectfooter];

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