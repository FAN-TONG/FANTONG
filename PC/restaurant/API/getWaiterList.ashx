<%@ WebHandler Language="C#" Class="getWaiterList" %>

using System;
using System.Web;
using System.Data;
using Newtonsoft.Json;

public class getWaiterList : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        string sql = "select * from waiter";
        DataTable dt = new DataTable();
        dt = SQLHelper.Select(sql);
        string final = JsonConvert.SerializeObject(dt);
        context.Response.ContentType = "application/json";
        context.Response.ContentEncoding = System.Text.Encoding.UTF8;
        context.Response.Write(final);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}