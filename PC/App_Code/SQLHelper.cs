using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;

/// <summary>
/// SQLHelper 的摘要说明
/// </summary>
public class SQLHelper
{
    public SQLHelper()
    {
        //
        // TODO: 在此处添加构造函数逻辑
        //
    }
    public static string ConnStr = @"server=(localdb)\v11.0;Integrated Security=SSPI;database=restaurant;";

    static public DataTable Select(string sql)
    {
        using (SqlConnection conn = new SqlConnection(ConnStr))
        {
            DataTable dt = new DataTable();
            {
                conn.Open();//打开
                SqlDataAdapter da = new SqlDataAdapter(sql, conn);
                da.Fill(dt);//进行填充
            }
            return dt;
        }
    }
    static public int SqlExecute(string ex)
    {
        using (SqlConnection conn = new SqlConnection(ConnStr))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand(ex, conn);
            return Convert.ToInt32(cmd.ExecuteNonQuery());
        }
    }
}