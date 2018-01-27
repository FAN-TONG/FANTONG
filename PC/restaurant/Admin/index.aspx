<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="Admin_index" %>

<!DOCTYPE html>

<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<link rel="Bookmark" href="/favicon.ico" >
<link rel="Shortcut Icon" href="/favicon.ico" />
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5shiv.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<![endif]-->
<link rel="stylesheet" type="text/css" href="static/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="static/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="static/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="static/h-ui.admin/css/style.css" />
<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>FANTONG</title>
</head>
<body>
<header class="navbar-wrapper">
	<div class="navbar navbar-fixed-top">
		<div class="container-fluid cl"> <a class="logo navbar-logo f-l mr-10 hidden-xs" href="index.aspx">FANTONG后台管理系统</a> <a class="logo navbar-logo-m f-l mr-10 visible-xs" href="index.aspx">FANTONG后台管理系统</a> 
			
			<a aria-hidden="false" class="nav-toggle Hui-iconfont visible-xs" href="javascript:;">&#xe667;</a>
			<nav class="nav navbar-nav">
				<ul class="cl">
					<li class="dropDown dropDown_hover"><a href="javascript:;" class="dropDown_A"><i class="Hui-iconfont">&#xe600;</i> 快速新增 <i class="Hui-iconfont">&#xe6d5;</i></a>
						<ul class="dropDown-menu menu radius box-shadow">
							<li><a href="javascript:;" onclick="article_add('添加菜单','dish-add.aspx')"><i class="Hui-iconfont">&#xe616;</i> 菜单</a></li>
							<li><a href="javascript:;" onclick="picture_add('添加桌子','table-add.aspx')"><i class="Hui-iconfont">&#xe613;</i> 桌子</a></li>
							<li><a href="javascript:;" onclick="product_add('添加房间','room-add.aspx')"><i class="Hui-iconfont">&#xe620;</i> 房间</a></li>
                            <li><a href="javascript:;" onclick="product_add('添加厨师','cook-add.aspx')"><i class="Hui-iconfont">&#xe620;</i> 厨师</a></li>
							<li><a href="javascript:;" onclick="member_add('添加服务员','waiter-add.aspx','','510')"><i class="Hui-iconfont">&#xe60d;</i> 服务员</a></li>
					</ul>
				</li>
			</ul>
		</nav>
		<nav id="Hui-userbar" class="nav navbar-nav navbar-userbar hidden-xs">
			<ul class="cl">
			
				<li class="dropDown dropDown_hover">
					<a href="#" class="dropDown_A"><%
                                                       if (Session["user"] == null)
                                                       {
                                                           Response.Write("<script>alert('您还没有登录！'); window.location.href = 'login.aspx';</script>");
                                                       }
                                                       else
                                                       {

                                                           Response.Write(Session["user"].ToString());
                                                       } %> <i class="Hui-iconfont">&#xe6d5;</i></a>
					<ul class="dropDown-menu menu radius box-shadow">
						<li><a href="javascript:;" onClick="add()">添加账户</a></li>
						<li><a href="javascript:;" onClick="change()">修改密码</a></li>
						<li><a href="javascript:;" onClick="logout()">退出登录</a></li>
				</ul>
			</li>
				<li id="Hui-msg"> <a href="#" title="消息"><span class="badge badge-danger">1</span><i class="Hui-iconfont" style="font-size:18px">&#xe68a;</i></a> </li>
				<li id="Hui-skin" class="dropDown right dropDown_hover"> <a href="javascript:;" class="dropDown_A" title="换肤"><i class="Hui-iconfont" style="font-size:18px">&#xe62a;</i></a>
					<ul class="dropDown-menu menu radius box-shadow">
						<li><a href="javascript:;" data-val="default" title="默认（黑色）">默认（黑色）</a></li>
						<li><a href="javascript:;" data-val="blue" title="蓝色">蓝色</a></li>
						<li><a href="javascript:;" data-val="green" title="绿色">绿色</a></li>
						<li><a href="javascript:;" data-val="red" title="红色">红色</a></li>
						<li><a href="javascript:;" data-val="yellow" title="黄色">黄色</a></li>
						<li><a href="javascript:;" data-val="orange" title="橙色">橙色</a></li>
					</ul>
				</li>
			</ul>
		</nav>
	</div>
