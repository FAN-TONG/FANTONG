<%@ Page Language="C#" AutoEventWireup="true" CodeFile="cook-edit.aspx.cs" Inherits="cook_edit" %>

<%@ Import Namespace="System.Data" %>
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
<!--/meta 作为公共模版分离出去-->


<title>编辑厨师</title>
</head>
<body>
<article class="page-container">
	<form id="from1" class="form form-horizontal" runat="server">
      <%
          if (Session["user"] == null)
        {
            Response.Write("<script>alert('您还没有登录！'); window.location.href = 'login.aspx';</script>");
        }
          DataTable dt = new DataTable();
          string ID = Request.QueryString["ID"].ToString();
          dt = SQLHelper.Select("select * from cook,classify where cook.classifyId=classify.id and cook.id=" + ID);
          DataTable dt2 = new DataTable();
          dt2 = SQLHelper.Select("select * from classify");
      %>
		<div class="row cl">
			<label class="form-label col-xs-4 col-sm-2">厨师姓名：</label>
			<div class="formControls col-xs-8 col-sm-9">
				<input type="text" class="input-text" value=<%Response.Write(dt.Rows[0][1]); %> placeholder="" id="name" name="name">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-xs-4 col-sm-2">厨师工号：</label>
			<div class="formControls col-xs-8 col-sm-9">
				<input type="text" class="input-text" value=<%Response.Write(dt.Rows[0]["account"]); %> placeholder="" id="account" name="account">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-xs-4 col-sm-2">选择组别：</label>
			<div class="formControls col-xs-8 col-sm-9"> <span class="select-box">
				<select name="classify" class="select">
                    <%for (int i = 0; i < dt2.Rows.Count; i++){

                    if (Convert.ToInt32( dt2.Rows[i][0]) == Convert.ToInt32( dt.Rows[0][3]))
                    { %>
				    <option value="<%Response.Write(dt2.Rows[i][0]); %>" selected = "selected"><%Response.Write(dt2.Rows[i][1]); %></option>
                    <%} 

                    else
                    { %>
                    <option value="<%Response.Write(dt2.Rows[i][0]); %>"><%Response.Write(dt2.Rows[i][1]); %></option>
                    <%}
                    } %>
				</select>
				</span> </div>
		</div>
		<div class="row cl">
			<label class="form-label col-xs-4 col-sm-2">厨师性别：</label>
			<div class="formControls col-xs-8 col-sm-9"> <span class="select-box">
				<select name="sex" class="select">
                    <%if (dt.Rows[0]["sex"].ToString() == "True")
                    { %>
					<option value="1" selected="selected">男</option>
					<option value="0">女</option>
                    <%} else {%>
                    <option value="1">男</option>
					<option value="0" selected="selected">女</option>
                    <%} %>

				</select>
				</span> </div>
		</div>
		<div class="row cl">
			<label class="form-label col-xs-4 col-sm-2">厨师电话：</label>
			<div class="formControls col-xs-8 col-sm-9">
				<input type="text" class="input-text" value=<%Response.Write(dt.Rows[0]["tel"]); %> placeholder="" id="tel" name="tel">
			</div>
		</div>
		<div class="row cl">
			<div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-2">
				<%--<button onClick="article_save_submit();" class="btn btn-primary radius" type="submit"><i class="Hui-iconfont">&#xe632;</i> 保存并提交</button>--%>
                <asp:Button ID="btnSubmit" runat="server" OnClick="btnSubmit_Click" class="btn btn-primary radius" Text="保存并提交"/>
				<button onClick="javascript:window.location.href='cook-list.aspx';" class="btn btn-default radius" type="button">&nbsp;&nbsp;取消&nbsp;&nbsp;</button>
			</div>
		</div>
	</form>
</article>

<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="static/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="static/h-ui.admin/js/H-ui.admin.js"></script> <!--/_footer /作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="lib/jquery.validation/1.14.0/jquery.validate.js"></script> 
<script type="text/javascript" src="lib/jquery.validation/1.14.0/validate-methods.js"></script> 
<script type="text/javascript" src="lib/jquery.validation/1.14.0/messages_zh.js"></script>
<script type="text/javascript" src="lib/webuploader/0.1.5/webuploader.min.js"></script> 
<script type="text/javascript">
$(function(){
	$('.skin-minimal input').iCheck({
		checkboxClass: 'icheckbox-blue',
		radioClass: 'iradio-blue',
		increaseArea: '20%'
	});
	
	//表单验证
	$("#from1").validate({
		rules:{
			name:{
				required:true,
			},
			tel:{
			    required: true,
			    digits: true,
			},
			sex:{
				required:true,
			},
			account:{
				required:true,
			},
			classify:{
				required:true,
			},
		},
		onkeyup:false,
		focusCleanup:true,
		success:"valid",
	});
});
</script>
<!--/请在上方写此页面业务相关的脚本-->
</body>
</html>
