<%@ WebHandler Language="C#" Class="Logout" %>

using System;
using System.Web;

public class Logout : IHttpHandler,System.Web.SessionState.IRequiresSessionState {

    public void ProcessRequest (HttpContext context) {
        context.Session["user"] = null;
        string final = "{\"success\":1}";
        context.Response.Write(final);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}