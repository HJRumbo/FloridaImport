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
            using (var command = _connection.CreateCommand())
            {
            
                command.CommandText = @"Insert Into Ciudad (Codigo,Nombre,codPais) 
                values (NEXT VALUE FOR CodCiudSequence,@Nombre, @CodPais)";
                command.Parameters.AddWithValue("@Nombre", ciudad.Nombre);
                command.Parameters.AddWithValue("@CodPais", codigo);
                var filas = command.ExecuteNonQuery();
                    
            }
        }

        public void Modificar( Ciudad ciudad)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "update ciudad set nombre=@Nombre where codigo=@Codigo";
                command.Parameters.AddWithValue("@Nombre", ciudad.Nombre);
                command.ExecuteNonQuery();
            }
        }

        public Ciudad BuscarxCodigo(decimal codigo){

            SqlDataReader dataReader;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "select * from ciudad where codigo=@codigo";
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
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Delete from ciudad where codigo=@codigo";
                command.Parameters.AddWithValue("@codigo", ciudad.Codigo);
                command.ExecuteNonQuery();
            }
        }
        
    }
}