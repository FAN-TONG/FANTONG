using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Admin_dish_edit : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["user"] == null)
        {
            Response.Write("<script>alert('您还没有登录！'); window.location.href = 'login.aspx';</script>");
        }
    }

    string uploadPic() //上传封面图片，返回文件名。
    {
        //int maxFileSize = 3145728; // 限制为3MiB以下
        if (FilePic.HasFile)
        {
            //取得文件MIME内容类型 
            string uploadFileType = this.FilePic.PostedFile.ContentType.ToLower();
            if (!uploadFileType.Contains("image"))    //图片的MIME类型为"image/xxx"，这里只判断是否图片。 
            {
                lblUploadMessage.Visible = true;
                lblUploadMessage.Text = "只能上传图片类型文件！";

                return "error";
            }
            string f1 = DateTime.Now.ToFileTime().ToString() + ".jpg";
            string path = "./images/" + f1;
            FilePic.SaveAs(Server.MapPath(path));
            lblUploadMessage.Text = "上传成功";
            lblUploadMessage.Visible = true;
            return path;
        }
        else
        {
            lblUploadMessage.Text = "必须选择图片";
            lblUploadMessage.Visible = true;
            return null;
        }
    }
    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        string id = Request.QueryString["ID"];
        string name = Request.Form["name"];
        string price = Request.Form["price"];
        string num = "0";
        string classify = Request.Form["classify"];
        string sql = "";
        if (FilePic.HasFile)
        {
            string path = uploadPic();
            sql = "update dish set name=N'" + name + "',price='" + price + "',num='" + num + "',classifyId='" + classify + "',pic='" + path + "' where id=" + id;
        }
        else
        {
            sql = "update dish set name=N'" + name + "',price='" + price + "',num='" + num + "',classifyId='" + classify + "' where id=" + id;
        }
        int res = SQLHelper.SqlExecute(sql);
        if (res > 0)
        {
            Response.Write("<script>alert('修改成功！'); window.location.href = 'dish-list.aspx';</script>");
        }
        else
        {
            Response.Write("<script>alert('修改失败！');</script>");
        }

    }
}