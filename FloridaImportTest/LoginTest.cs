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
    class LoginTest
    {
        string connectionString = "Server=localHost\\SQLEXPRESS;Database=FloridaImport;Trusted_Connection = True; MultipleActiveResultSets = true";
        ClienteService _clienteService;

        public LoginTest()
        {
            _clienteService = new ClienteService(connectionString);
        }

        //[Test]
        //public void Ingresar()
        //{

        //    string Correo = "hernandojosern@gmail.com";
        //    string Contrasena = "1234567h";
        //    GuardarClienteResponse clienteReturn = _clienteService.Validate(Correo, Contrasena);

        //    Assert.AreEqual(false, clienteReturn.Error);
        //}
    }
}
