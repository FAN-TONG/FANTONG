<%@ WebHandler Language="C#" Class="changeCookStatus" %>

using System;
using System.Web;

public class changeCookStatus : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        string ID = Convert.ToString(context.Request.Form["ID"]);
        string sta = Convert.ToString(context.Request.Form["sta"]);
        string sql = "update cook set [status]=" + sta + " where id=" + ID;
        int res = SQLHelper.SqlExecute(sql);
        string final = "";
        if (res > 0)
        {
            final = "{\"res\":1}";

        }
        else
        {
            final = "{\"res\":0}";
        }
        context.Response.Write(final);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}