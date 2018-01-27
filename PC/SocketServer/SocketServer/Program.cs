using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fleck;
using Newtonsoft.Json;
using System.Collections;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Sockets;
using System.Threading;

namespace SocketServer
{
    class Program
    {
        static void Main(string[] args)
        {
            string HOST=GetLocalIP();
            FleckLog.Level = LogLevel.Debug;
            var allSockets = new List<IWebSocketConnection>();
            var server = new WebSocketServer("ws://"+ HOST + ":3000");
            server.Start(socket =>
            {
                socket.OnOpen = () =>
                {
                    Console.WriteLine("Open!");
                    allSockets.Add(socket);
                };
                socket.OnClose = () =>
                {
                    Console.WriteLine("Close!");
                    allSockets.Remove(socket);
                };
                socket.OnMessage = message =>
                {
                    Dictionary<string, object> data = JsonConvert.DeserializeObject<Dictionary<string, object>>(message);
                    ArrayList arrayParams = new ArrayList();
                    arrayParams.Add(allSockets);
                    arrayParams.Add(message);
                    if (data["type"].ToString() == "order")
                    {
                        Thread thread = new Thread(new ParameterizedThreadStart(DoOrder));
                        thread.IsBackground = true;
                        thread.Start(arrayParams);
                    }
                    if (data["type"].ToString() == "done")
                    {
                        Thread thread = new Thread(new ParameterizedThreadStart(DoDone));
                        thread.IsBackground = true;
                        thread.Start(arrayParams);
                    }
                    if (data["type"].ToString() == "get")
                    {
                        Thread thread = new Thread(new ParameterizedThreadStart(DoGET));
                        thread.IsBackground = true;
                        thread.Start(arrayParams);
                    }
                    if (data["type"].ToString() == "give")
                    {
                        Thread thread = new Thread(new ParameterizedThreadStart(DoGive));
                        thread.IsBackground = true;
                        thread.Start(arrayParams);
                    }
                };
            });
            var input = Console.ReadLine();
        }

        public static void DoDone(object Params)
        {
            ArrayList arrayParams = (ArrayList)Params;
            string data = arrayParams[1].ToString();
            var allSockets = (List<IWebSocketConnection>)arrayParams[0];
            Dictionary<string, string> dish = JsonConvert.DeserializeObject<Dictionary<string, string>>(data);
            string id = dish["id"];

            string sql = "update [order] set [status]=1 where id=" + id;
            int res = SQLHelper.SqlExecute(sql);
            DataTable dtRes = new DataTable();
            if (res > 0){
                string sqlRes = "select name,[order].id,tableId from dish,[order] where dish.id=[order].dishId and [order].id=" + id;   
                dtRes = SQLHelper.Select(sqlRes);
                
            }
            string final = JsonConvert.SerializeObject(dtRes);
            final = final.Replace("[", "");
            final = "{\"type\":\"waiter\",\"dish\":[" + final + "}";
            allSockets.ToList().ForEach(s => s.Send(final));
        }

        public static void DoGET(object Params)
        {
            ArrayList arrayParams = (ArrayList)Params;
            string data = arrayParams[1].ToString();
            var allSockets = (List<IWebSocketConnection>)arrayParams[0];
            Dictionary<string, string> dish = JsonConvert.DeserializeObject<Dictionary<string, string>>(data);
            string id = dish["id"];
            string waiterId = dish["waiterId"];
            string sql = "update [order] set waiterId="+waiterId+",[status]=2 where id=" + id;
            int res = SQLHelper.SqlExecute(sql);
            DataTable dtRes = new DataTable();
            if (res > 0)
            {
                string sqlRes = "select [order].id,tableId,waiterId from dish,[order] where dish.id=[order].dishId and [order].id=" + id;
                dtRes = SQLHelper.Select(sqlRes);

            }
            string final = JsonConvert.SerializeObject(dtRes);
            final = final.Replace("[", "");
            final = "{\"type\":\"got\",\"dish\":[" + final + "}";
            allSockets.ToList().ForEach(s => s.Send(final));
        }

