<%@ WebHandler Language="C#" Class="sendMessage" %>

using System;
using System.Web;
using RestSharp;
using System.Data;
using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
public class sendMessage : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        string tel = Convert.ToString(context.Request.Form["tel"]);
        Random rad = new Random();
        int pwd = rad.Next(1000, 10000);
        string sql = "select count(*) from member where account='" + tel + "'";
        DataTable dt = new DataTable();
        dt = SQLHelper.Select(sql);
        int res = 0;
        string dateStr = DateTime.Now.ToString("G");
        if (Convert.ToInt32(dt.Rows[0][0]) > 0)
        {
            string sqlUpdate = "update member set password='" + pwd.ToString() + "',time='" + dateStr + "' where account='" + tel + "'";
            res = SQLHelper.SqlExecute(sqlUpdate);
        }
        else
        {
            string sqlInsert = "insert into member values('" + tel + "','" + pwd.ToString() + "','" + dateStr + "')";
            res = SQLHelper.SqlExecute(sqlInsert);
        }
        Dictionary<string, string> resDic = new Dictionary<string, string>();
        if (res > 0)
        {
            string content = "【FANTONG】尊敬的用户您好，您的验证码是 " + pwd.ToString() + " ，请在10分钟内完成登录。";
            content = System.Web.HttpUtility.UrlEncode(content);
            string url = @"http://apis.haoservice.com/sms/sendv2?mobile=" + tel + "&tpl_id=2903&content=" + content + "&key=05a4761e76ac43e1a8992a656eb62938";
            var client = new RestClient(url);
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);
            context.Response.ContentType = "application/json";
            context.Response.ContentEncoding = System.Text.Encoding.UTF8;
            context.Response.Write(response.Content);
        }
        else
        {
            context.Response.ContentType = "application/json";
            context.Response.ContentEncoding = System.Text.Encoding.UTF8;
            context.Response.Write("{\"error_code\":88888,\"reason\":\"发生未知错误\",\"result\":null}");
        }

    }


    public bool IsReusable {
        get {
            return false;
        }
    }

}