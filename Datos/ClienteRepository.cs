using Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Datos
{
    public class ClienteRepository{

        private readonly SqlConnection _connection;
        private readonly List<Cliente> _clientes = new List<Cliente>();
        public ClienteRepository(ConnectionManager connection)
        {
            _connection = connection._conexion;
        }
        public void Guardar(Cliente cliente)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Insert Into Cliente (Identificacion,Nombre,
                Apellido, TipoPersona, Correo,Contrasena) 
                values (@Identificacion,@Nombre,@Apellido,@TipoPersona,@Correo, @Contrasena)";
                command.Parameters.AddWithValue("@Identificacion", cliente.Identificacion);
                command.Parameters.AddWithValue("@Nombre", cliente.Nombre);
                command.Parameters.AddWithValue("@Apellido", cliente.Apellido);
                command.Parameters.AddWithValue("@TipoPersona", cliente.TipoPersona);
                command.Parameters.AddWithValue("@Correo", cliente.Correo);
                command.Parameters.AddWithValue("@Contrasena", cliente.Contrasena);
                var filas = command.ExecuteNonQuery();
            }
        }
       
        public List<Cliente> ConsultarTodos()
        {
            SqlDataReader dataReader;
            List<Cliente> clientes = new List<Cliente>();
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Select * from cliente ";
                dataReader = command.ExecuteReader();
                if (dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        Cliente cliente = DataReaderMapToClient(dataReader);
                        clientes.Add(cliente);
                    }
                }
            }
            return clientes;
        }
       
        private Cliente DataReaderMapToClient(SqlDataReader dataReader)
        {
            if(!dataReader.HasRows) return null;
            Cliente cliente = new Cliente();
            cliente.Identificacion = (string)dataReader["Identificacion"];
            cliente.Nombre = (string)dataReader["Nombre"];
            cliente.Apellido = (string)dataReader["Apellido"];
            cliente.TipoPersona = (string)dataReader["TipoPersona"];
            cliente.Correo = (string)dataReader["Correo"];
            cliente.Contrasena = (string)dataReader["Contrasena"];
            return cliente;
        }

        public Cliente BuscarxIdentificacion(string identificacion)
        {
            SqlDataReader dataReader;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "select * from cliente where identificacion=@identificacion";
                command.Parameters.AddWithValue("@identificacion", identificacion);
                dataReader = command.ExecuteReader();
                dataReader.Read();
                return DataReaderMapToClient(dataReader);
            }
        }

        public Cliente BuscarxCorreo(string correo)
        {
            SqlDataReader dataReader;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "select * from cliente where correo=@correo";
                command.Parameters.AddWithValue("@correo", correo);
                dataReader = command.ExecuteReader();
                dataReader.Read();
                return DataReaderMapToClient(dataReader);
            }
        }

        public void Modificar( Cliente cliente)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"update cliente set nombre=@Nombre, Apellido=@Apellido, TipoPersona=@TipoPersona, 
                Correo=@Correo, Contrasena=@Contrasena, Pais=@Pais, Ciudad=@Ciudad, Direccion=@Direccion, Barrio=@Barrio,
                CodigoPostal=@CodigoPostal, Telefono=@Telefono where Identificacion=@Identificacion";              
                command.Parameters.AddWithValue("@Identificacion", cliente.Identificacion);
                command.Parameters.AddWithValue("@Nombre", cliente.Nombre);
                command.Parameters.AddWithValue("@Apellido", cliente.Apellido);
                command.Parameters.AddWithValue("@TipoPersona", cliente.TipoPersona);
                command.Parameters.AddWithValue("@Correo", cliente.Correo);
                command.Parameters.AddWithValue("@Contrasena", cliente.Contrasena);
                command.Parameters.AddWithValue("@Pais", cliente.Pais);
                command.Parameters.AddWithValue("@Ciudad", cliente.Ciudad);
                command.Parameters.AddWithValue("@Direccion", cliente.Direccion);
                command.Parameters.AddWithValue("@Barrio", cliente.Barrio);
                command.Parameters.AddWithValue("@CodigoPostal", cliente.CodigoPostal);
                command.Parameters.AddWithValue("@Telefono", cliente.Telefono);
                command.ExecuteNonQuery();
            }
        }

        public void Eliminar(Cliente cliente)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Delete from cliente where Identificacion=@Identificacion";
                command.Parameters.AddWithValue("@Identificacion", cliente.Identificacion);
                command.ExecuteNonQuery();
            }
        }
       
    }
}