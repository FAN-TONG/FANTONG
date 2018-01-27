<%@ WebHandler Language="C#" Class="dishPay" %>

using System;
using System.Web;
using System.Data;
using System.Collections.Generic;
using Newtonsoft.Json;
public class dishPay : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        string tableId = Convert.ToString(context.Request.Form["tableId"]);
        List<string> sqls = new List<string>();
        sqls.Add("update [table] set [status]=0 where id=" + tableId);
        sqls.Add("update [order] set [status]=4 where tableId=" + tableId);
        bool res = SQLHelper.SqlExecuteTrans(sqls);
        string final;
        if (res)
        {
            final = "{\"res\":1}";
        }
        else{
            final = "{\"res\":0}";
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