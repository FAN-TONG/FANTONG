<%@ WebHandler Language="C#" Class="userLogin" %>

using System;
using System.Web;
using System.Data;
using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
public class userLogin : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        string tel = Convert.ToString(context.Request.Form["tel"]);
        string pwd = Convert.ToString(context.Request.Form["pwd"]);

        string sql = "SELECT * FROM member WHERE account='" + tel + "' and password='" + pwd + "' and time > DATEADD(MINUTE,-10,GETDATE())";
        DataTable dt = new DataTable();
        dt = SQLHelper.Select(sql);
        string final;
        if (dt.Rows.Count > 0)
        {
            final = "{\"success\":1}";
        }
        else
        {
            final = "{\"success\":0}";
        }
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