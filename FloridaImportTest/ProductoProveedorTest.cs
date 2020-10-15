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
    class ProductoProveedorTest
    {
        public IConfiguration Configuration { get; }
        string connectionString = "Server=localHost\\SQLEXPRESS;Database=FloridaImport;Trusted_Connection = True; MultipleActiveResultSets = true";
        ProductoProveedorService _productoProveedorService;

        public ProductoProveedorTest()
        {
            _productoProveedorService = new ProductoProveedorService(connectionString);
        }

        [Test]
        public void GuardarTest()
        {
            ProductoProveedor productoProveedor = new ProductoProveedor();

            productoProveedor.Nombre = "Mango";
            productoProveedor.Descripcion = "";
            productoProveedor.Precio = -3000;
            productoProveedor.IdProveedor = "12422123";
            productoProveedor.Tipo = "Fruta";
            
            GuardarProductoProveedorResponse productoReturn = _productoProveedorService.Guardar(productoProveedor);

            Assert.AreEqual(false, productoReturn.Error);
        }

        [Test]
        public void ModificarTest()
        {
            ProductoProveedor productoProveedor = new ProductoProveedor();

            productoProveedor.Nombre = "Mango";
            productoProveedor.Descripcion = "Mango colombiano";
            productoProveedor.Precio = 3000;
            productoProveedor.IdProveedor = "12422123";
            productoProveedor.Tipo = "Fruta";

            string mensaje = _productoProveedorService.Modificar(productoProveedor);

            Assert.AreEqual($"El registro {productoProveedor.Nombre} se ha modificado satisfactoriamente.", mensaje);
        }

        [Test]
        public void EliminarTest()
        {
            int codigo = 6;
            ProductoProveedor productoProveedor = _productoProveedorService.BuscarxCodigo(codigo);
            string mensaje = _productoProveedorService.Eliminar(codigo);
            Assert.AreEqual($"El registro {productoProveedor.Nombre} se ha eliminado satisfactoriamente.", mensaje);
        }

        [Test]
        public void ConsultarTest()
        {
            List<ProductoProveedor> productosProveedorReturn, productosProveedor;

            string idProveedor = "12422123";

            productosProveedorReturn = _productoProveedorService.ConsultarXProv(idProveedor);
            productosProveedor = productosProveedorReturn;

            Assert.AreEqual(productosProveedor, productosProveedorReturn);
        }
    }
}
