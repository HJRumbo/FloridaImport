using Datos;
using Entity;
using System;
using System.Collections.Generic;

namespace Logica
{
    public class UsuarioService
    {
        private readonly ConnectionManager _conexion;
        private readonly UsuarioRespository _repositorio;

        public UsuarioService(string connectionString)
        {
            _conexion = new ConnectionManager(connectionString);
            _repositorio = new UsuarioRespository(_conexion);
        }

        public GuardarUsuarioResponse Guardar(Usuario usuario)
        {
            try
            {
            
                _conexion.Open();
                _repositorio.Guardar(usuario);
                _conexion.Close();
                return new GuardarUsuarioResponse(usuario);
            }
            catch (Exception e)
            {
                return new GuardarUsuarioResponse($"Error de la Aplicacion: {e.Message}");
            }
            finally { _conexion.Close(); }
        }

        public Usuario BuscarxCorreo(string correo, string rol)
        {
            _conexion.Open();
            Usuario usuario = _repositorio.BuscarxCorreo(correo, rol);
            _conexion.Close();
            return usuario;
        }

    }

    public class GuardarUsuarioResponse 
    {
        public GuardarUsuarioResponse(Usuario usuario)
        {
            Error = false;
            Usuario = usuario;
        }
        public GuardarUsuarioResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Usuario Usuario { get; set; }
    }
}