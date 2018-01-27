
// 主机地址
var host = 'http://www.ouctechnology.cn:9999/API';

$(document).ready(function() {
	// 全局函数加载
	employeeInit();	

});

// -------------function----------------

function employeeInit(){

	employeeCSS();
	employeeEvents();
	employeeWorkPageRouter();

}

function employeeCSS(){
	// 动态样式

	// 员工登录页 高度 登录按钮定位
	$(".emplogin_container").height($(window).height());
	$(".emplogin_btn").css('left', ($(window).width() - $(".emplogin_btn").width())/2);

}

function employeeEvents(){
	// 事件绑定

	// 厨师菜品列表点击变换
	$(".cook_dish_undone li span").on("click", function(){
		// 待做菜品 点击完成 从待做列表删除 增添到已做列表
		var dish_name = $(this).parent().children("h1").text();
		var item = "<li><h1>" + dish_name + "</h1><span></span></li>";
		$(this).parent("li").remove();
		$(".cook_dish_done").append(item);
	})

	// 服务员菜品列表点击变换	
	$(".waiter_dish_get li span").on("click", function(){
		// 抢菜->待上菜
		var dish_name = $($(this).parent().children("h1")[0]).text();
		var table_id = $($(this).parent().children("h1")[1]).text();
		var item = "<li><h1>" + dish_name + "</h1><h1>" + table_id + "</h1><span></span></li>";
		$(this).parent("li").remove();
		$(".waiter_dish_give").append(item);

		var len = $(".waiter_dish_give li span").length;
		//为新加入列表的 li 绑定事件
		$($(".waiter_dish_give li span")[len-1]).on("click", function(){
			// 待上菜->已上菜
			var dish_name = $($(this).parent().children("h1")[0]).text();
			var table_id = $($(this).parent().children("h1")[1]).text();
			var item = "<li><h1>" + dish_name + "</h1><h1>" + table_id + "</h1><span></span></li>";
			$(this).parent("li").remove();
			$(".waiter_dish_given").append(item);
		})
	})
	
}

function employeeWorkPageRouter(){
	// 职工选择 进入到工作页面
	$(".cook_list li").on("click", function(){
		var cookId = $(this).children('div').children('span').children('span').text();
		window.location.href = "./cookDishList.html?cookId=" + cookId;
	})

	$(".waiter_list li").on("click", function(){
		var waiterId = $(this).children('div').children('span').children('span').text();
		window.location.href = "./waiterDishList.html?waiterId=" + waiterId;

	})

}

