<%@ WebHandler Language="C#" Class="getTableList" %>

using System;
using System.Web;
using System.Data;
using Newtonsoft.Json;
public class getTableList : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        string sql = "select id from [table] where [status]=0  order by id";
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