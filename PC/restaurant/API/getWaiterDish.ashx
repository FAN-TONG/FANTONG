<%@ WebHandler Language="C#" Class="getWaiterDish" %>

using System;
using System.Web;
using System.Data;
using Newtonsoft.Json;
public class getWaiterDish : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        string ID = Convert.ToString(context.Request.QueryString["waiterId"]);
        string sql1 = "select [order].id,dishId,tableId,dish.name from [order],dish where [order].dishId=dish.id and status=1";
        DataTable dt1 = new DataTable();
        dt1 = SQLHelper.Select(sql1);
        string final1 = JsonConvert.SerializeObject(dt1);
        string sql2 = "select [order].id,dishId,tableId,dish.name from [order],dish where [order].dishId=dish.id and waiterId=" + ID + " and status=2";
        DataTable dt2 = new DataTable();
        dt2 = SQLHelper.Select(sql2);
        string final2 = JsonConvert.SerializeObject(dt2);
        string final = "{\"no\":"+final1+",\"get\":"+final2+"}";
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