function cookListAJAX(){
	// 厨师列表获取
	$.ajax({
    	type: 'get',  
    	url: host + '/getCooklist.ashx',
      	success: function(data, status) {
      		// var cooks = $.parseJSON(data);
      		var cooks = data;
        	$.each(cooks, function(index, item){
        		//遍历获取到的ajax数据 组装html
        		var sex = item.sex ? "employee_male" : "employee_female";
        		var html = "<li cook_id='" 
        				+ item.id + "'><div class='employee_list_left'><div class='" 
        				+ sex + "'></div></div><div class='employee_list_right'><h1>" 
						+ item.name + "</h1><span>工号：<span>" 
						+ item.account + "</span></span></div></li>";
	        	$(".cook_list").append(html);
        	})
        	//为li绑定点击事件 进行页面跳转
        	$(".cook_list li").on("click", function(){
				var cookId = $(this).attr('cook_id');;
				window.location.href = "./cookDishList.html?cookId=" + cookId;
			})

      	},
      	error: function(data, XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
    })
}

function waiterListAJAX(){
	// 服务员列表获取
    $.ajax({
    	type: 'get',  
    	url: host + '/getWaiterlist.ashx',
      	success: function(data, status) {
      		// var cooks = $.parseJSON(data);
      		var waiters = data;
        	$.each(waiters, function(index, item){
        		//遍历获取到的ajax数据 组装html
        		var sex = item.sex ? "employee_male" : "employee_female";
        		var html = "<li waiter_id='" 
        				+ item.id + "'><div class='employee_list_left'><div class='" 
        				+ sex + "'></div></div><div class='employee_list_right'><h1>" 
						+ item.name + "</h1><span>工号：<span>" 
						+ item.account + "</span></span></div></li>";
	        	$(".waiter_list").append(html);
        	})
        	//为li绑定点击事件 进行页面跳转
        	$(".waiter_list li").on("click", function(){
				var waiterId = $(this).attr('waiter_id');;
				window.location.href = "./waiterDishList.html?waiterId=" + waiterId;
			})

      	},
      	error: function(data, XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
    })
}

function cookDishAJAX(){
	// 厨师做菜列表

	// 从url获取参数
	var cook_id = getUrlParam("cookId");

	$.ajax({
    	type: 'get',  
    	url: host + '/getCookDish.ashx',
    	data:{
    		"cookId": cook_id
    	},
      	success: function(data, status) {
      		var dishes = data;
        	$.each(dishes, function(index, item){
        		//遍历获取到的ajax数据 组装html
        		var html = "<li><h1>" 
        		+ item.name + "</h1><span id='"
				+ item.id + "'></li>";
        		$(".cook_dish_undone").append(html);
        	})
        	$(".cook_dish_undone li span").on("click", function(){
        		var address="ws://www.ouctechnology.cn:3000";
				var ws = new WebSocket(address); 

				var pointer = $(this);
			   	ws.onopen = function(event){

					//发送数据
					var data = {
						type: 'done',	//发送给后台 修改做完菜的状态
						id: $(pointer).attr('id')
			        }
					var json = JSON.stringify(data); 
					ws.send(json);

					// 前台处理 将已做完菜从待做列表移除 加入已做列表
			    	var dish_name = $(pointer).parent().children("h1").text();
					var item = "<li><h1>" + dish_name + "</h1><span></span></li>";
					$(pointer).parent("li").hide('slow', function() {
						$(pointer).parent("li").remove();
						$(".cook_dish_done").append(item);
					});

					ws.close();
					ws = null;
				}
			})
      	},
      	error:function(data, status){
      		console.log(-1);
      	}
    })
}

function waiterDishAJAX(){
	// 服务员服务菜列表
	// 从url获取参数
	var waiter_id = getUrlParam("waiterId");
	$.ajax({
    	type: 'get',  
    	url: host + '/getWaiterDish.ashx',
    	data:{
    		"waiterId": waiter_id
    	},
      	success: function(data, status) {
        	var dishes = data;
        	var getDishs = dishes.no;
        	var giveDishs = dishes.get;
        	$.each(getDishs, function(index, item){
        		//遍历获取到的ajax数据 组装html
        		var html = "<li><h1>" 
		        		+ item.name + "</h1><h1>"
		        		+ item.tableId + "桌</h1><span id='"
						+ item.id + "'></li>";
				$(".waiter_dish_get").append(html);
        	})
        	$.each(giveDishs, function(index, item){
        		//遍历获取到的ajax数据 组装html
        		var html = "<li><h1>" 
		        		+ item.name + "</h1><h1>"
		        		+ item.tableId + "桌</h1><span id='"
						+ item.id + "'></li>";
				$(".waiter_dish_give").append(html);
        	})
	
			$(".waiter_dish_get li span").on("click", function(){

				var address="ws://www.ouctechnology.cn:3000";
				var ws = new WebSocket(address); 

				var pointer = $(this);
			   	ws.onopen = function(event){
		  			//发送数据
					var data = {
						type: 'get',	//发送给后台 服务员抢到菜
						id: $(pointer).attr('id'),
						waiterId: waiter_id
			        }
					var json = JSON.stringify(data); 
					ws.send(json);
		        	var dish_name = $($(pointer).parent().children("h1")[0]).text();
					var table_id = $($(pointer).parent().children("h1")[1]).text();
					var id = $(pointer).attr('id');
					var item = "<li><h1>" + dish_name + "</h1><h1>" + table_id + "</h1><span id='"+ id + "'></span></li>";
					$(pointer).parent("li").hide('slow', function() {
						$(pointer).parent("li").remove();
						$(".waiter_dish_give").append(item);
						var give_len = $(".waiter_dish_give li span").length;
						$($(".waiter_dish_give li span")[give_len-1]).on("click", function(){
			        		var address="ws://www.ouctechnology.cn:3000";
							var ws = new WebSocket(address); 

							var pointer = $(this);
							ws.onopen = function(event){

								var data = {
									type: 'give',	
									id: $(pointer).attr('id'),
						        }
								var json = JSON.stringify(data); 
								ws.send(json);

					        	var dish_name = $($(pointer).parent().children("h1")[0]).text();
								var table_id = $($(pointer).parent().children("h1")[1]).text();
								var id = $(pointer).attr('id');
								var item = "<li><h1>" + dish_name + "</h1><h1>" + table_id + "</h1><span id='"+ id + "'></span></li>";
								$(pointer).parent("li").hide('slow', function() {
									$(pointer).parent("li").remove();
									$(".waiter_dish_given").append(item);
								});
								ws.close();
								ws = null;
								
							}
						});
					});
					ws.close();
					ws = null;
				}
			})

			$(".waiter_dish_give li span").on("click", function(){

				var address="ws://www.ouctechnology.cn:3000";
				var ws = new WebSocket(address); 

				var pointer = $(this);
				ws.onopen = function(event){
		  			//发送数据
					var data = {
						type: 'give',	
						id: $(pointer).attr('id'),
			        }
					var json = JSON.stringify(data); 
					ws.send(json);

		        	var dish_name = $($(pointer).parent().children("h1")[0]).text();
					var table_id = $($(pointer).parent().children("h1")[1]).text();
					var id = $(pointer).attr('id');
					var item = "<li><h1>" + dish_name + "</h1><h1>" + table_id + "</h1><span id='"+ id + "'></span></li>";
					$(pointer).parent("li").hide('slow', function() {
						$(pointer).parent("li").remove();
						$(".waiter_dish_given").append(item);
					});

					ws.close();
					ws = null;
				}

			})
      	}
    })
}

function cookSocket(){
	// 厨师socket通信
	var address="ws://www.ouctechnology.cn:3000";
	var ws = new WebSocket(address);

	ws.onopen = function(event){
		ws.onmessage = function(message){
			var msgs = $.parseJSON(message.data) //JSON化
			if(msgs.type != "cook") return;	//不是厨师 不操作
			var msg = msgs.dish;
		    for(var i in msg){
		    	var cook_id = getUrlParam("cookId");
		    	// 当广播为厨师 且号码为该厨师时 插入数据
		    	if(msg[i].cookId != cook_id){
		    		continue;
		    	}
		    	//对消息列表每个数据操作 插入待做列表
			    var html = "<li><h1>" 
					+ msg[i].name + "</h1><span id='"
					+ msg[i].id + "'></li>";
				$(".cook_dish_undone").append(html);
				var len = $(".cook_dish_undone li span").length;
				$($(".cook_dish_undone li span")[len-1]).on("click", function(){
					// 待做菜品 点击完成 从待做列表删除 增添到已做列表				

					//发送数据
					var data = {
						type: 'done',	//发送给后台 修改做完菜的状态
						id: $(this).attr('id')
			        }
					var json = JSON.stringify(data); 
					ws.send(json);

					// 前台处理 将已做完菜从待做列表移除 加入已做列表
			    	var dish_name = $(this).parent().children("h1").text();
					var item = "<li><h1>" + dish_name + "</h1><span></span></li>";
					$(this).parent("li").hide('slow', function() {
						$(this).parent("li").remove();
						$(".cook_dish_done").append(item);
					});
					
				});
			}
		};
	};
}

function waiterSocket(){
	// 服务员socket通信
	var address="ws://www.ouctechnology.cn:3000";
	var ws = new WebSocket(address); 

   	ws.onopen = function(event){
		ws.onmessage = function(message){
			var msgs = $.parseJSON(message.data) //JSON化
			var waiter_id = getUrlParam("waiterId")
			if(msgs.type == "waiter"){
				// 该message为厨师做好菜 通知服务员抢菜
				var msg = msgs.dish;
				for(var i in msg){
			        var html = "<li><h1>" 
		        		+ msg[i].name + "</h1><h1>"
		        		+ msg[i].tableId + "桌</h1><span id='"
						+ msg[i].id + "'></li>";

		        	$(".waiter_dish_get").append(html);	

		        	var get_len = $(".waiter_dish_get li span").length;
		        	$($(".waiter_dish_get li span")[get_len-1]).on("click", function(){
		        		// 抢菜->待上菜
			  			//发送数据
						var data = {
							type: 'get',	//发送给后台 服务员抢到菜
							id: $(this).attr('id'),
							waiterId: waiter_id
				        }
						var json = JSON.stringify(data); 
						ws.send(json);

			        	var dish_name = $($(this).parent().children("h1")[0]).text();
						var table_id = $($(this).parent().children("h1")[1]).text();
						var id = $(this).attr('id');
						var item = "<li><h1>" + dish_name + "</h1><h1>" + table_id + "</h1><span id='"+ id + "'></span></li>";
						$(this).parent("li").hide('slow', function() {
							$(this).parent("li").remove();
							$(".waiter_dish_give").append(item);
							var give_len = $(".waiter_dish_give li span").length;
							$($(".waiter_dish_give li span")[give_len-1]).on("click", function(){
				        		// 待上菜->已上菜
					  			//发送数据
								var data = {
									type: 'give',	
									id: $(this).attr('id'),
						        }
								var json = JSON.stringify(data); 
								ws.send(json);

					        	var dish_name = $($(this).parent().children("h1")[0]).text();
								var table_id = $($(this).parent().children("h1")[1]).text();
								var id = $(this).attr('id');
								var item = "<li><h1>" + dish_name + "</h1><h1>" + table_id + "</h1><span id='"+ id + "'></span></li>";
								$(this).parent("li").hide('slow', function() {
									$(this).parent("li").remove();
									$(".waiter_dish_given").append(item);
								});
							});
						});
					});
				}
			} else if (msgs.type == "got"){
				var msg = msgs.dish;
				$waiter_list = $(".waiter_dish_get span");
				for(var i in msg){
					if(msg[i].waiterId != waiter_id){
						for(var j = 0; j < $waiter_list.length; j++){
							if(msg[i].id == $($waiter_list[j]).attr('id')){
								// 若该菜品已被别的waiter抢到 则从列表中移除
								$($waiter_list[j]).parent("li").remove();
							}
						}
					}
				}
			}
			
		};
	};
}

function getUrlParam(name){  
 	//从URL中获取参数
	//构造一个含有目标参数的正则表达式对象  
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
	//匹配目标参数  
	var r = window.location.search.substr(1).match(reg);  
	//返回参数值  
	if (r!=null) return unescape(r[2]);  
	return null;  
} 

