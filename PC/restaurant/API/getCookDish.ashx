<%@ WebHandler Language="C#" Class="getCookDish" %>

using System;
using System.Web;
using System.Data;
using Newtonsoft.Json;
public class getCookDish : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        string ID = Convert.ToString(context.Request.QueryString["cookId"]);
        string sql = "select [order].id,dishId,dish.name from [order],dish where [order].dishId=dish.id and cookId=" + ID + " and status=0";
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