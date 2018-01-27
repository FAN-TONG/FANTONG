<%@ WebHandler Language="C#" Class="Login" %>

using System;
using System.Web;
using System.Data;
using Newtonsoft.Json;
using System.Web.SessionState;
public class Login: IHttpHandler,System.Web.SessionState.IRequiresSessionState {

    public void ProcessRequest (HttpContext context) {
        string username = Convert.ToString(context.Request.Form["username"]);
        string password = Convert.ToString(context.Request.Form["password"]);
        string sql = "select * from admin where account='" + username + "'and password='" + password + "'";
        DataTable dt = new DataTable();
        dt = SQLHelper.Select(sql);
        int res = dt.Rows.Count;
        if (res > 0)
        {
            context.Session["user"] = username;
        }
        string final = "{\"res\":" + res + "}";
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