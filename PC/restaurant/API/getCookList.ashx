<%@ WebHandler Language="C#" Class="getCookList" %>

using System;
using System.Web;
using System.Data;
using Newtonsoft.Json;
public class getCookList : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        string sql = "select * from cook";
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