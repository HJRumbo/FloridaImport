using Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Datos
{
    public class ProductoRepository
    {
        private readonly SqlConnection _connection;
        private readonly List<Producto> _productos = new List<Producto>();
        public ProductoRepository(ConnectionManager connection)
        {
            _connection = connection._conexion;
        }
        public void Guardar(Producto producto)
        {
            var Estado = "Disponible";

            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Insert Into Producto (Codigo,Nombre,
                Descripcion, Cantidad, Precio,Proveedor, Tipo, Imagenes, Estado) 
                values (NEXT VALUE FOR CodigoSequence,@Nombre,@Descripcion,
                @Cantidad,@Precio, @Proveedor, @Tipo, @Imagenes, @Estado)";
                command.Parameters.AddWithValue("@Nombre", producto.Nombre);
                command.Parameters.AddWithValue("@Descripcion", producto.Descripcion);
                command.Parameters.AddWithValue("@Cantidad", producto.Cantidad);
                command.Parameters.AddWithValue("@Precio", producto.Precio);
                command.Parameters.AddWithValue("@Proveedor", producto.Proveedor);
                command.Parameters.AddWithValue("@Tipo", producto.Tipo);
                command.Parameters.AddWithValue("@Imagenes", producto.Imagen);
                command.Parameters.AddWithValue("@Estado", Estado);
                var filas = command.ExecuteNonQuery();
            }
        }
        
        public List<Producto> ConsultarTodos()
        {
            SqlDataReader dataReader;
            List<Producto> productos = new List<Producto>();
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Select * from producto";
                dataReader = command.ExecuteReader();
                if (dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        Producto producto = DataReaderMapToProduct(dataReader);
                        productos.Add(producto);
                    }
                }
            }
            return productos;
        }
        
        private Producto DataReaderMapToProduct(SqlDataReader dataReader)
        {
            if(!dataReader.HasRows) return null;
            Producto producto = new Producto();
            producto.Codigo = Convert.ToDecimal(dataReader["Codigo"]);
            producto.Nombre = (string)dataReader["Nombre"];
            producto.Descripcion = (string)dataReader["Descripcion"];
            producto.Cantidad = (int)dataReader["Cantidad"];
            producto.Precio = (decimal)dataReader["Precio"];
            producto.Proveedor = (string)dataReader["Proveedor"];
            producto.Tipo = (string)dataReader["Tipo"];
            producto.Imagen = (string)dataReader["Imagenes"];
            producto.Estado = (string)dataReader["Estado"];
            return producto;
        }

        public Producto BuscarxCodigo(decimal codigo)
        {
            SqlDataReader dataReader;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "select * from producto where codigo=@codigo";
                command.Parameters.AddWithValue("@codigo", codigo.ToString());
                dataReader = command.ExecuteReader();
                dataReader.Read();
                return DataReaderMapToProduct(dataReader);
            }
        }

        public void Modificar( Producto producto)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "update producto set nombre=@Nombre, Descripcion=@Descripcion, Cantidad=@Cantidad, Precio=@Precio, Proveedor=@Proveedor where codigo=@codigo";
                command.Parameters.AddWithValue("@Codigo", producto.Codigo.ToString());
                command.Parameters.AddWithValue("@Nombre", producto.Nombre);
                command.Parameters.AddWithValue("@Descripcion", producto.Descripcion);
                command.Parameters.AddWithValue("@Cantidad", producto.Cantidad);
                command.Parameters.AddWithValue("@Precio", producto.Precio);
                command.Parameters.AddWithValue("@Proveedor", producto.Proveedor);
                command.ExecuteNonQuery();
            }
        }

        public void Reactivar(decimal codigo)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "update producto set Estado=@Estado where codigo=@codigo";
                command.Parameters.AddWithValue("@codigo", codigo.ToString());
                command.Parameters.AddWithValue("@Estado", "Disponible");
                command.ExecuteNonQuery();
            }
        }

        public void Eliminar(Producto producto)
        {
            var estado = "Eliminado";
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Update producto set Estado=@Estado where codigo=@codigo";
                command.Parameters.AddWithValue("@Estado", estado);
                command.Parameters.AddWithValue("@codigo", producto.Codigo.ToString());
                command.ExecuteNonQuery();
            }
        }
    }
}