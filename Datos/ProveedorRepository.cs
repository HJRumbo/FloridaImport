using Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Datos
{
    public class ProveedorRepository
    {
        private readonly SqlConnection _connection;
        private readonly List<Proveedor> _proveedores = new List<Proveedor>();
        private readonly ProductoProveedorRepository productos;
        public ProveedorRepository(ConnectionManager connection)
        {
            _connection = connection._conexion;
            productos = new ProductoProveedorRepository(connection);
        }
        public void Guardar(Proveedor proveedor)
        {
            var Estado = "Activo";
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Insert Into Proveedor (Identificacion,Nombre,
                Correo,Contrasena,Descripcion, Estado) 
                values (@Identificacion,@Nombre,@Correo, @Contrasena,@Descripcion, @Estado)";
                command.Parameters.AddWithValue("@Identificacion", proveedor.Identificacion);
                command.Parameters.AddWithValue("@Nombre", proveedor.Nombre);
                command.Parameters.AddWithValue("@Correo", proveedor.Correo);
                command.Parameters.AddWithValue("@Contrasena", proveedor.Contrasena);
                command.Parameters.AddWithValue("@Descripcion", proveedor.Descripcion);
                command.Parameters.AddWithValue("@Estado", Estado);
                var filas = command.ExecuteNonQuery();
                //GuardarProductos(proveedor.Productos);
            }
        }
        
        /*public void GuardarProductos(List<Producto> productos)
        {
            foreach (var item in productos)
            {
                
                using (var command = _connection.CreateCommand())
                {
                    command.CommandText = @"Insert Into ProductoProv (Codigo,Nombre,
                    Descripcion, Cantidad, Precio,Proveedor, Tipo) 
                    values (NEXT VALUE FOR CodigoSequence,@Nombre,@Descripcion,
                    @Cantidad,@Precio, @Proveedor, @Tipo)";
                    command.Parameters.AddWithValue("@Nombre", item.Nombre);
                    command.Parameters.AddWithValue("@Descripcion", item.Descripcion);
                    command.Parameters.AddWithValue("@Cantidad", item.Cantidad);
                    command.Parameters.AddWithValue("@Precio", item.Precio);
                    command.Parameters.AddWithValue("@Proveedor", item.Proveedor);
                    command.Parameters.AddWithValue("@Tipo", item.Tipo);
                    var filas = command.ExecuteNonQuery();
                }
            }
        }*/

        public List<Proveedor> ConsultarTodos()
        {
            SqlDataReader dataReader;
            List<Proveedor> proveedores = new List<Proveedor>();
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Select * from Proveedor where estado='Activo' ";
                dataReader = command.ExecuteReader();
                if (dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        Proveedor proveedor = DataReaderMapToProv(dataReader);
                        proveedores.Add(proveedor);
                    }
                }
            }
            return proveedores;
        }
        
        private Proveedor DataReaderMapToProv(SqlDataReader dataReader)
        {
            if(!dataReader.HasRows) return null;
            Proveedor proveedor = new Proveedor();
            proveedor.Identificacion = (string)dataReader["Identificacion"];
            proveedor.Nombre = (string)dataReader["Nombre"];
            proveedor.Correo = (string)dataReader["Correo"];
            proveedor.Contrasena = (string)dataReader["Contrasena"];
            proveedor.Descripcion = (string)dataReader["Descripcion"];
            //proveedor.Productos = ConsultarProductos(proveedor.Identificacion);
            return proveedor;
        }

        public List<Producto> ConsultarProductos(string IdProveedor)
        {
            SqlDataReader dataReader;
            List<Producto> productos = new List<Producto>();
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Select * from productoProv where proveedor=@IdProveedor";
                command.Parameters.AddWithValue("@IdProveedor", IdProveedor);
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
            return producto;
        }

        public Proveedor BuscarxIdentificacion(string identificacion)
        {
            SqlDataReader dataReader;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "select * from proveedor where identificacion=@identificacion";
                command.Parameters.AddWithValue("@identificacion", identificacion);
                dataReader = command.ExecuteReader();
                dataReader.Read();
                return DataReaderMapToProv(dataReader);
            }
        }

        public Proveedor BuscarxCorreo(string correo)
        {
            SqlDataReader dataReader;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "select * from proveedor where correo=@correo";
                command.Parameters.AddWithValue("@correo", correo);
                dataReader = command.ExecuteReader();
                dataReader.Read();
                return DataReaderMapToProv(dataReader);
            }
        }

        public void Modificar( Proveedor proveedor)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"update proveedor set Nombre=@Nombre, 
                Correo=@Correo, Contrasena=@Contrasena where Identificacion=@Identificacion";              
                command.Parameters.AddWithValue("@Identificacion", proveedor.Identificacion);
                command.Parameters.AddWithValue("@Nombre", proveedor.Nombre);
                command.Parameters.AddWithValue("@Correo", proveedor.Correo);
                command.Parameters.AddWithValue("@Contrasena", proveedor.Contrasena);
                
                command.ExecuteNonQuery();
            }
        }

        public void Eliminar(Proveedor proveedor)
        {
            var estado = "Eliminado";
            using (var command = _connection.CreateCommand())
            {
                productos.EliminarProductos(proveedor.Identificacion);
                command.CommandText = "Update proveedor set Estado=@Estado where Identificacion=@Identificacion";
                command.Parameters.AddWithValue("@Estado", estado);
                command.Parameters.AddWithValue("@Identificacion", proveedor.Identificacion);
                command.ExecuteNonQuery();
            }
        }
    }
}