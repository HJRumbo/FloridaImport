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

namespace FloridaImportTest
{
    [TestFixture]
    class ProductoTest
    {
        public IConfiguration Configuration { get; }
        string connectionString = "Server=localHost\\SQLEXPRESS;Database=FloridaImport;Trusted_Connection = True; MultipleActiveResultSets = true";
        ProductoService _productoService;

        public ProductoTest()
        {
            _productoService = new ProductoService(connectionString);
        }

        [Test]
        public void GuardarTest()
        {
            Producto producto = new Producto();

            producto.Nombre = "Mango";
            producto.Descripcion = "Mango Tommy";
            producto.Cantidad = 20;
            producto.Precio = 2000;
            producto.Proveedor = "Frugol";
            producto.Tipo = "Fruta";
            producto.Imagen = $"https://firebasestorage.googleapis.com/v0/b/floridaimport-8efd9.appspot.com/o/Productos%2F1600462504510.jpg?alt=media&token=cdcc47c5-20ae-44d5-a0a8-4cd2abe6c695";

            GuardarProductoResponse productoReturn = _productoService.Guardar(producto);

            Assert.AreEqual(false, productoReturn.Error);
        }

        [Test]
        public void ModificarTest()
        {
            Producto producto = new Producto();

            producto.Nombre = "Mango";
            producto.Descripcion = "Mango de los campos colombianos";
            producto.Cantidad = 22;
            producto.Precio = 3000;
            producto.Proveedor = "frugol";
            producto.Tipo = "Fruta";
            producto.Imagen = "https://firebasestorage.googleapis.com/v0/b/floridaimport-8efd9.appspot.com/o/Productos%2F1600462504510.jpg?alt=media&token=cdcc47c5-20ae-44d5-a0a8-4cd2abe6c695";


            string mensaje = _productoService.Modificar(producto);

            Assert.AreEqual($"El registro {producto.Nombre} se ha modificado satisfactoriamente.", mensaje);
        }

        [Test]
        public void EliminarTest()
        {
            int codigo = 13;
            Producto producto = _productoService.BuscarxCodigo(codigo);
            string mensaje = _productoService.Eliminar(codigo);
            Assert.AreEqual($"El registro {producto.Nombre} se ha eliminado satisfactoriamente.", mensaje);
        }

        [Test]
        public void ConsultarTest()
        {
            List<Producto> productosReturn, productos;

            productosReturn = _productoService.ConsultarTodos();
            productos = productosReturn;

            Assert.AreEqual(productos, productosReturn);
        }
    }

}
