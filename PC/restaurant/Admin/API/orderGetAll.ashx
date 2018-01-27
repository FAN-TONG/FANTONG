<%@ WebHandler Language="C#" Class="orderGetAll" %>

using System;
using System.Web;
using System.Data;
public class orderGetAll : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        string sql = "select dish.name from dish,[order] where dish.id=[order].dishId";
        DataTable dt = new DataTable();
        dt = SQLHelper.Select(sql);
        string final = "";
        for(int i = 0; i < dt.Rows.Count; i++)
        {
            final += dt.Rows[i][0].ToString() + " ";
        }
        context.Response.Write(final);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}