using System;
using System.Collections.Generic;

namespace Entity
{
    public class Pedido
    {
        public decimal CodigoPedido{get;set;}
        public string FechaPedido{get;set;}
        public string HoraPedido{get;set;}
        public decimal TotalPedido{get;set;}
        public string IdCliente{get;set;}
        public List<Detalle> Detalles {get;set;}
        public string Estado {get;set;}

        public void CalcularTotal(){

            foreach (var item in Detalles)
            {
              TotalPedido = TotalPedido + item.TotalDetalle;   
            }
        }

        public void EstadoInicial(){

            Estado = "Recibido";
        }
    }
}