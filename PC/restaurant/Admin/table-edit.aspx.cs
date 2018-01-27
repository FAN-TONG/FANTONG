using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Admin_tabel_edit : System.Web.UI.Page
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
        string ID = Request.QueryString["ID"];
        string id = Request.Form["tableId"];
        string num = Request.Form["num"];
        string place = Request.Form["place"];
        string sql = "";
        if (place == "0")
        {
            sql = "update [table] set id='" + id + "',peopleNum='" + num + "',roomId=NULL where id=" + ID;
        }
        else
        {
            sql = "update [table] set id='" + id + "',peopleNum='" + num + "',roomId='"+place+"' where id=" + ID;
        }
        ID = id;
        int res = SQLHelper.SqlExecute(sql);
        if (res > 0)
        {
            Response.Write("<script>alert('修改成功！'); window.location.href = 'table-list.aspx';</script>");
        }
        else
        {
            Response.Write("<script>alert('添加失败！');</script>");
        }
    }
}