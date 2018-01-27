<%@ WebHandler Language="C#" Class="getDishList" %>

using System;
using System.Web;
using System.Data;
using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
public class getDishList : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        string sqlTJ = @"select top 10 dish.id,name,price,pic,num
                    from [order],dish
                    where dish.id=[order].dishId
                    group by dishId,dish.id,name,price,pic,num";
        DataTable dtTJ = new DataTable();
        dtTJ = SQLHelper.Select(sqlTJ);

        string sqlLC = "select * from dish where classifyId=1";
        DataTable dtLC = new DataTable();
        dtLC = SQLHelper.Select(sqlLC);

        string sqlCS = "select * from dish where classifyId=2";
        DataTable dtCS = new DataTable();
        dtCS = SQLHelper.Select(sqlCS);

        string sqlYC = "select * from dish where classifyId=3";
        DataTable dtYC= new DataTable();
        dtYC = SQLHelper.Select(sqlYC);

        string sqlSC= "select * from dish where classifyId=4";
        DataTable dtSC= new DataTable();
        dtSC= SQLHelper.Select(sqlSC);

        string sqlZC = "select * from dish where classifyId=5";
        DataTable dtZC = new DataTable();
        dtZC = SQLHelper.Select(sqlZC);

        string sqlMC = "select * from dish where classifyId=6";
        DataTable dtMC = new DataTable();
        dtMC = SQLHelper.Select(sqlMC);

        string sqlXC = "select * from dish where classifyId=7";
        DataTable dtXC = new DataTable();
        dtXC= SQLHelper.Select(sqlXC);

        string sqlHC = "select * from dish where classifyId=8";
        DataTable dtHC = new DataTable();
        dtHC= SQLHelper.Select(sqlHC);

        Dictionary<string, DataTable> dic = new Dictionary<string, DataTable>();
        dic.Add("tj", dtTJ);
        dic.Add("lc", dtLC);
        dic.Add("cs", dtCS);
        dic.Add("sc", dtSC);
        dic.Add("yc", dtYC);
        dic.Add("mc", dtMC);
        dic.Add("xc", dtXC);
        dic.Add("zc", dtZC);
        string final = JsonConvert.SerializeObject(dic);
        context.Response.ContentType = "application/json";
        context.Response.ContentEncoding = System.Text.Encoding.UTF8;
        context.Response.Write(final);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}