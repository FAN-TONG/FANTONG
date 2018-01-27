using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocketServer
{
    public class Order
    {
        public int id { get; set; }
        public int tableId { get; set; }
        public string tel { get; set; }
    }

    public class OrderCom
    {
        public string type { get; set; }
        public List<Order> order { get; set; }
    }
}
