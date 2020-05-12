using System;
using System.Collections.Generic;

namespace Entity
{
    public class Pedido
    {
        public decimal CodigoPedido{get;set;}
        public DateTime FechaPedido{get;set;}
        public decimal TotalPedido{get;set;}
        public string IdCliente{get;set;}
        public List<Detalles> detalles;
        public string Estado {get;set;}
    }
}