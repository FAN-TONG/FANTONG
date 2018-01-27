<%@ WebHandler Language="C#" Class="dishDone" %>

using System;
using System.Web;
using System.Data;
using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
public class dishDone : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        string ID = Convert.ToString(context.Request.QueryString["ID"]);
        string sql = "update [order] set status=1 where id=" + ID;
        int res = SQLHelper.SqlExecute(sql);
        Dictionary<string, string> resD=new Dictionary<string, string>();
        if (res > 0)
        {
            resD.Add("success", "1");
        }
        else
        {
            resD.Add("success", "0");
        }
        string final = JsonConvert.SerializeObject(resD);
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