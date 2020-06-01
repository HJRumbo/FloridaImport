using System;
using System.Collections.Generic;

namespace Entity
{
    public class Venta
    {
        public decimal CodigoVenta {get;set;}
        public DateTime FechaVenta{get;set;}
        public decimal Total{get;set;}
        public string IdCliente{get;set;}
        public List<Detalle> ListaDetalles;
    }
}