<%@ Page Language="C#" AutoEventWireup="true" CodeFile="cook-list.aspx.cs" Inherits="cook_list" %>

<%@ Import Namespace="System.Data" %>
<!DOCTYPE html>

<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
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
<title>厨师管理</title>
</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 厨师管理 <span class="c-gray en">&gt;</span> 厨师列表 <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="page-container">

      <%
          if (Session["user"] == null)
        {
            Response.Write("<script>alert('您还没有登录！'); window.location.href = 'login.aspx';</script>");
        }
        DataTable dt = new DataTable();
        dt = SQLHelper.Select("select * from cook,classify where cook.classifyId=classify.id");
      %>

	<div class="cl pd-5 bg-1 bk-gray mt-20"> <span class="l"> <a class="btn btn-primary radius" onclick="picture_add('添加厨师','cook-add.aspx')" href="javascript:;"><i class="Hui-iconfont">&#xe600;</i>
       添加厨师</a></span> <span class="r">共有数据：<strong><% Response.Write(dt.Rows.Count.ToString()); %></strong> 条</span> </div>
	<div class="mt-20">
		<table class="table table-border table-bordered table-bg table-hover table-sort">
			<thead>
				<tr class="text-c">
					<th>姓名</th>
					<th>工号</th>
					<th>组别</th>
                    <th>性别</th>
					<th>电话</th>
                    <th>状态</th>
                    <th>工作记录</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
                <%for (int i = 0; i < dt.Rows.Count; i++)
                         { %>
				<tr class="text-c"> 
					<td><%Response.Write(dt.Rows[i][1]);%></td>
					<td><%Response.Write(dt.Rows[i][2]);%></td>
                    <td><%Response.Write(dt.Rows[i][3]);%></td>
					<td><%Response.Write(dt.Rows[i][4].ToString()=="True"?"男":"女");%></td>
                    <td><%Response.Write(dt.Rows[i][5]);%></td>
                        <td class="td-status"><span class="label label-success radius"><%Response.Write(dt.Rows[i]["status"].ToString()=="0"?"离职":"在职");%></span></td>
					<td><a href="cook-works.aspx?ID=<%Response.Write(dt.Rows[i]["id"].ToString()); %>">查看</a></td>
					<td class="td-manage"><a style="text-decoration:none" onClick="picture_stop(this,'<%Response.Write(dt.Rows[i]["id"].ToString()); %>','<%Response.Write(dt.Rows[i]["status"].ToString());%>')" href="javascript:;" title="下架">
                        <i class="Hui-iconfont">&#xe6de;</i></a> 
                        <a style="text-decoration:none" class="ml-5" onClick="picture_edit('厨师编辑','cook-edit.aspx?ID=<%Response.Write(dt.Rows[i]["id"].ToString()); %>',0)" href="javascript:;" title="编辑">
                        <i class="Hui-iconfont">&#xe6df;</i></a> 
                        <a style="text-decoration:none" class="ml-5" onClick="picture_del(this,'<%Response.Write(dt.Rows[i]["id"].ToString()); %>')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a></td>
				</tr>
                <%} %>
			</tbody>
		</table>
	</div>
</div>

<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="static/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="static/h-ui.admin/js/H-ui.admin.js"></script> <!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="lib/My97DatePicker/4.8/WdatePicker.js"></script> 
<script type="text/javascript" src="lib/datatables/1.10.0/jquery.dataTables.min.js"></script> 
<script type="text/javascript" src="lib/laypage/1.2/laypage.js"></script>
<script type="text/javascript">

/*图片-添加*/
function picture_add(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}


/*图片-下架*/
function picture_stop(obj, id, sta) {
    if (sta == 1) {
        layer.confirm('确认要离职吗？', function (index) {
            $.ajax({
                type: 'POST',
                url: './API/changeCookStatus.ashx',
                data: { ID: id, sta: 0 },
                dataType: 'json',
                success: function (data) {
                    $(obj).parents("tr").remove();
                    if (data.res == "1") {
                        layer.msg('操作成功!', { icon: 6, time: 1000 });
                        setTimeout(function () {
                            window.location.reload();
                        }, 500);
                    }
                    else
                        layer.msg('操作失败!', { icon: 1, time: 1000 });
                },
                error: function (data) {
                    console.log(data.msg);
                },
            });
        });
    }
    else {
        layer.confirm('确认要就职吗？', function (index) {
            $.ajax({
                type: 'POST',
                url: './API/changeCookStatus.ashx',
                data: { ID: id, sta: 1 },
                dataType: 'json',
                success: function (data) {
                    $(obj).parents("tr").remove();
                    if (data.res == "1") {
                        layer.msg('操作成功!', { icon: 6, time: 1000 });
                        setTimeout(function () {
                            window.location.reload();
                        }, 500);
                    }
                    else
                        layer.msg('操作失败!', { icon: 1, time: 1000 });
                },
                error: function (data) {
                    console.log(data.msg);
                },
            });
        });
    }
}

/*图片-发布*/
function picture_start(obj,id){
    layer.confirm('确认要就职吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: './API/changeCookStatus.ashx',
            data: { ID: id,sta:1},
            dataType: 'json',
            success: function (data) {
                $(obj).parents("tr").remove();
                if (data.res == "1") {
                    layer.msg('操作成功!', { icon: 6, time: 1000 });
                    setTimeout(function () {
                        window.location.reload();
                    }, 500);
                }
                else
                    layer.msg('操作失败!', { icon: 1, time: 1000 });
            },
            error: function (data) {
                console.log(data.msg);
            },
        });	
	});
}


/*图片-编辑*/
function picture_edit(title,url,id){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}

/*图片-删除*/
function picture_del(obj,id){
    layer.confirm('确认要删除吗？', function (index) {
		$.ajax({
			type: 'POST',
			url: './API/cookDelete.ashx',
			data:{ID:id},
			dataType: 'json',
			success: function (data) {
			    $(obj).parents("tr").remove();
			    if (data.res == "1") {
			        layer.msg('已删除!', { icon: 1, time: 1000 });
			        setTimeout(function () {
			            window.location.reload();
			        }, 500);
			    }
			    else
			        layer.msg('删除失败!', { icon: 1, time: 1000 });
			},
			error:function(data) {
				console.log(data.msg);
			},
		});		
	});
}
</script>
</body>
</html>