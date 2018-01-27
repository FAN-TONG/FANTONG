<%@ WebHandler Language="C#" Class="orderGet" %>

using System;
using System.Web;
using System.Data;
using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
public class orderGet : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        string date1 = Convert.ToString(context.Request.Form["date1"]);
        string date2 = Convert.ToString(context.Request.Form["date2"]);
        DateTime dtSmall = DateTime.ParseExact(date1, "yyyyMMdd", System.Globalization.CultureInfo.CurrentCulture);
        DateTime dtBig = DateTime.ParseExact(date2, "yyyyMMdd", System.Globalization.CultureInfo.CurrentCulture);
        dtBig = dtBig.AddMonths(1);
        string dSmall = dtSmall.ToString("yyyy/MM/dd");
        string dBig = dtBig.ToString("yyyy/MM/dd");

        string sql = @"select datepart(month,time) as month,dish.name,count(dish.name) from [order],dish where
                    [order].dishId=dish.id and time>='" + dSmall + "' and time < '" + dBig + "' group by datepart(month,time),dish.name";
        DataTable dt = new DataTable();
        dt = SQLHelper.Select(sql);
        List<string> arrayTime = new List<string>();


        while (DateTime.Compare(dtBig, dtSmall) > 0)
        {
            arrayTime.Add(dtSmall.ToString("yyyy/MM"));
            dtSmall=dtSmall.AddMonths(1);
        }
        Dictionary<string, List<int>> dic = new Dictionary<string, List<int>>();
        Dictionary<string, List<int>> res = new Dictionary<string, List<int>>();
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            int mon = Convert.ToInt32(dt.Rows[i]["month"]);
            int num = Convert.ToInt32(dt.Rows[i][2]);
            string name = dt.Rows[i]["name"].ToString();
            if (dic.ContainsKey(name))
            {
                dic[name][mon] += num;
            }
            else
            {
                List<int> arrayInfo = new List<int>();
                for (int j = 1; j <= 13; j++)
                {
                    arrayInfo.Add(0);
                }
                dic.Add(name, arrayInfo);
                List<int> temp = new List<int>();
                res.Add(name, temp);
                dic[name][mon] += num;
            }
        }
        //拼接
        for (int i = 0; i < arrayTime.Count; i++)
        {
            int mon = Convert.ToInt32(arrayTime[i].Substring(arrayTime[i].Length - 2, 2));
            foreach (var item in dic)
            {
                res[item.Key].Add(dic[item.Key][mon]);
            }
        }
        ArrayList resArray = new ArrayList();
        foreach (var item in res)
        {
            Dictionary<string, object> resData = new Dictionary<string, object>();
            resData.Add("name", item.Key);
            resData.Add("data", res[item.Key]);
            resArray.Add(resData);

        }
        Dictionary<string, object> resDataR = new Dictionary<string, object>();
        resDataR.Add("series", resArray);
        resDataR.Add("categories", arrayTime);
        string final = JsonConvert.SerializeObject(resDataR);
        context.Response.Write(final);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}