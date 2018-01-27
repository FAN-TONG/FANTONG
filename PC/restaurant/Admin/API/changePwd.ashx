<%@ WebHandler Language="C#" Class="changePwd" %>

using System;
using System.Web;

public class changePwd : IHttpHandler,System.Web.SessionState.IRequiresSessionState {

    public void ProcessRequest (HttpContext context) {
        string user = context.Session["user"].ToString();
        string password = Convert.ToString(context.Request.Form["new_pwd"]);
        string sql = "update admin set password='" + password + "' where account='" + user + "'";
        int res = SQLHelper.SqlExecute(sql);
        string final;
        if (res > 0)
        {
            final = "{\"success\":1}";

        }
        else
        {
            final = "{\"success\":0}";
        }
        context.Response.Write(final);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}