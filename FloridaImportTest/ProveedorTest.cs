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
    class ProveedorTest
    {
        public IConfiguration Configuration { get; }
        string connectionString = "Server=localHost\\SQLEXPRESS;Database=FloridaImport;Trusted_Connection = True; MultipleActiveResultSets = true";
        ProveedorService _proveedorService;

        public ProveedorTest()
        {
            _proveedorService = new ProveedorService(connectionString);
        }

        [Test]
        public void GuardarTest()
        {
            Proveedor proveedor = new Proveedor();

            proveedor.Identificacion = "12422123";
            proveedor.Nombre = "FrutasLTDA";
            proveedor.Descripcion = "Fruteria";
            proveedor.Correo = "frutas@gmail.com";
            proveedor.Contrasena = "1234567f";

            GuardarProveedorResponse proveedorReturn = _proveedorService.Guardar(proveedor);

            Assert.AreEqual(false, proveedorReturn.Error);
        }

        [Test]
        public void ModificarTest()
        {
            Proveedor proveedor = new Proveedor();

            proveedor.Identificacion = "12422123";
            proveedor.Nombre = "FrutasLTDA";
            proveedor.Descripcion = "Fruteria colombiana";
            proveedor.Correo = "";
            proveedor.Contrasena = "1234567f";

            string mensaje = _proveedorService.Modificar(proveedor);

            Assert.AreEqual($"El registro {proveedor.Nombre} se ha modificado satisfactoriamente.", mensaje);
        }

        [Test]
        public void EliminarTest()
        {
            string correo = "frutas@gmail.com";
            Proveedor proveedor = _proveedorService.BuscarxCorreo(correo);
            string mensaje = _proveedorService.Eliminar(correo);
            Assert.AreEqual($"El registro {proveedor.Nombre} se ha eliminado satisfactoriamente.", mensaje);
        }

        [Test]
        public void ConsultarTest()
        {
            List<Proveedor> proveedoresReturn, proveedores;

            proveedoresReturn = _proveedorService.ConsultarTodos();
            proveedores = proveedoresReturn;

            Assert.AreEqual(proveedores, proveedoresReturn);
        }

    }
}
