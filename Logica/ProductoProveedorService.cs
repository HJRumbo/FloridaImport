using Datos;
using Entity;
using System;
using System.Collections.Generic;

namespace Logica
{
    public class ProductoProveedorService
    {
        private readonly ConnectionManager _conexion;
        private readonly ProductoProveedorRepository _repositorio;

        public ProductoProveedorService(string connectionString)
        {
            _conexion = new ConnectionManager(connectionString);
            _repositorio = new ProductoProveedorRepository(_conexion);
        }

        public GuardarProductoProveedorResponse Guardar(ProductoProveedor producto)
        {
            try
            {
                _conexion.Open();
                _repositorio.Guardar(producto);
                _conexion.Close();
                return new GuardarProductoProveedorResponse(producto);
            }
            catch (Exception e)
            {
                return new GuardarProductoProveedorResponse($"Error de la Aplicacion: {e.Message}");
            }
            finally { _conexion.Close(); }
        }

        public List<ProductoProveedor> ConsultarTodos()
        {
            _conexion.Open();
            List<ProductoProveedor> productos = _repositorio.ConsultarTodos();
            _conexion.Close();
            return productos;
        }

        public List<ProductoProveedor> ConsultarXProv(string idProveedor)
        {
            _conexion.Open();
            List<ProductoProveedor> productos = _repositorio.ConsultarXProv(idProveedor);
            _conexion.Close();
            return productos;
        }

        public ProductoProveedor BuscarxCodigo(decimal codigo)
        {
            _conexion.Open();
            ProductoProveedor producto = _repositorio.BuscarxCodigo(codigo);
            _conexion.Close();
            return producto;
        }

        public string Eliminar(decimal codigo)
        {
            try
            {
                _conexion.Open();
                var producto = _repositorio.BuscarxCodigo(codigo);
                if (producto != null)
                {
                    _repositorio.Eliminar(producto);
                    _conexion.Close();
                    return ($"El registro {producto.Nombre} se ha eliminado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, {codigo} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {

                return $"Error de la Aplicación: {e.Message}";
            }
            finally { _conexion.Close(); }

        }
        public string Modificar(ProductoProveedor productoNuevo)
        {
            try
            {
                _conexion.Open();
                var productoViejo = _repositorio.BuscarxCodigo(productoNuevo.Codigo);
                if (productoViejo != null)
                {
                    _repositorio.Modificar(productoNuevo);
                    _conexion.Close();
                    return ($"El registro {productoNuevo.Nombre} se ha modificado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, {productoNuevo.Nombre} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {

                return $"Error de la Aplicación: {e.Message}";
            }
            finally { _conexion.Close(); }

        }

    }

    public class GuardarProductoProveedorResponse 
    {
        public GuardarProductoProveedorResponse(ProductoProveedor producto)
        {
            Error = false;
            Producto = producto;
        }
        public GuardarProductoProveedorResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public ProductoProveedor Producto { get; set; }
    }
}