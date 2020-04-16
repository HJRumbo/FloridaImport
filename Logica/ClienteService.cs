﻿using Datos;
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
