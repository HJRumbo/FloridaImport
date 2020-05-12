using Datos;
using Entity;
using System;
using System.Collections.Generic;

namespace Logica
{
    public class PaisService
    {
        private readonly ConnectionManager _conexion;
        private readonly PaisRepository _repositorio;

        public PaisService(string connectionString)
        {
            _conexion = new ConnectionManager(connectionString);
            _repositorio = new PaisRepository(_conexion);
        }

        public GuardarPaisResponse Guardar(Pais pais)
        {
            try
            {
                var paisBuscado = BuscarxNombre(pais.Nombre);
                if (paisBuscado != null)
                {
                    return new GuardarPaisResponse($"Error, el pais {pais.Nombre} ya se encuentra registrado");
                }
                _conexion.Open();
                _repositorio.Guardar(pais);
                _conexion.Close();
                return new GuardarPaisResponse(pais);
            }
            catch (Exception e)
            {
                return new GuardarPaisResponse($"Error de la Aplicacion: {e.Message}");
            }
            finally { _conexion.Close(); }
        }

        public Pais BuscarxNombre(string nombre)
        {
            _conexion.Open();
            Pais pais = _repositorio.BuscarxNombre(nombre);
            _conexion.Close();
            return pais;
        }

        public List<Pais> ConsultarTodos()
        {
            _conexion.Open();
            List<Pais> pais = _repositorio.ConsultarTodos();
            _conexion.Close();
            return pais;
        }
    }

    public class GuardarPaisResponse 
    {
        public GuardarPaisResponse(Pais pais)
        {
            Error = false;
            Pais = pais;
        }
        public GuardarPaisResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Pais Pais { get; set; }
    }
}