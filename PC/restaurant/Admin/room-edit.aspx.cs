using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Admin_room_edit : System.Web.UI.Page
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
        string id = Request.QueryString["ID"].ToString();
        string name = Request.Form["name"];
        string sql = "update room set name=N'" + name + "' where id=" + id;
        int res = SQLHelper.SqlExecute(sql);
        if (res > 0)
        {
            Response.Write("<script>alert('修改成功！'); window.location.href = 'room-list.aspx';</script>");
        }
        else
        {
            Response.Write("<script>alert('修改失败！');</script>");
        }
    }
}