using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Entity;

namespace floridaimportdotnet.Models
{
    public class PedidoInputModel
    {   
        public decimal CodigoPedido{get;set;}
        [Required(ErrorMessage = "La fecha del pedido es requerido")]
        public DateTime FechaPedido{get;set;}
        [Required(ErrorMessage = "La identificacion del cliente es requerido")]
        public string IdCliente{get;set;}
        [Required(ErrorMessage = "Al menos un detalle es requerido")]
        public List<Detalle> Detalles{get;set;}
    }

    public class PedidoViewModel : PedidoInputModel
    {   
        public PedidoViewModel()
        {

        }
        public PedidoViewModel(Pedido pedido)
        {
            CodigoPedido = pedido.CodigoPedido;
            FechaPedido = pedido.FechaPedido;
            IdCliente = pedido.IdCliente;
            Detalles = pedido.Detalles;
            TotalPedido = pedido.TotalPedido;
            Estado = pedido.Estado;
        }

        public decimal TotalPedido{get;set;}
        public string Estado {get;set;}
    }

}