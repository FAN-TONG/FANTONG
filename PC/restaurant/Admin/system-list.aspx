<%@ Page Language="C#" AutoEventWireup="true" CodeFile="system-list.aspx.cs" Inherits="Admin_system_list" %>

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
<link rel="stylesheet" type="text/css" href="static/css/dateyearmonth.css"/>

<style>
    #kui_txt_calendar{
    position:absolute;
    top: 150px;
}
</style>
<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>分月统计</title>
</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 统计管理 <span class="c-gray en">&gt;</span> 分月统计 <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="page-container">
    <div style="padding-right:50px; margin-top: 50px; padding-left: 50px">
    <input type="text" id="txt_calendar" placeholder="获取时间" value="" data-format="yyyy-mm - yyyy-mm" data-max-year="2017" data-min-year="2000" readonly="readonly"/>
        <a class="btn btn-primary radius" onclick="show()" href="javascript:;"><i class="Hui-iconfont">&#xe600;</i>
                查询</a>
    </div>
    <div id="container" style="min-width:700px;height:400px"></div>
</div>
<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="static/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="static/h-ui.admin/js/H-ui.admin.js"></script> <!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script src="static/js/dateyearmonth.js"></script>
<script type="text/javascript" src="lib/hcharts/Highcharts/5.0.6/js/highcharts.js"></script>
<script type="text/javascript" src="lib/hcharts/Highcharts/5.0.6/js/modules/exporting.js"></script>
<script type="text/javascript">
    var date = new Date;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" + month : month);
    $("#txt_calendar").val(year + "-" + month + " - " + year + "-" + month);
     var myDate1 = new dateyearmonth({id:'txt_calendar'});
     $(function () {
         show();
     });
     function show() {
         var text = $("#txt_calendar").val()+"";
         var texts = text.split(" - ");
         var mydate1 = texts[0].replace("-","")+"01";
         var mydate2 = texts[1].replace("-","")+"01";
         var spanYear = getMonthNumber(mydate1, mydate2);
         var date1 = new Date(texts[0] + "-01");
         var date2 = new Date(texts[1] + "-01");
         console.log(date1);

         if (spanYear > 12) {
             alert('所选月份间隔不能大于12个月！');
             return;
         }
         $.ajax({
             type: 'POST',
             url: './API/orderGet.ashx',
             data: { date1: mydate1,date2:mydate2 },
             dataType: 'json',
             success: function (data) {
                 var categories = data.categories;
                 var series = data.series;
                 
                 DataBind(categories, series);
             },
             error: function (data) {
                 console.log(data.msg);
             },
         });


     }
    
     function DataBind(categories, series) {
         Highcharts.chart('container', {
             title: {
                 text: '菜品销量',
                 x: -20 //center
             },
             subtitle: {
                 text: 'FANTONG',
                 x: -20
             },
             xAxis: {
                 categories: categories,
             },
             yAxis: {
                 title: {
                     text: '销量（份）'
                 },
                 plotLines: [{
                     value: 0,
                     width: 1,
                     color: '#808080'
                 }]
             },
             tooltip: {
                 valueSuffix: '份'
             },
             legend: {
                 layout: 'vertical',
                 align: 'right',
                 verticalAlign: 'middle',
                 borderWidth: 0
             },
             series: series
         });
     }

    function getMonthNumber(date1, date2) {
         //默认格式为"20030303",根据自己需要改格式和方法
         var year1 = date1.substr(0, 4);
         var year2 = date2.substr(0, 4);
         var month1 = date1.substr(4, 2);
         var month2 = date2.substr(4, 2);

         var len = (year2 - year1) * 12 + (month2 - month1);

         return len;

     }


</script>
</body>
</html>