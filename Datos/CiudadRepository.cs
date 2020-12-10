using Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Datos
{
    public class CiudadRepository
    {
        private readonly SqlConnection _connection;

        public CiudadRepository(ConnectionManager connection)
        {
            _connection = connection._conexion;
        }

        public void GuardarUnaCiudad(Ciudad ciudad, decimal codigo)
        {
            var Estado = "Activa";

            using (var command = _connection.CreateCommand())
            {
            
                command.CommandText = @"Insert Into Ciudad (Codigo,Nombre,codPais, Estado) 
                values (NEXT VALUE FOR CodCiudSequence,@Nombre, @CodPais, @Estado)";
                command.Parameters.AddWithValue("@Nombre", ciudad.Nombre);
                command.Parameters.AddWithValue("@CodPais", codigo);
                command.Parameters.AddWithValue("@Estado", Estado);
                var filas = command.ExecuteNonQuery();
                    
            }
        }

        public void Modificar( Ciudad ciudad)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "update ciudad set nombre=@Nombre where codigo=@Codigo";
                command.Parameters.AddWithValue("@Nombre", ciudad.Nombre);
                command.Parameters.AddWithValue("@Codigo", ciudad.Codigo);
                command.ExecuteNonQuery();
            }
        }

        public Ciudad BuscarxCodigo(decimal codigo){

            SqlDataReader dataReader;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "select * from ciudad where codigo=@codigo and estado='Activa' ";
                command.Parameters.AddWithValue("@codigo", codigo);
                dataReader = command.ExecuteReader();
                dataReader.Read();
                return DataReaderMapToCity(dataReader);
            }

        }

        private Ciudad DataReaderMapToCity(SqlDataReader dataReader)
        {
            if(!dataReader.HasRows) return null;
            Ciudad ciudad = new Ciudad();
            ciudad.Codigo = Convert.ToDecimal(dataReader["Codigo"]);
            ciudad.Nombre = (string)dataReader["Nombre"];
            ciudad.CodPais = Convert.ToDecimal(dataReader["codPais"]);
            return ciudad;
        }

        public void Eliminar(Ciudad ciudad)
        {
            var estado = "Eliminada";
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Update ciudad set Estado=@Estado where codigo=@codigo";
                command.Parameters.AddWithValue("@Estado", estado);
                command.Parameters.AddWithValue("@codigo", ciudad.Codigo);
                command.ExecuteNonQuery();
            }
        }
        
    }
}