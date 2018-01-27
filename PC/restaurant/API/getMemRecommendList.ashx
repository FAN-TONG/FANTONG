<%@ WebHandler Language="C#" Class="getMemRecommendList" %>

using System;
using System.Web;
using System.Data;
using Newtonsoft.Json;
public class getMemRecommendList : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        string ID = Convert.ToString(context.Request.QueryString["ID"]);
        string sql = @"select TOP 10 * 
                    from dish where classifyId in(
	                select TOP 1 classifyId
					from dish,[order],member
					where [order].memberId=member.id
					and dish.id=[order].dishId
					and member.id=" + ID + "group by classifyId order by count(classifyId) desc)";
        DataTable dt = new DataTable();
        dt = SQLHelper.Select(sql);
        string final = JsonConvert.SerializeObject(dt);
        context.Response.Write(final);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}