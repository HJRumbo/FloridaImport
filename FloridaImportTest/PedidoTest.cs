using System;
using System.Collections.Generic;
using System.Text;
using floridaimportdotnet.Controllers;
using floridaimportdotnet.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using floridaimportdotnet.Config;
using Microsoft.Extensions.Options;
using Entity;
using floridaimportdotnet.Models;
using Logica;
using Datos;

namespace FloridaImportTest
{
    [TestFixture]
    class PedidoTest
    {
        public IConfiguration Configuration { get; }
        string connectionString = "Server=localHost\\SQLEXPRESS;Database=FloridaImport;Trusted_Connection = True; MultipleActiveResultSets = true";
        PedidoService _pedidoService;
        ProductoService _productoService;

        public PedidoTest()
        {
            _pedidoService = new PedidoService(connectionString);
            _productoService = new ProductoService(connectionString);

        }

        [Test]
        public void GuardarTest()
        {
            Pedido pedido = new Pedido();
            Detalle detalle = new Detalle();
            Producto producto = new Producto();
            List<Detalle> detalles = new List<Detalle>();

            pedido.FechaPedido = "13/10/2020";
            pedido.HoraPedido = "30:10:01";
            pedido.IdCliente = "1234567";
            detalle.CodigoProducto = 8;
            detalle.CantidadProducto = 2;
            producto = _productoService.BuscarxCodigo(detalle.CodigoProducto);
            detalle.TotalDetalle = producto.Precio * detalle.CantidadProducto;
            detalles.Add(detalle);
            pedido.Detalles = detalles;

            GuardarPedidoResponse pedidoReturn = _pedidoService.Guardar(pedido);

            Assert.AreEqual(false, pedidoReturn.Error);
        }

        [Test]
        public void ModificarTest()
        {
            Pedido pedido = new Pedido();
            Detalle detalle = new Detalle();
            Producto producto = new Producto();
            List<Detalle> detalles = new List<Detalle>();

            pedido.CodigoPedido = 9;
            pedido.FechaPedido = "2020/10/13";
            pedido.HoraPedido = "01:34:20";
            pedido.IdCliente = "1234567";
            detalle.CodigoDetalle = 13;
            detalle.CodigoProducto = 8;
            detalle.CantidadProducto = 3;
            producto = _productoService.BuscarxCodigo(detalle.CodigoProducto);
            detalle.TotalDetalle = producto.Precio * detalle.CantidadProducto;
            detalles.Add(detalle);
            pedido.Detalles = detalles;

            string mensaje = _pedidoService.Modificar(pedido);

            Assert.AreEqual($"El pedido se ha modificado satisfactoriamente.", mensaje);
        }

        //[Test]
        //public void EliminarTest()
        //{
        //    string nombre = "Portugal";
        //    Pais pais = _paisService.BuscarxNombre(nombre);
        //    string mensaje = _paisService.Eliminar(nombre);
        //    Assert.AreEqual($"El registro {pais.Nombre} se ha eliminado satisfactoriamente.", mensaje);
        //}

        [Test]
        public void ConsultarTest()
        {
            List<Pedido> pedidoReturn, pedidos;
            pedidoReturn = new List<Pedido>();
            pedidoReturn = _pedidoService.ConsultarTodos();
            pedidos = pedidoReturn;

            Assert.AreEqual(pedidos, pedidoReturn);
        }
    }
}