        public static void DoOrder(object Params)
        {
            ArrayList arrayParams = (ArrayList)Params;
            string data = arrayParams[1].ToString();
            var allSockets =  (List<IWebSocketConnection>)arrayParams[0];
            OrderCom order = JsonConvert.DeserializeObject<OrderCom>(data);
            for (int i = 0; i < order.order.Count; i++)
            {
                string sqlCla = "select classifyId from dish where id=" + order.order[i].id.ToString();
                DataTable dt = new DataTable();
                dt = SQLHelper.Select(sqlCla);
                string classifyId = dt.Rows[0][0].ToString();
                string sqlSelect = "select cook.id from cook left outer join [order] on( [order].cookId=cook.id) where cook.classifyId=" + classifyId + " and cook.[status]=1 group by cook.id order by count(cook.id)";
                dt.Clear();
                dt = SQLHelper.Select(sqlSelect);
                string cookId = dt.Rows[0]["id"].ToString();
                string dateStr = DateTime.Now.ToString("G");
                string sqlInsert;
                if (order.order[i].tel!="")
                    sqlInsert = "insert into [order] values(" + order.order[i].id + "," + order.order[i].tableId + "," + cookId + ",NULL,0,'" + order.order[i].tel + "','" + dateStr + "')";
                else
                    sqlInsert = "insert into [order] values(" + order.order[i].id + "," + order.order[i].tableId + "," + cookId + ",NULL,0,NULL,'" + dateStr + "')";
                int res = SQLHelper.SqlExecute(sqlInsert);
            }
            try
            {
                string sqlInsert = "update  [table] set [status]=1 where id=" + order.order[0].tableId;
                int ress = SQLHelper.SqlExecute(sqlInsert);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }

            string sqlRes = "select top " + order.order.Count.ToString() + " name,price,[order].id,tableId,cookId from dish,[order] where dish.id=[order].dishId order by [order].id desc";
            DataTable dtRes = new DataTable();
            dtRes = SQLHelper.Select(sqlRes);
            string final = JsonConvert.SerializeObject(dtRes);
            final = final.Replace("[", "");
            final = "{\"type\":\"cook\",\"dish\":[" + final + "}";
            allSockets.ToList().ForEach(s => s.Send(final));
        }

        public static void DoGive(object Params)
        {
            ArrayList arrayParams = (ArrayList)Params;
            string data = arrayParams[1].ToString();
            var allSockets = (List<IWebSocketConnection>)arrayParams[0];
            Dictionary<string, string> dish = JsonConvert.DeserializeObject<Dictionary<string, string>>(data);
            string id = dish["id"];
            string sql = "update [order] set [status]=3  where id=" + id;
            int res = SQLHelper.SqlExecute(sql);
            DataTable dtRes = new DataTable();
            if (res > 0)
            {
                string sqlRes = "select [order].id,tableId from [order] where [order].id=" + id;
                dtRes = SQLHelper.Select(sqlRes);

            }
            string final = JsonConvert.SerializeObject(dtRes);
            final = final.Replace("[", "");
            final = "{\"type\":\"given\",\"dish\":[" + final + "}";
            allSockets.ToList().ForEach(s => s.Send(final));
        }




        public static string GetLocalIP()
        {
            try
            {
                string HostName = Dns.GetHostName(); //得到主机名
                IPHostEntry IpEntry = Dns.GetHostEntry(HostName);
                for (int i = 0; i < IpEntry.AddressList.Length; i++)
                {
                    //从IP地址列表中筛选出IPv4类型的IP地址
                    //AddressFamily.InterNetwork表示此IP为IPv4,
                    //AddressFamily.InterNetworkV6表示此地址为IPv6类型
                    if (IpEntry.AddressList[i].AddressFamily == AddressFamily.InterNetwork)
                    {
                        return IpEntry.AddressList[i].ToString();
                    }
                }
                return "";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return "";
            }
        }
    }

}
