using Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Datos
{
    public class ProductoProveedorRepository
    {
        private readonly SqlConnection _connection;
        private readonly List<ProductoProveedor> _productos = new List<ProductoProveedor>();
        public ProductoProveedorRepository(ConnectionManager connection)
        {
            _connection = connection._conexion;
        }
        public void Guardar(ProductoProveedor producto)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Insert Into ProductoProve (Codigo,Nombre,
                Descripcion, Precio, IdProveedor, Tipo) 
                values (NEXT VALUE FOR CodProdProveSequence,@Nombre,@Descripcion,
                @Precio, @IdProveedor, @Tipo)";
                command.Parameters.AddWithValue("@Nombre", producto.Nombre);
                command.Parameters.AddWithValue("@Descripcion", producto.Descripcion);
                command.Parameters.AddWithValue("@Precio", producto.Precio);
                command.Parameters.AddWithValue("@IdProveedor", producto.IdProveedor);
                command.Parameters.AddWithValue("@Tipo", producto.Tipo);
                var filas = command.ExecuteNonQuery();
            }
        }
       
        public List<ProductoProveedor> ConsultarTodos()
        {
            SqlDataReader dataReader;
            List<ProductoProveedor> productos = new List<ProductoProveedor>();
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Select * from productoProve";
                dataReader = command.ExecuteReader();
                if (dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        ProductoProveedor producto = DataReaderMapToProduct(dataReader);
                        productos.Add(producto);
                    }
                }
            }
            return productos;
        }

        public List<ProductoProveedor> ConsultarXProv(string idProveedor)
        {
            SqlDataReader dataReader;
            List<ProductoProveedor> productos = new List<ProductoProveedor>();
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Select * from productoProve where IdProveedor=@IdProveedor";
                command.Parameters.AddWithValue("@IdProveedor", idProveedor);
                dataReader = command.ExecuteReader();
                if (dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        ProductoProveedor producto = DataReaderMapToProduct(dataReader);
                        productos.Add(producto);
                    }
                }
            }
            return productos;
        }
       
        private ProductoProveedor DataReaderMapToProduct(SqlDataReader dataReader)
        {
            if(!dataReader.HasRows) return null;
            ProductoProveedor producto = new ProductoProveedor();
            producto.Codigo = Convert.ToDecimal(dataReader["Codigo"]);
            producto.Nombre = (string)dataReader["Nombre"];
            producto.Descripcion = (string)dataReader["Descripcion"];
            producto.Precio = (decimal)dataReader["Precio"];
            producto.IdProveedor = (string)dataReader["IdProveedor"];
            producto.Tipo = (string)dataReader["Tipo"];
            return producto;
        }

        public ProductoProveedor BuscarxCodigo(decimal codigo)
        {
            SqlDataReader dataReader;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "select * from productoProve where codigo=@codigo";
                command.Parameters.AddWithValue("@codigo", codigo.ToString());
                dataReader = command.ExecuteReader();
                dataReader.Read();
                return DataReaderMapToProduct(dataReader);
            }
        }

        public void Modificar( ProductoProveedor producto)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "update productoProve set nombre=@Nombre, Descripcion=@Descripcion, Precio=@Precio, IdProveedor=@IdProveedor where codigo=@codigo";
                command.Parameters.AddWithValue("@Codigo", producto.Codigo);
                command.Parameters.AddWithValue("@Nombre", producto.Nombre);
                command.Parameters.AddWithValue("@Descripcion", producto.Descripcion);
                command.Parameters.AddWithValue("@Precio", producto.Precio);
                command.Parameters.AddWithValue("@IdProveedor", producto.IdProveedor);
                command.ExecuteNonQuery();
            }
        }

        public void Eliminar(ProductoProveedor producto)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Delete from productoProve where codigo=@codigo";
                command.Parameters.AddWithValue("@codigo", producto.Codigo);
                command.ExecuteNonQuery();
            }
        }

        public void EliminarProductos(string identificacion)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Delete from productoProve where IdProveedor=@IdProveedor";
                command.Parameters.AddWithValue("@IdProveedor", identificacion);
                command.ExecuteNonQuery();
            }
        }
    }
}