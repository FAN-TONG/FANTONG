<%@ WebHandler Language="C#" Class="getMemberdish" %>

using System;
using System.Web;
using System.Data;
using System.Collections.Generic;
using Newtonsoft.Json;
public class getMemberdish : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        string memberId = Convert.ToString(context.Request.QueryString["memberId"]);
        string sql = @"select name,pic,dishId,count(dishId) as num
                        from [order],dish
                        where dish.id=[order].dishId and
                        memberId ='"+memberId+@"'
                        group by dishId,name,pic
                        order by count(dishId) desc;";

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