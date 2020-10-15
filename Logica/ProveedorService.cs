using Datos;
using Entity;
using System;
using System.Collections.Generic;

namespace Logica
{
    public class ProveedorService
    {
    private readonly ConnectionManager _conexion;
        private readonly ProveedorRepository _repositorio;

        public ProveedorService(string connectionString)
        {
            _conexion = new ConnectionManager(connectionString);
            _repositorio = new ProveedorRepository(_conexion);
        }

        public GuardarProveedorResponse Guardar(Proveedor proveedor)
        {
            try
            {
                var proveedorBuscado = BuscarxIdentificacion(proveedor.Identificacion);
                if (proveedorBuscado != null)
                {
                    return new GuardarProveedorResponse($"Error, el proveedor con la identificacion {proveedor.Identificacion} ya se encuentra registrado");
                }
                var proveedorBuscadoCorreo = BuscarxCorreo(proveedor.Correo);
                if (proveedorBuscadoCorreo != null)
                {
                    return new GuardarProveedorResponse($"Error, el correo {proveedor.Correo} ya se encuentra registrado");
                }
                _conexion.Open();
                _repositorio.Guardar(proveedor);
                _conexion.Close();
                return new GuardarProveedorResponse(proveedor);
            }
            catch (Exception e)
            {
                return new GuardarProveedorResponse($"Error de la Aplicacion: {e.Message}");
            }
            finally { _conexion.Close(); }
        }

        public List<Proveedor> ConsultarTodos()
        {
            _conexion.Open();
            List<Proveedor> proveedores = _repositorio.ConsultarTodos();
            _conexion.Close();
            return proveedores;
        }

        public Proveedor BuscarxIdentificacion(string identificacion)
        {
            _conexion.Open();
            Proveedor proveedor = _repositorio.BuscarxIdentificacion(identificacion);
            _conexion.Close();
            return proveedor;
        }

        public Proveedor BuscarxCorreo(string correo)
        {
            _conexion.Open();
            Proveedor proveedor = _repositorio.BuscarxCorreo(correo);
            _conexion.Close();
            return proveedor;
        }

        public string Eliminar(string correo)
        {
            try
            {
                _conexion.Open();
                var proveedor = _repositorio.BuscarxCorreo(correo);
                if (proveedor != null)
                {
                    _repositorio.Eliminar(proveedor);
                    _conexion.Close();
                    return ($"El registro {proveedor.Nombre} se ha eliminado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, {correo} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {

                return $"Error de la Aplicación: {e.Message}";
            }
            finally { _conexion.Close(); }

        }
        public string Modificar(Proveedor proveedorNuevo)
        {
            try
            {
                _conexion.Open();
                var proveedorViejo = _repositorio.BuscarxCorreo(proveedorNuevo.Correo);
                if (proveedorViejo != null)
                {
                    _repositorio.Modificar(proveedorNuevo);
                    _conexion.Close();
                    return ($"El registro {proveedorNuevo.Nombre} se ha modificado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, {proveedorNuevo.Correo} no se encuentra registrado.");
                }
            }
            catch (Exception e)
            {

                return $"Error de la Aplicación: {e.Message}";
            }
            finally { _conexion.Close(); }

        }

    }

    public class GuardarProveedorResponse 
    {
        public GuardarProveedorResponse(Proveedor proveedor)
        {
            Error = false;
            Proveedor = proveedor;
        }
        public GuardarProveedorResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Proveedor Proveedor { get; set; }
    }
}