</div>
</header>
<aside class="Hui-aside">
	<div class="menu_dropdown bk_2">
        <dl id="menu-picture">
			<dt><i class="Hui-iconfont">&#xe613;</i> 菜单管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
			<dd>
				<ul>
					<li><a data-href="dish-list.aspx" data-title="菜单管理" href="javascript:void(0)">菜单管理</a></li>
			</ul>
		</dd>
	</dl>
		<dl id="menu-article">
			<dt><i class="Hui-iconfont">&#xe616;</i> 厨师管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
			<dd>
				<ul>
					<li><a data-href="cook-list.aspx" data-title="厨师管理" href="javascript:void(0)">厨师管理</a></li>
			</ul>
		</dd>
	</dl>
       <dl id="menu-waiter">
			<dt><i class="Hui-iconfont">&#xe616;</i> 服务员管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
			<dd>
				<ul>
					<li><a data-href="waiter-list.aspx" data-title="厨师管理" href="javascript:void(0)">服务员管理</a></li>
			</ul>
		</dd>
	</dl>
        <dl id="menu-table">
			<dt><i class="Hui-iconfont">&#xe613;</i> 餐桌管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
			<dd>
				<ul>
					<li><a data-href="table-list.aspx" data-title="订单管理" href="javascript:void(0)">餐桌管理</a></li>
			</ul>
		</dd>
	</dl>
         <dl id="menu-room">
			<dt><i class="Hui-iconfont">&#xe613;</i> 房间管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
			<dd>
				<ul>
					<li><a data-href="room-list.aspx" data-title="房间管理" href="javascript:void(0)">房间管理</a></li>
			</ul>
		</dd>
	</dl>
         <dl id="menu-order">
			<dt><i class="Hui-iconfont">&#xe613;</i> 订单管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
			<dd>
				<ul>
					<li><a data-href="order-list.aspx" data-title="订单管理" href="javascript:void(0)">订单管理</a></li>
			</ul>
		</dd>
	</dl>
    <dl id="menu-member">
			<dt><i class="Hui-iconfont">&#xe613;</i> 会员管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
			<dd>
				<ul>
					<li><a data-href="member-list.aspx" data-title="会员管理" href="javascript:void(0)">会员管理</a></li>
			</ul>
		</dd>
	</dl>
    <dl id="menu-count">
			<dt><i class="Hui-iconfont">&#xe613;</i>系统统计<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
			<dd>
				<ul>
					<li><a data-href="system-rank.aspx" data-title="销量榜单" href="javascript:void(0)">销量榜单</a></li>
			        <li><a data-href="system-list.aspx" data-title="分月统计" href="javascript:void(0)">分月统计</a></li>
                </ul>
		</dd>
	</dl>
</div>
</aside>
<div class="dislpayArrow hidden-xs"><a class="pngfix" href="javascript:void(0);" onClick="displaynavbar(this)"></a></div>
<section class="Hui-article-box">
	<div id="Hui-tabNav" class="Hui-tabNav hidden-xs">
		<div class="Hui-tabNav-wp">
			<ul id="min_title_list" class="acrossTab cl">
				<li class="active">
					<span title="我的桌面" data-href="system-rank.aspx">我的桌面</span>
					<em></em></li>
		</ul>
	</div>
		<div class="Hui-tabNav-more btn-group"><a id="js-tabNav-prev" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">&#xe6d4;</i></a><a id="js-tabNav-next" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">&#xe6d7;</i></a></div>
</div>
	<div id="iframe_box" class="Hui-article">
		<div class="show_iframe">
			<div style="display:none" class="loading"></div>
			<iframe scrolling="yes" frameborder="0" src="system-rank.aspx"></iframe>
	</div>
