<%@ WebHandler Language="C#" Class="addAdmin" %>

using System;
using System.Web;
using System.Data;
using Newtonsoft.Json;
public class addAdmin : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        string password = Convert.ToString(context.Request.Form["admin_pwd"]);
        string username = Convert.ToString(context.Request.Form["admin_acc"]);
        string sqlTest = "select * from admin where account='" + username + "'";
        DataTable dt = new DataTable();
        dt = SQLHelper.Select(sqlTest);
        string final;
        if (dt.Rows.Count > 0)
        {
            final = "{\"success\":2}";
        }
        else
        {
            string sqlInsert = "insert into admin values('" + username + "','" + password + "',NULL) ";
            int res = SQLHelper.SqlExecute(sqlInsert);
            final = "{\"success\":"+res+"}";
        }
        context.Response.Write(final);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}