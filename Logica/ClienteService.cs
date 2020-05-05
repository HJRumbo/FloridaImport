using Datos;
using Entity;
using System;
using System.Collections.Generic;

namespace Logica
{
    public class ClienteService
    {
        private readonly ConnectionManager _conexion;
        private readonly ClienteRepository _repositorio;

        public ClienteService(string connectionString)
        {
            _conexion = new ConnectionManager(connectionString);
            _repositorio = new ClienteRepository(_conexion);
        }

        public GuardarClienteResponse Guardar(Cliente cliente)
        {
            try
            {
                var clienteBuscado = BuscarxIdentificacion(cliente.Identificacion);
                if (clienteBuscado != null)
                {
                    return new GuardarClienteResponse($"Error, el cliente con la identificacion {cliente.Identificacion} ya se encuentra registrado");
                }
                var clienteBuscadoCorreo = BuscarxCorreo(cliente.Correo);
                if (clienteBuscadoCorreo != null)
                {
                    return new GuardarClienteResponse($"Error, el correo {cliente.Correo} ya se encuentra registrado");
                }
                _conexion.Open();
                _repositorio.Guardar(cliente);
                _conexion.Close();
                return new GuardarClienteResponse(cliente);
            }
            catch (Exception e)
            {
                return new GuardarClienteResponse($"Error de la Aplicacion: {e.Message}");
            }
            finally { _conexion.Close(); }
        }

        public List<Cliente> ConsultarTodos()
        {
            _conexion.Open();
            List<Cliente> clientes = _repositorio.ConsultarTodos();
            _conexion.Close();
            return clientes;
        }

        public Cliente BuscarxIdentificacion(string identificacion)
        {
            _conexion.Open();
            Cliente cliente = _repositorio.BuscarxIdentificacion(identificacion);
            _conexion.Close();
            return cliente;
        }

        public Cliente BuscarxCorreo(string correo)
        {
            _conexion.Open();
            Cliente cliente = _repositorio.BuscarxCorreo(correo);
            _conexion.Close();
            return cliente;
        }

        public string Eliminar(string identificacion)
        {
            try
            {
                _conexion.Open();
                var cliente = _repositorio.BuscarxIdentificacion(identificacion);
                if (cliente != null)
                {
                    _repositorio.Eliminar(cliente);
                    _conexion.Close();
                    return ($"El registro {cliente.Nombre} se ha eliminado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, {identificacion} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {

                return $"Error de la Aplicación: {e.Message}";
            }
            finally { _conexion.Close(); }

        }
        public string Modificar(Cliente clienteNuevo)
        {
            try
            {
                _conexion.Open();
                var clienteViejo = _repositorio.BuscarxIdentificacion(clienteNuevo.Identificacion);
                if (clienteViejo != null)
                {
                    _repositorio.Modificar(clienteNuevo);
                    _conexion.Close();
                    return ($"El registro {clienteNuevo.Nombre} se ha modificado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, {clienteNuevo.Identificacion} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {

                return $"Error de la Aplicación: {e.Message}";
            }
            finally { _conexion.Close(); }

        }

    }

    public class GuardarClienteResponse 
    {
        public GuardarClienteResponse(Cliente cliente)
        {
            Error = false;
            Cliente = cliente;
        }
        public GuardarClienteResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Cliente Cliente { get; set; }
    }
}
