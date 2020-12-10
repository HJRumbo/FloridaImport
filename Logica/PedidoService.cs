using Datos;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Logica
{
    public class PedidoService
    {
        private readonly ConnectionManager _conexion;
        private readonly PedidoRepository _repositorio;

        public PedidoService(string connectionString)
        {
            _conexion = new ConnectionManager(connectionString);
            _repositorio = new PedidoRepository(_conexion);
        }

        public GuardarPedidoResponse Guardar(Pedido pedido)
        {
            try
            {
                pedido.CalcularTotal();
                pedido.EstadoInicial();
                _conexion.Open();
                _repositorio.Guardar(pedido);
                _conexion.Close();
                return new GuardarPedidoResponse(pedido);
            }
            catch (Exception e)
            {
                return new GuardarPedidoResponse($"Error de la Aplicacion: {e.Message}");
            }
            finally { _conexion.Close(); }
        }

        public Pedido BuscarxCodigo(decimal codigo)
        {
            _conexion.Open();
            Pedido pedido = _repositorio.BuscarxCodigo(codigo);
            _conexion.Close();
            return pedido;
        }

        public List<Pedido> ConsultarTodos()
        {
            _conexion.Open();
            List<Pedido> pedidos = _repositorio.ConsultarTodos();
            _conexion.Close();
            return pedidos;
        }

        public string Modificar(Pedido pedidoNuevo)
        {
            try
            {
                _conexion.Open();
                var pedidoViejo = _repositorio.BuscarxCodigo(pedidoNuevo.CodigoPedido);
                if (pedidoViejo != null)
                {
                    _repositorio.Modificar(pedidoNuevo);
                    _conexion.Close();
                    return ($"El pedido se ha modificado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, el pedido no se encuentra registrado.");
                }
            }
            catch (Exception e)
            {

                return $"Error de la Aplicación: {e.Message}";
            }
            finally { _conexion.Close(); }

        }

        public decimal SumarTotal(){
            List<Pedido> pedidos = ConsultarTodos();
            decimal suma = pedidos.Sum(item => item.TotalPedido);
            return suma;
        }
    }

    public class GuardarPedidoResponse 
    {
        public GuardarPedidoResponse(Pedido pedido)
        {
            Error = false;
            Pedido = pedido;
        }
        public GuardarPedidoResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Pedido Pedido { get; set; }
    }
}