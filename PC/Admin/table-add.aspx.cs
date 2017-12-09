using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class table_add : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        string id = Request.Form["tableId"];
        string num = Request.Form["num"];
        string place = Request.Form["place"];
        string sql = "";
        if (place == "0")
        {
            sql = "insert into [table](id,peopleNum,status)values('" + id + "','" + num + "',0)";
        }
        else
        {
            sql = "insert into [table](id,peopleNum,roomId,status)values('" + id + "','" + num + "','" + place + "',0)";
        }
        int res = SQLHelper.SqlExecute(sql);
        if (res > 0)
        {
            Response.Write("<script>alert('添加成功！'); window.location.href = 'table-list.aspx';</script>");
        }
        else
        {
            Response.Write("<script>alert('添加失败！');</script>");
        }
    }
}