</div>
</section>

<div class="contextMenu" id="Huiadminmenu">
	<ul>
		<li id="closethis">关闭当前 </li>
		<li id="closeall">关闭全部 </li>
</ul>
</div>
<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="static/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="static/h-ui.admin/js/H-ui.admin.js"></script> <!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="lib/jquery.contextmenu/jquery.contextmenu.r2.js"></script>
<script type="text/javascript">
$(function(){
	/*$("#min_title_list li").contextMenu('Huiadminmenu', {
		bindings: {
			'closethis': function(t) {
				console.log(t);
				if(t.find("i")){
					t.find("i").trigger("click");
				}		
			},
			'closeall': function(t) {
				alert('Trigger was '+t.id+'\nAction was Email');
			},
		}
	});*/
});
/*个人信息*/
function change(){
    layer.open({
        type: 1,
        area: ['300px', '200px'],
        fix: false, //不固定
        maxmin: true,
        shade: 0.4,
        title: '修改密码',
        content: '<div>请输入新密码：</br><input type="text" id="new-pwd" style="height: 30px; width: 100%" ><br><input type="submit"  class="btn btn-primary radius" type="button" onclick=changePwd()></input></div>'
    });
}

/*个人信息*/
function add() {
    layer.open({
        type: 1,
        area: ['300px', '300px'],
        fix: false, //不固定
        maxmin: true,
        shade: 0.4,
        title: '增加管理员',
        content: '<div>请输入管理员账号：</br><input type="text" id="admin-acc" style="height: 30px; width: 100%" ><br>请输入管理员密码：</br><input type="password" id="admin-pwd" style="height: 30px; width: 100%" ><br><input type="submit"  class="btn btn-primary radius" type="button" onclick=addAdmin()></input></div>'
    });
}

/*个人信息*/
function logout() {
    layer.confirm('确认要退出吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: 'API/Logout.ashx',
            dataType: 'json',
            success: function (data) {
                var messages = data.success;
                if (messages == 1) {
                    alert('退出成功!');
                    window.location = 'login.aspx';
                }
                else {
                    alert('error');
                }
            },
            error: function (data) {
                alert('error');
            },
        });
    });
}

function changePwd(username) {
    var new_pwd = $("#new-pwd").val();
    if (new_pwd == "" || new_pwd == null) {
        alert('密码不可为空');
        return;
    }
    layer.confirm('确认要更改吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: 'API/changePwd.ashx',
            dataType: 'json',
            data: { new_pwd: new_pwd },
            success: function (data) {
                var messages = data.success;
                if (messages == 1) {
                    layer.msg('修改成功!', { icon: 1, time: 3000 });
                }
                else {
                    alert('error');
                }
            },
            error: function (data) {
                alert('error');
            },
        });
    });

}

function addAdmin() {
    var admin_pwd = $("#admin-pwd").val();
    if (admin_pwd == "" || admin_pwd == null) {
        alert('用户名不可为空');
        return;
    }
    var admin_acc = $("#admin-acc").val();
    if (admin_acc == "" || admin_acc == null) {
        alert('密码不可为空');
        return;
    }
    layer.confirm('确认要添加吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: 'API/addAdmin.ashx',
            dataType: 'json',
            data: { admin_pwd: admin_pwd, admin_acc: admin_acc },
            success: function (data) {
                var messages = data.success;
                if (messages == 1) {
                    layer.msg('添加成功!', { icon: 1, time: 3000 });                 
                }
                else if (messages == 2) {
                    layer.msg('用户名重复!', { icon: 1, time: 3000 });
                }
                else {
                    alert('error');
                }
            },
            error: function (data) {
                alert('error');
            },
        });
    });

}

/*资讯-添加*/
function article_add(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*图片-添加*/
function picture_add(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*产品-添加*/
function product_add(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*用户-添加*/
function member_add(title,url,w,h){
	layer_show(title,url,w,h);
}
</script> 
</body>
</html>
