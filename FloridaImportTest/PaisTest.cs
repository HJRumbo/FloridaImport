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
    class PaisTest
    {
        public IConfiguration Configuration { get; }
        string connectionString = "Server=localHost\\SQLEXPRESS;Database=FloridaImport;Trusted_Connection = True; MultipleActiveResultSets = true";
        PaisService _paisService;

        public PaisTest()
        {
            _paisService = new PaisService(connectionString);

        }

        [Test]
        public void GuardarTest()
        {
            Pais pais = new Pais();
            Ciudad ciudad = new Ciudad();
            List<Ciudad> ciudades = new List<Ciudad>();

            pais.Nombre = "Portugal";
            ciudad.Nombre = "Lisboa";
            ciudades.Add(ciudad);
            pais.Ciudades = ciudades;

            GuardarPaisResponse paisReturn = _paisService.Guardar(pais);

            Assert.AreEqual(false, paisReturn.Error);
        }

        [Test]
        public void ModificarTest()
        {
            Pais pais = new Pais();
            Ciudad ciudad = new Ciudad();
            List<Ciudad> ciudades = new List<Ciudad>();

            ciudad.Nombre = "lisboa";
            ciudades.Add(ciudad);
            pais.Ciudades = ciudades;

            string mensaje = _paisService.Modificar(pais);

            Assert.AreEqual($"El registro {pais.Nombre} se ha modificado satisfactoriamente.", mensaje);
        }

        [Test]
        public void EliminarTest()
        {
            string nombre = "Portugal";
            Pais pais = _paisService.BuscarxNombre(nombre);
            string mensaje = _paisService.Eliminar(nombre);
            Assert.AreEqual($"El registro {pais.Nombre} se ha eliminado satisfactoriamente.", mensaje);
        }

        [Test]
        public void ConsultarTest()
        {
            List<Pais> paisReturn, paises;
            paisReturn = new List<Pais>();
            paisReturn = _paisService.ConsultarTodos();
            paises = paisReturn;

            Assert.AreEqual(paises, paisReturn);
        }
    }
}
