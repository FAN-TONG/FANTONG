<%@ WebHandler Language="C#" Class="doOrder" %>

using System;
using System.Web;

public class doOrder : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        string ID = Convert.ToString(context.Request.Form["order"]);
        //string sql = "select [order].id,dishId,dish.name from [order],dish where [order].dishId=dish.id and cookId=" + ID + " and status=0";
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}