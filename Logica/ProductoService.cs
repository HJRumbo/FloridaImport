using Datos;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Logica
{
    public class ProductoService
    {
        private readonly ConnectionManager _conexion;
        private readonly ProductoRepository _repositorio;

        List<Producto> productos;
        public ProductoService(string connectionString)
        {
            _conexion = new ConnectionManager(connectionString);
            _repositorio = new ProductoRepository(_conexion);
        }

        public GuardarProductoResponse Guardar(Producto producto)
        {
            try
            {
                if (producto.Precio<=0) {
                    return new GuardarProductoResponse($"El precio debe ser mayor que cero");
                }
                if (producto.Cantidad<=0) {
                    return new GuardarProductoResponse($"La cantidad debe ser mayor que cero");
                }
                _conexion.Open();
                _repositorio.Guardar(producto);
                _conexion.Close();
                return new GuardarProductoResponse(producto);
            }
            catch (Exception e)
            {
                return new GuardarProductoResponse($"Error de la Aplicacion: {e.Message}");
            }
            finally { _conexion.Close(); }
        }

        public List<Producto> ConsultarTodos()
        {
            _conexion.Open();
            productos = _repositorio.ConsultarTodos();
            _conexion.Close();
            return productos;
        }

        public List<Producto> ConsultarNoDisponible()
        {
            productos = ConsultarTodos();
            return productos.Where(i => i.Estado.Equals("Eliminado")).ToList();
        }

        public List<Producto> ConsultarDisponible()
        {
            productos = ConsultarTodos();
            return productos.Where(i => i.Estado.Equals("Disponible")).ToList();
        }

        public Producto BuscarxCodigo(decimal codigo)
        {
            _conexion.Open();
            Producto producto = _repositorio.BuscarxCodigo(codigo);
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
        public string Modificar(Producto productoNuevo)
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

        public string Reactivar(decimal codigo){
            try
            {
                _conexion.Open();
                var productoViejo = _repositorio.BuscarxCodigo(codigo);
                if (productoViejo != null)
                {
                    if(productoViejo.Estado=="Disponible"){
                        return ($"El producto {productoViejo.Nombre} está disponible.");
                    }else{
                        _repositorio.Reactivar(codigo);
                        _conexion.Close();
                        return ($"El registro {productoViejo.Nombre} se ha reactivado satisfactoriamente.");
                    }
                }
                else
                {
                    return ($"Lo sentimos, el producto con el codigo {codigo} no se encuentra registrado.");
                }
            }
            catch (Exception e)
            {

                return $"Error de la Aplicación: {e.Message}";
            }
            finally { _conexion.Close(); }
        }

        public int CountProductos(){
            productos = ConsultarTodos();
            return productos.Count;
        }

    }

    public class GuardarProductoResponse 
    {
        public GuardarProductoResponse(Producto producto)
        {
            Error = false;
            Producto = producto;
        }
        public GuardarProductoResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Producto Producto { get; set; }
    }
}
