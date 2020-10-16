using Datos;
using Entity;
using System;
using System.Collections.Generic;

namespace Logica
{
    public class CiudadService
    {
        private readonly ConnectionManager _conexion;
        private readonly CiudadRepository _repositorio;
        private readonly PaisService _paisService;

        public CiudadService(string connectionString)
        {
            _conexion = new ConnectionManager(connectionString);
            _repositorio = new CiudadRepository(_conexion);
            _paisService = new PaisService(connectionString);
        }

        public GuardarCiudadResponse GuardarCiudad(Ciudad ciudad, string nombrePais)
        {
            try
            {
                var paisBuscado = _paisService.BuscarxNombre(nombrePais);
                if (paisBuscado == null)
                {
                    return new GuardarCiudadResponse($"Error, el pais {nombrePais} no se encuentra registrado");
                }
                _conexion.Open();
                _repositorio.GuardarUnaCiudad(ciudad, paisBuscado.Codigo);
                _conexion.Close();
                return new GuardarCiudadResponse(ciudad);
            }
            catch (Exception e)
            {
                return new GuardarCiudadResponse($"Error de la Aplicacion: {e.Message}");
            }
            finally { _conexion.Close(); }
        }

        public string Modificar(Ciudad ciudadNueva, decimal codigo)
        {
            try
            {
                _conexion.Open();
                var ciudadVieja = _repositorio.BuscarxCodigo(codigo);
                if (ciudadVieja != null)
                {
                    _repositorio.Modificar(ciudadNueva);
                    _conexion.Close();
                    return ($"El registro {ciudadNueva.Nombre} se ha modificado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, {ciudadNueva.Nombre} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {

                return $"Error de la Aplicación: {e.Message}";
            }
            finally { _conexion.Close(); }

        }

        public Ciudad BuscarxCodigo(decimal codigo)
        {
            _conexion.Open();
            Ciudad ciudad = _repositorio.BuscarxCodigo(codigo);
            _conexion.Close();
            return ciudad;
        }

        public string Eliminar(decimal codigo)
        {
            try
            {
                _conexion.Open();
                var ciudad = _repositorio.BuscarxCodigo(codigo);
                if (ciudad != null)
                {
                    _repositorio.Eliminar(ciudad);
                    _conexion.Close();
                    return ($"El registro {ciudad.Nombre} se ha eliminado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, la ciudad no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {

                return $"Error de la Aplicación: {e.Message}";
            }
            finally { _conexion.Close(); }

        }

    }

    public class GuardarCiudadResponse 
    {
        public GuardarCiudadResponse(Ciudad ciudad)
        {
            Error = false;
            Ciudad = ciudad;
        }
        public GuardarCiudadResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Ciudad Ciudad { get; set; }
    }
}