using Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Datos
{
    public class UsuarioRespository
    {
        private readonly SqlConnection _connection;
        private readonly List<Usuario> _usuarios = new List<Usuario>();
        public UsuarioRespository(ConnectionManager connection)
        {
            _connection = connection._conexion;
        }
        public void Guardar(Usuario usuario)
        {

            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Insert Into Usuario (Codigo,Correo,
                Contraseña, Rol) 
                values (NEXT VALUE FOR CodUserSequence,@Correo,@Contraseña,@Rol)";
                command.Parameters.AddWithValue("@Correo", usuario.Correo);
                command.Parameters.AddWithValue("@Contraseña", usuario.Contraseña);
                command.Parameters.AddWithValue("@Rol", usuario.Rol);
                var filas = command.ExecuteNonQuery();
            }
        }

        public Usuario BuscarxCorreo(string correo, string rol)
        {
            SqlDataReader dataReader;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "select * from usuario where correo=@correo and rol=@rol";
                command.Parameters.AddWithValue("@correo", correo);
                command.Parameters.AddWithValue("@rol", rol);
                dataReader = command.ExecuteReader();
                dataReader.Read();
                return DataReaderMapToClient(dataReader);
            }
        }

        private Usuario DataReaderMapToClient(SqlDataReader dataReader)
        {

            if(!dataReader.HasRows) return null;
            Usuario usuario = new Usuario();
            usuario.Codigo = Convert.ToDecimal(dataReader["Codigo"]);
            usuario.Correo = (string)dataReader["Correo"];
            usuario.Contraseña = (string)dataReader["Contraseña"];
            usuario.Rol = (string)dataReader["Rol"];
            
            return usuario;
        }        
    }
}