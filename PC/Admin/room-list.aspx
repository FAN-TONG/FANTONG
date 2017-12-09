<%@ Page Language="C#" AutoEventWireup="true" CodeFile="room-list.aspx.cs" Inherits="Admin_room_lisit" %>

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
<title>房间管理</title>
</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 房间管理 <span class="c-gray en">&gt;</span> 房间列表 <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="page-container">

      <%
        DataTable dt = new DataTable();
        dt = SQLHelper.Select("select * from  room");
      %>

	<div class="cl pd-5 bg-1 bk-gray mt-20"> <span class="l"> <a class="btn btn-primary radius" onclick="picture_add('添加房间','room-add.aspx')" href="javascript:;"><i class="Hui-iconfont">&#xe600;</i>
       添加房间</a></span> <span class="r">共有数据：<strong><% Response.Write(dt.Rows.Count.ToString()); %></strong> 条</span> </div>
	<div class="mt-20">
		<table class="table table-border table-bordered table-bg table-hover table-sort">
			<thead>
				<tr class="text-c">
					<th>名称</th>
					<th>房间内桌子</th>
                    <th>状态</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
                <%for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        string sql = "select id from [table] where roomId=" + dt.Rows[i][0].ToString();
                        DataTable dtTable = new DataTable();
                        dtTable = SQLHelper.Select(sql);
                    %>
                
				<tr class="text-c"> 
					<td><%Response.Write(dt.Rows[i][1]);%></td>
                    <td>
                        <%for (int j = 0; j < dtTable.Rows.Count; j++)
                            {
                                Response.Write(dt.Rows[j][0]+"&nbsp;&nbsp;");
                            } %>
                    </td>   
					<td class="td-status"><span class="label label-success radius">
                       空闲</span></td>
					<td class="td-manage"><a style="text-decoration:none" onClick="picture_stop(this,'<%Response.Write(dt.Rows[i]["id"].ToString()); %>')" href="javascript:;" title="下架">
                        <i class="Hui-iconfont">&#xe6de;</i></a> 
                        <a style="text-decoration:none" class="ml-5" onClick="picture_edit('桌子编辑','room-edit.aspx?ID=<%Response.Write(dt.Rows[i]["id"].ToString()); %>',0)" href="javascript:;" title="编辑">
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
    function picture_add(title, url) {
        var index = layer.open({
            type: 2,
            title: title,
            content: url
        });
        layer.full(index);
    }


    /*图片-下架*/
    function picture_stop(obj, id) {
        layer.confirm('确认要下架吗？', function (index) {
            $(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="picture_start(this,id)" href="javascript:;" title="发布"><i class="Hui-iconfont">&#xe603;</i></a>');
            $(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已下架</span>');
            $(obj).remove();
            layer.msg('已下架!', { icon: 5, time: 1000 });
        });
    }

    /*图片-发布*/
    function picture_start(obj, id) {
        layer.confirm('确认要发布吗？', function (index) {
            $(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="picture_stop(this,id)" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i></a>');
            $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已发布</span>');
            $(obj).remove();
            layer.msg('已发布!', { icon: 6, time: 1000 });
        });
    }


    /*图片-编辑*/
    function picture_edit(title, url, id) {
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
	            url: './API/roomDelete.ashx',
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
<!--/请在上方写此页面业务相关的脚本-->
</body>
</html>
