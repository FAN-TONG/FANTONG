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
			//window.alert("您还是选择了以空白身份登陆系统!");
			maincontroller.messageinput({value:"menu"});
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
		switch(obj.type){
			case "countdown":
				var btn = loginmain.entity.getElementsByClassName("send_ver")[0];
				btn.setAttribute("disabled","true");
				var i = 120;
				var q = setInterval(function(){
					i--;
					if(i==0){
						var btn = loginmain.entity.getElementsByClassName("send_ver")[0];
						btn.innerHTML="获取验证码";
						btn.removeAttribute("disabled");
						clearInterval(q);
						return;
					}
					else{
						var btn = loginmain.entity.getElementsByClassName("send_ver")[0];
						btn.innerHTML="请于" + i + "秒后重试";
					}
				},1000)
				break;
		}
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
			//window.alert("即将对" + loginmain.message.tel + "发短消息");
			$.post("http://www.ouctechnology.cn:9999/API/sendMessage.ashx",{tel:loginmain.message.tel},function(res){
				if(res['error_code']){
					window.alert("出错！" + res['error_code']);
				}
				loginmain.messageinput({type:"countdown"});
			})
			//需要更新ver变量
		};
		loginmain.entity.getElementsByClassName("login_button")[0].onclick = function(){
			var pwd = loginmain.entity.getElementsByClassName("ver_number")[0].value;
			console.log({tel:loginmain.message.tel,pwd:pwd});
			$.post("http://www.ouctechnology.cn:9999/API/userLogin.ashx",{tel:loginmain.message.tel,pwd:pwd},function(data){
				console.log(data);
				if(data["success"]=="1"){
					window.alert("登陆成功");//注意这是window.alert的变体
					$("#user_header > img")[0].setAttribute("src","./image/history.png");	
					maincontroller.message.tel = loginmain.message.tel;
					$.get("http://www.ouctechnology.cn:9999/API/getMemberdish.ashx?memberId=" + maincontroller.message.tel, function(data) {
						console.log(data);
						var dish = eval(data);
						console.log(dish);
						for (var i = 0; i < dish.length; i++) {
							//console.log(dish[i].name);
							var histerm = '<li><img src="' +
								dish[i].pic +
								'"/><div><span>' +
								dish[i].name +
								'</span><span>(' +
								dish[i].num +
								')</span></div></li>'

							$("#another_history")[0].innerHTML += histerm;
						}
						var ent = $("#another_history")[0];
						var winHeight;
						if (window.innerHeight)
							winHeight = window.innerHeight;
						else if ((document.body) && (document.body.clientHeight))
							winHeight = document.body.clientHeight;
						ent.style.height = (winHeight - 180) + "px";
						ent.style.position="absolute";
						ent.style.top="80px";
						ent.style.width="100%";
					})
					//historymain.display();
					historymain.message.refreshed = true;
					historymain.messageinput({type:"refresh"});
					maincontroller.messageinput({value:"menu"});
				}
				else{
					window.alert("登陆失败");
				}
			})
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
	message: {
		desknum: "",
		upordown: "up",
		nextstatus: "已点"
	},
	entity: {},
	messageinput: function(obj) {
		switch (obj.type) {
			case "slideup":
				userheader.message.upordown = "up";
				userheader.entity.getElementsByTagName("span")[0].innerHTML = " ▼";
				break;
			case "desknum":
				userheader.message.desknum = obj.value;
				userheader.entity.getElementsByClassName("user_text")[0].innerHTML = tableselectslide.message.select + '桌<span style="color:gray;font-size:16px"> ▼</span>';
				break;
			case "switchstatus":
				if (userheader.message.nextstatus == "已点") {
					//window.alert("准备显示点菜信息");
					userheader.message.nextstatus = "点菜";
					userheader.entity.getElementsByClassName("user_check_ordered")[0].innerHTML = "点菜";
					
				} else if (userheader.message.nextstatus == "点菜") {
					//window.alert("准备显示菜单");
					userheader.message.nextstatus = "已点";
					userheader.entity.getElementsByClassName("user_check_ordered")[0].innerHTML = "已点";
					
				}
				break;
		}
	},
	messageoutput: function(obj) {

	},
	display: function() {
		userheader.entity.style.display = "block";
	},
	hide: function() {
		userheader.entity.style.display = "none";
	},
	initialize: function() {
		//window.alert("从其他组件中获取桌号中...");
		userheader.entity = document.getElementById("user_header");
		userheader.entity.getElementsByClassName("user_text")[0].innerHTML = tableselectslide.message.select + "桌" + '<span style="color:gray;font-size:16px">▼</span>';
		userheader.entity.getElementsByTagName("img")[0].onclick = function() {
			if(maincontroller.message.tel=="")
				maincontroller.messageinput({value:"gotologin"});
			else{
				$("#another_history").toggle();
				if($("#user_header > img")[0].getAttribute("src")=="./image/history.png"){
					$("#user_header > img")[0].setAttribute("src","./image/back.png");
				}
				else{
					$("#user_header > img")[0].setAttribute("src","./image/history.png");	
				}
			}
		};
		userheader.entity.getElementsByClassName("user_text")[0].onclick = function() {
			if (userheader.message.upordown == "up") {
				//window.alert("将要显示选桌信息，蛤蛤");
				tableselectslide.initialize();
				tableselectslide.display();
				userheader.entity.getElementsByTagName("span")[0].innerHTML = " ▲";
				userheader.message.upordown = "down";
			} else {
				tableselectslide.hide();
				//window.alert("将要收起选桌信息，蛤蛤");
				userheader.entity.getElementsByTagName("span")[0].innerHTML = " ▼";
				userheader.message.upordown = "up";
				userheader.messageinput({
					type: "desknum"
				});
			}
			userheader.message.desknum = tableselectslide.message.select;
			
		};
		userheader.entity.getElementsByClassName("user_check_ordered")[0].onclick = function() {
			if (userheader.message.nextstatus == "已点") {
				//window.alert("准备显示点菜信息");
				userheader.message.nextstatus = "点菜";
				userheader.entity.getElementsByClassName("user_check_ordered")[0].innerHTML = "点菜";
				maincontroller.messageinput({
					value: "order"
				});
			} else if (userheader.message.nextstatus == "点菜") {
				//window.alert("准备显示菜单");
				userheader.message.nextstatus = "已点";
				userheader.entity.getElementsByClassName("user_check_ordered")[0].innerHTML = "已点";
				maincontroller.messageinput({
					value: "menu"
				});
			}
		};
	}
}
var ordermain ={
	message:[],
	entity:{},
	messageinput:function(obj){
		switch(obj.type){
			case "refresh_add":
				maincontroller.messageinput({value:"order"});
				break;
			case "remove":
				var id = obj.value;
				var lis = ordermain.entity.getElementsByTagName("ul")[0].getElementsByTagName("li");
				for(i=0;i<lis.length;i++){
					var li = lis[i];
					console.log(li.getAttribute("dish_id")+ " " + id);
					if(li.getAttribute("dish_id")==id){
						li.getElementsByClassName("food_condition")[0].setAttribute("class","food_condition condition_ok");
						li.getElementsByClassName("food_condition")[0].innerHTML = "已上菜";
					}
				}
				var i;
				for(i = 0;i < ordermain.message.length; i++){
					if(ordermain.message[i].id==obj.value){
						remove(ordermain.message,i);
					}
				}
				break;
		}
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
		for(dish in ordermain.message){
			var dishli = document.createElement("li");
			dishli.setAttribute("class","clearfix");
			var foodname = document.createElement("div");
			var foodstatus = document.createElement("div");
			var foodprice = document.createElement("div");
			foodname.innerHTML=ordermain.message[dish].name;
			foodstatus.innerHTML="未上菜"
			foodprice.innerHTML=ordermain.message[dish].price+"￥";
			foodname.setAttribute("class","food_name");
			foodstatus.setAttribute("class","food_condition condition_not");
			foodprice.setAttribute("class","food_price");
			dishli.setAttribute("dish_id",ordermain.message[dish].id);
			dishli.appendChild(foodname);
			dishli.appendChild(foodstatus);
			dishli.appendChild(foodprice);
			ul.appendChild(dishli);
		}
		var winHeight;
		if (window.innerHeight)
			winHeight = window.innerHeight;
		else if ((document.body) && (document.body.clientHeight))
			winHeight = document.body.clientHeight;
		ordermain.entity.style.height = (winHeight - 180) + "px";
		ordermain.entity.style.position="absolute";
		ordermain.entity.style.top="80px";
		ordermain.entity.style.width="100%";
	}
}
var orderfooter = {
	message: {
		total: "",
		paid: false
	},
	entity: {},
	messageinput: function(obj) {
		switch (obj.type) {
			case "totalprice":
				orderfooter.message.total = obj.val;
				break;
			case "neworder":
				orderfooter.message.paid = false;
				break;
		}
	},
	messageoutput: function(obj) {},
	display: function() {
		orderfooter.entity.style.display = "block";
	},
	hide: function() {
		orderfooter.entity.style.display = "none";
	},
	initialize: function() {
		orderfooter.entity = document.getElementById("order_footer");
		//window.alert("从菜单中获取数据重新计算中");
		orderfooter.messageinput(ordermain.messageoutput({
			type: "totalprice"
		}));
		orderfooter.entity.getElementsByTagName("span")[0].innerHTML = "共计￥" + orderfooter.message.total;
		/*if(maincontroller.message.tel!=""){
			orderfooter.message.total*=0.85;
		}
		if(maincontroller.message.tel!=""){
			orderfooter.entity.getElementsByTagName("span")[0].innerHTML += " （VIP专享8.5折）"
		}*/
		/*$.ajax({
 			type: 'POST',
 			url: "http://www.ouctechnology.cn:9999/API/dishPay.ashx?tableId",
  			data: {tableId:tableselectslide.message.select},
  			success: function(data){
  				if(data["res"]==true){
  					window.alert("付款成功");
  				}
  				else{
  					window.alert()
  				}
  			},
			error:function(data, XMLHttpRequest, textStatus, errorThrown) {
          	  console.log(XMLHttpRequest.status);
          	  console.log(XMLHttpRequest.readyState);
          	  console.log(textStatus);
        	}
		});*/

		orderfooter.entity.getElementsByTagName("button")[0].onclick = function() {
			if ((!orderfooter.message.paid) && ordermain.message.length == 0) {
				$.post("http://www.ouctechnology.cn:9999/API/dishPay.ashx?tableId", {
					tableId: tableselectslide.message.select
				}, function(data) {
					//window.alert(11111111);
					var s = data;
					//window.alert(s);
					if (s["res"]) {
						window.alert("付款成功");
						orderfooter.message.paid = true;history.go(0);
					} else {
						window.alert("付款时出现了不可知的错误");
					}
				})
			} else if (ordermain.message.length != 0) {
				window.alert("等待上菜完毕后才能结账");
			} else if (orderfooter.message.paid) {
				window.alert("您已结账");
			}
		}
	}
}
var tableselectslide = {
	message:{
		tables:[],
		select:""
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
		$.get("http://www.ouctechnology.cn:9999/API/getTableList.ashx",function(data){
			console.log(data);
			tableselectslide.message.tables=data;
			var i;
			var ul = tableselectslide.entity.getElementsByTagName("ul")[0];
			for(i=0;i<tableselectslide.message.tables.length;i++){
				var li = document.createElement("li");
				if(tableselectslide.message.tables[i]['id']==tableselectslide.message.select){
					li.setAttribute("class","table_selected");
				}
				li.onclick=function(){
					tableselectslide.message.select=this.innerHTML.replace("桌","");
					tableselectslide.hide();
					tableselectslide.initialize();
					userheader.message.desknum = tableselectslide.message.selecte;
					userheader.messageinput({type:"desknum"});
					userheader.messageinput({type:"slideup"});
				}
				li.innerHTML=tableselectslide.message.tables[i]['id']+"桌";
				ul.appendChild(li);
			}
		});
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
		//window.alert("菜单重新进入就会刷新");
		var is = $("#dish_list i");
		for(i=0;i<is.length;i++){
			if($(is[i]).text()=="-"&&$(is[i]).next().text()!=0){
				is[i].click();
				is[i].click();
				is[i].click();
				is[i].click();
				is[i].click();
				is[i].click();
				is[i].click();
				is[i].click();
				is[i].click();
				is[i].click();
				is[i].click();
				is[i].click();
				is[i].click();
				is[i].click();
			}
		}
	},
	hide:function(){
		selectmain.entity.style.display = "none";
	},
	initialize:function(){
		selectmain.entity=document.getElementById("select_main");
		//window.alert("做个伸手党，向后台要菜数据中！");
		$.get("http://www.ouctechnology.cn:9999/API/getDishList.ashx",function(data){
			selectmain.message.rightcnt.dish = data;
			var i;
			var typelist=document.getElementById("dish_style");
			for(i=0;i<9;i++){
				var li = typelist.getElementsByTagName("li")[i];
				li.getElementsByTagName("i")[0].innerHTML=selectmain.message.leftcnt.type[i];
				li.onclick=function(){
					$("#dish_style > li").removeClass("selected");
					$(this).addClass("selected");
					var i;
					var totalheight=0;
					for(i=0;$("#dish_style > li")[i]!=this;i++){
						totalheight+=$($("#dish_list > li")[i]).height();
					}
					console.log(totalheight);
					var a = document.getElementById("dish_list");
					a.scrollTo(0,totalheight);
				}
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
					dish.count = 0;
					var elestr = '<li><img src="'
					            +dish.pic
					            +'"/><div><span>'
					            +dish.name  
					            +'</span><div><div>￥<span>'
					            +dish.price
					            +'</span></div><div><i>-</i><span>'
					            +dish.count
					            +'</span><i>+</i></div></div></div></li>';
					ul.innerHTML += elestr;
					console.log(elestr);
				}
			}
			var plus;
			plus = selectmain.entity.getElementsByTagName("i");
			for(i in plus){
				plus[i].onclick = function(){
					var offset = $(".food_car").offset();
					var addcar = $(this);
					if ($(this)[0].innerHTML == '+') {
                	    var imger = $(addcar.parent().parent().parent().parent().find('img')[0]).attr('src');
                	    console.log($(this).parent().parent().parent().parent().find('img')[0]);
                	    var flyer = $('<img class="u-flyer" src="' + imger + '">');
                	    flyer.css("width", "120px");
                	    flyer.css("height", "120px");
                	    flyer.fly({
                	    	start: {
                	    		left: event.pageX - 120,
                	    		top: event.pageY - 120
                	    	},
                	    	end: {
                	    		left: offset.left + 10,
                	    		top: offset.top + 10,
                	    		width: 0,
                	    		height: 0
                	    	},
                	    });
                    }
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
									selectfooter.messageinput({type:"total",value:selectmain.messageoutput({type:"total"})});
									return;
								}
								else{
									cntplace.innerHTML--;
									dish.count--;
									if(dish.count<0){
										cntplace.innerHTML=0;
										dish.count=0;
									}
									//window.alert(selectmain.messageoutput({type:"total"}));
									selectfooter.messageinput({type:"total",value:selectmain.messageoutput({type:"total"})});
									return;
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
			document.getElementById("dish_style").style.height = (winHeight - 180) + "px";
			document.getElementById("dish_list").style.height = (winHeight - 180) + "px";
			selectmain.entity.style.height = (winHeight - 180) + "px";
			selectmain.entity.style.position="absolute";
			selectmain.entity.style.top="82px";
			selectmain.entity.style.width="100%";
			
		});
	}
}

var selectfooter = {
	message: {
		image: "",
		upordown: "down"
	},
	entity: {},
	messageinput: function(obj) {
		switch (obj.type) {
			case "total":
				selectfooter.entity.getElementsByClassName("price_sum")[0].getElementsByTagName("span")[0].innerHTML = "共计¥" + obj.value;
				break;
		}
	},
	messageoutput: function(obj) {},
	display: function() {
		selectfooter.entity.style.display = "block";
	},
	hide: function() {
		selectfooter.entity.style.display = "none";
	},
	initialize: function() {
		//window.alert("索要数据中，好吧我觉得应该都是空的，蛤蛤");
		selectfooter.entity = document.getElementById("select_footer");
		var ul = selectfooter.entity.getElementsByClassName("order_done_context")[0].getElementsByTagName("ul");
		ul.innerHTML = "";
		//window.alert("不初始化菜单，仅从外部控件接受并增加菜");
		selectfooter.entity.getElementsByClassName("food_car")[0].onclick = function() {
			if (selectfooter.message.upordown == "down") {
				var list = selectmain.messageoutput({
					type: "list"
				});
				var ul = selectfooter.entity.getElementsByClassName("order_done_context")[0].getElementsByTagName("ul")[0];
				ul.innerHTML = "";
				var i;
				for (i = 0; i < list.length; i++) {
					var li = '<li class="clearfix">' +
						'<div class="food_name">' +
						list[i].name +
						'</div>' +
						'<div class="add_number">' +
						'</div>' +
						'<div class="food_price">' +
						"￥" +
						list[i].price +
						'</div>' +
						'</li>';
					ul.innerHTML += li;
				}
				selectfooter.entity.getElementsByClassName("order_done")[0].style.display = "block";
				selectfooter.message.upordown = "up";
			} else {
				selectfooter.message.upordown = "down";
				selectfooter.entity.getElementsByClassName("order_done")[0].style.display = "none";
			}
		};
		selectfooter.entity.getElementsByClassName("order_done_tittle")[0].getElementsByTagName("button")[0].onclick = function() {
			var is = $("#dish_list i");
			for (i = 0; i < is.length; i++) {
				if ($(is[i]).text() == "-" && $(is[i]).next().text() != 0) {
					is[i].click();
					is[i].click();
					is[i].click();
					is[i].click();
					is[i].click();
					is[i].click();
					is[i].click();
					is[i].click();
					is[i].click();
					is[i].click();
					is[i].click();
					is[i].click();
					is[i].click();
					is[i].click();
				}
			}
		}
		selectfooter.entity.getElementsByClassName("account")[0].onclick = function() {
			var a = maincontroller.messageinput({
				value: "sendorder"
			});
			if (a == "wrong") return;
			orderfooter.messageinput({
				type: "neworder"
			});

			userheader.messageinput({
				type: "switchstatus"
			});
			//window.alert("提交完订单后需要重置部分数据~");
		}
	}
}
var historymain = {
	message: {
		refreshed: false
	},
	entity: {},
	messageinput: function(obj) {
		switch (obj.type) {
			case "refresh":
				if (!historymain.message.refreshed) {
					$.get("http://www.ouctechnology.cn:9999/API/getMemberdish.ashx?memberId=" + maincontroller.message.tel, function(data) {
						console.log(data);
						var dish = eval(data);
						console.log(dish);
						for (var i = 0; i < dish.length; i++) {
							//console.log(dish[i].name);
							var histerm = '<li><img src="' +
								dish[i].pic +
								'"/><div><span>' +
								dish[i].name +
								'</span><span>(' +
								dish[i].num +
								')</span></div></li>'

							$("#history_main ul")[0].innerHTML += histerm;
						}
					})
					//historymain.display();
					historymain.message.refreshed = true;
				}
				break;
		}
	},
	messageoutput: function(obj) {},
	display: function() {
		if(historymain.message.refreshed)
				historymain.entity.style.display = "block";
	},
	hide: function() {
		historymain.entity.style.display = "none";
	},
	initialize: function() {
		
		historymain.entity = document.getElementById("history_main");
		historymain.entity.getElementsByTagName("button")[0].onclick = function() {
			$(historymain.entity.getElementsByTagName("ul")[0]).slideToggle();
		}
	}
}

/* 主控制器 */
var maincontroller = {
	message:{
		tel:""
	},//可以存一下用户用户登录信息
	entity:{},//虚拟的
	messageinput:function(obj){
		//只接受操作信息
		switch(obj.value){
			case "initial":
				//window.alert("初始信息获取中,展示个临时的页面");
				dish_connect();
				groupinitialize(allset);
				grouphide(allset);
				groupdisplay(selectpagedisplay);
				break;
			case "gotologin":
				//window.alert("检测登陆状态并依据情况允许进入登陆页面");
				if(1){
					grouphide(allset);
					groupinitialize(loginpagedatacore);
					groupdisplay(loginpagedisplay);
				}
				break;
			case "menu":
				//window.alert("前往菜单");
				grouphide(allset);
				groupdisplay(selectpagedisplay);
				break;
			case "order":
				//window.alert("前往订单");
				grouphide(allset);
				groupinitialize(orderpagedatacore);
				groupdisplay(orderpagedisplay);
				break;
			case "sendorder":
				if(tableselectslide.message.select==0){
					window.alert("请选个桌");
					return "wrong";
				}
				var arr=[];
				arr=selectmain.messageoutput({type:"list"});
				console.log(arr);
				var tel = maincontroller.message.tel;
				var tableId = tableselectslide.message.select;
				var orderlist = [];
				var i;
				var j;
				for(i = 0; i < arr.length; i++){
					for(j = 0; j < arr[i].count; j++){
						var dishitem={};
						dishitem.id = arr[i].id;
						dishitem.tableId = tableId;
						dishitem.tel = tel;
						orderlist.push(dishitem);
					}
				}
				dish_send(orderlist);
				break;
		}
	},
	messageoutput:function(obj){
	}
}
/* 主控制器 */





/* 分组及批操作 */
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

var allset = [loginheader,loginmain,userheader,ordermain,orderfooter,tableselectslide,selectmain,selectfooter,historymain];

var loginpagedatacore = [loginheader,loginmain];
var loginpagedisplay = [loginheader,loginmain];

var orderpagedatacore = [tableselectslide,userheader,ordermain,orderfooter];
var orderpagedisplay = [userheader,ordermain,orderfooter];

var selectpagedatacore = [tableselectslide,userheader,selectmain,selectfooter,historymain];
var selectpagedisplay = [userheader,selectmain,selectfooter,historymain];
/* 分组及批操作 */





var debugcontroller = true;
if(debugcontroller==false){
	debug(0);
}





maincontroller.messageinput({value:"initial"});













/* 点菜连接控制 */

var ws;

function dish_connect(data) {
	var address = "ws://www.ouctechnology.cn:3000";
	ws = new WebSocket(address);
	ws.onopen = function(e) {};
	ws.onmessage = function(e) {
		//window.alert(111);
		console.log(e.data);
		e = e.data;
		e = JSON.parse(e);
		switch(e["type"]){
			case "cook":
				console.log(e.dish[0].tableId + "  " + tableselectslide.message.select);
				console.log(e.dish);
				if(e.dish[0].tableId == tableselectslide.message.select){
					ordermain.message = ordermain.message.concat(e.dish);
					console.log(ordermain.message);
					ordermain.messageinput({type:"refresh_add"});
				}
				break;
			case "given":
				ordermain.messageinput({type:"remove",value:e["dish"][0]["id"]});
				break;
		}
	};
	ws.onerror = function(e) {
		alert(e.data);
	};
	ws.onclose = function(e) {};
}

function dish_quit() {
	if (ws) {
		ws.close();
		ws = null;
	}
}

function dish_send(data) {
	var message = {
		type: "order",
		order: data
	}
	var json = JSON.stringify(message);
	ws.send(json);
}
/* 点菜连接控制 */










/* 可爱的辅助函数 */


/* 辅助函数1：从数组中去除指定下标元素 */
function remove(array,index)
{ 
 if(index<=(array.length-1))
 { 
  for(var i=index;i<array.length;i++)
  { 
   array[i]=array[i+1]; 
  } 
 }
 else
 { 
  throw new Error('超出最大索引！'); 
 } 
 array.length=array.length-1; 
 return array; 
} 




/* 辅助函数2：贝塞尔曲线 */
! function(a) {
    a.fly = function(b, c) {
        var d = {
                version: "1.0.0",
                autoPlay: !0,
                vertex_Rtop: 20,
                speed: 1.2,
                start: {},
                end: {},
                onEnd: a.noop
            },
            e = this,
            f = a(b);
        e.init = function(a) {
            this.setOptions(a), !!this.settings.autoPlay && this.play()
        }, e.setOptions = function(b) {
            this.settings = a.extend(!0, {}, d, b);
            var c = this.settings,
                e = c.start,
                g = c.end;
            f.css({
                marginTop: "0px",
                marginLeft: "0px",
                position: "fixed"
            }).appendTo("body"), null != g.width && null != g.height && a.extend(!0, e, {
                width: f.width(),
                height: f.height()
            });
            var h = Math.min(e.top, g.top) - Math.abs(e.left - g.left) / 3;
            h < c.vertex_Rtop && (h = Math.min(c.vertex_Rtop, Math.min(e.top, g.top)));
            var i = Math.sqrt(Math.pow(e.top - g.top, 2) + Math.pow(e.left - g.left, 2)),
                j = Math.ceil(Math.min(Math.max(Math.log(i) / .05 - 75, 30), 100) / c.speed),
                k = e.top == h ? 0 : -Math.sqrt((g.top - h) / (e.top - h)),
                l = (k * e.left - g.left) / (k - 1),
                m = g.left == l ? 0 : (g.top - h) / Math.pow(g.left - l, 2);
            a.extend(!0, c, {
                count: -1,
                steps: j,
                vertex_left: l,
                vertex_top: h,
                curvature: m
            })
        }, e.play = function() {
            this.move()
        }, e.move = function() {
            var b = this.settings,
                c = b.start,
                d = b.count,
                e = b.steps,
                g = b.end,
                h = c.left + (g.left - c.left) * d / e,
                i = 0 == b.curvature ? c.top + (g.top - c.top) * d / e : b.curvature * Math.pow(h - b.vertex_left, 2) + b.vertex_top;
            if (null != g.width && null != g.height) {
                var j = e / 2,
                    k = g.width - (g.width - c.width) * Math.cos(j > d ? 0 : (d - j) / (e - j) * Math.PI / 2),
                    l = g.height - (g.height - c.height) * Math.cos(j > d ? 0 : (d - j) / (e - j) * Math.PI / 2);
                f.css({
                    width: k + "px",
                    height: l + "px",
                    "font-size": Math.min(k, l) + "px"
                })
            }
            f.css({
                left: h + "px",
                top: i + "px"
            }), b.count++;
            var m = window.requestAnimationFrame(a.proxy(this.move, this));
            d == e && (window.cancelAnimationFrame(m), b.onEnd.apply(this))
        }, e.destory = function() {
            f.remove()
        }, e.init(c)
    }, a.fn.fly = function(b) {
        return this.each(function() {
            void 0 == a(this).data("fly") && a(this).data("fly", new a.fly(this, b))
        })
    }
}(jQuery);

/* 辅助函数3 DEBUG控制 */
window.alert = window.alert;

function debug(num){
	if(!num){
		window.alert = function(){};
	}
	else{
		window.alert = window.alert;
	}
}
window.alert = window.alert;
/* 辅助函数3 DEBUG控制 */




/* 可爱的辅助函数 */