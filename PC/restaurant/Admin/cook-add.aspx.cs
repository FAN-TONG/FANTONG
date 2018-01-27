using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Admin_cook_add : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["user"] == null)
        {
            Response.Write("<script>alert('您还没有登录！'); window.location.href = 'login.aspx';</script>");
        }
    }

    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        string name = Request.Form["name"];
        string account = Request.Form["account"];
        string sex = Request.Form["sex"];
        string classify = Request.Form["classify"];
        string tel = Request.Form["tel"];
        string sql = "insert into cook values(N'" + name + "','" + account + "','" + classify + "','" + sex + "','" + tel + "')";
        int res = SQLHelper.SqlExecute(sql);
        if (res > 0)
        {
            Response.Write("<script>alert('添加成功！'); window.location.href = 'cook-list.aspx';</script>");
        }
        else
        {
            Response.Write("<script>alert('添加失败！');</script>");
        }
    }
}