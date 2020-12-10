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
    class ClienteTest
    {
        string connectionString = "Server=localHost\\SQLEXPRESS;Database=FloridaImport;Trusted_Connection = True; MultipleActiveResultSets = true";
        ClienteService _clienteService;
        public void SetUp()
        {
        

        }

        public ClienteTest()
        {
            _clienteService = new ClienteService(connectionString);
        }

        [Test]
        public void GuardarTest()
        {
            Cliente cliente = new Cliente();

            cliente.Identificacion = "123456778";
            cliente.Nombre = "Hernando";
            cliente.Apellido = "Rumbo";
            cliente.Correo = "hernandorumbo@gmail.com";
            cliente.Contrasena = "1234567h";
            cliente.TipoPersona = "Natural";

            GuardarClienteResponse clienteReturn = _clienteService.Guardar(cliente);


            Assert.AreEqual(false, clienteReturn.Error);
        }

        [Test]
        public void ModificarTest()
        {
            Cliente cliente = new Cliente();

            cliente.Identificacion = "";
            cliente.Nombre = "Hernando";
            cliente.Apellido = "Rumbo Nuñez";
            cliente.Correo = "hjrumbo@gmail.com";
            cliente.Contrasena = "1234567hj";
            cliente.TipoPersona = "Natural";

            string mensaje = _clienteService.Modificar(cliente);

            Assert.AreEqual($"El registro {cliente.Nombre} se ha modificado satisfactoriamente.", mensaje);
        }

        [Test]
        public void EliminarTest()
        {
            string correo = "hernandorumbo@gmail.com";
            Cliente cliente = _clienteService.BuscarxCorreo(correo);
            string mensaje = _clienteService.Eliminar(correo);
            Assert.AreEqual($"El registro {cliente.Nombre} se ha eliminado satisfactoriamente.", mensaje);
        }

        [Test]
        public void ConsultarTest()
        {
            List<Cliente> clientesReturn;
            List<Cliente> clientes;
            clientesReturn = _clienteService.ConsultarTodos();
            clientes = clientesReturn;
            Assert.AreEqual(clientes, clientesReturn);
        }
    }
}
