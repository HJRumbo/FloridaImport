using Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Datos
{
    public class PaisRepository
    {
        private readonly SqlConnection _connection;
        private readonly List<Pais> _paices = new List<Pais>();
        public PaisRepository(ConnectionManager connection)
        {
            _connection = connection._conexion;
        }
        
        public void Guardar(Pais pais)
        {
            var Estado = "Activo";
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Insert Into Pais (Codigo,Nombre, Estado) 
                values (NEXT VALUE FOR CodPaisSequence,@Nombre, @Estado)";
                command.Parameters.AddWithValue("@Nombre", pais.Nombre);
                command.Parameters.AddWithValue("@Estado", Estado);
                var filas = command.ExecuteNonQuery();
                GuardarCiudades(pais.Ciudades);
                
            }
        }

        public void GuardarCiudades(List<Ciudad> ciudades)
        {
            foreach (var item in ciudades)
            {
                using (var command = _connection.CreateCommand())
                {
                    
                    command.CommandText = @"Insert Into Ciudad (Codigo,Nombre,codPais) 
                    values (NEXT VALUE FOR CodCiudSequence,@Nombre, 
                    (SELECT CAST(current_value AS int) FROM sys.sequences 
                    WHERE name = 'CodPaisSequence'))";
                    command.Parameters.AddWithValue("@Nombre", item.Nombre);
                    var filas = command.ExecuteNonQuery();
                    
                }
            }
        }
        
        public Pais BuscarxNombre(string nombre)
        {
            SqlDataReader dataReader;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "select * from pais where nombre=@nombre";
                command.Parameters.AddWithValue("@nombre", nombre);
                dataReader = command.ExecuteReader();
                dataReader.Read();
                return DataReaderMapToPais(dataReader);
            }
        }

        public List<Pais> ConsultarTodos()
        {
            SqlDataReader dataReader;
            List<Pais> paises = new List<Pais>();
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Select * from pais where estado='Activo' ";
                dataReader = command.ExecuteReader();
                if (dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        Pais pais = DataReaderMapToPais(dataReader);
                        paises.Add(pais);
                    }
                }
            }
            return paises;
        }

        private Pais DataReaderMapToPais(SqlDataReader dataReader)
        {
            if(!dataReader.HasRows) return null;
            Pais pais = new Pais();
            pais.Codigo = Convert.ToDecimal(dataReader["Codigo"]);
            pais.Nombre = (string)dataReader["Nombre"];
            pais.Ciudades = ConsultarCiudades(pais.Codigo);
            return pais;
        }

        public List<Ciudad> ConsultarCiudades(decimal codPais)
        {
            SqlDataReader dataReader;
            List<Ciudad> ciudades = new List<Ciudad>();
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Select * from ciudad where codPais=@codPais and estado='Activa' ";
                command.Parameters.AddWithValue("@codPais", codPais);
                dataReader = command.ExecuteReader();
                if (dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        Ciudad ciudad = DataReaderMapToCiud(dataReader);
                        ciudades.Add(ciudad);
                    }
                }
            }
            return ciudades;
        }

        private Ciudad DataReaderMapToCiud(SqlDataReader dataReader)
        {
            if(!dataReader.HasRows) return null;
            Ciudad ciudad = new Ciudad();
            ciudad.Codigo = Convert.ToDecimal(dataReader["Codigo"]);
            ciudad.Nombre = (string)dataReader["Nombre"];
            return ciudad;
        }

        public void Modificar( Pais pais)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "update pais set nombre=@Nombre where nombre=@Nombre";
                command.Parameters.AddWithValue("@Nombre", pais.Nombre);
                command.ExecuteNonQuery();
            }
        }

        public void Eliminar(Pais pais)
        {
            var estadoPais = "Eliminado";
            var estadoCiudad = "Eliminada";
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Update ciudad set Estado=@Estado where codPais=@codigoPais";
                command.Parameters.AddWithValue("@Estado", estadoCiudad);
                command.Parameters.AddWithValue("@codigoPais", pais.Codigo);
                command.CommandText = "Update Pais set Estado=@Estado where Codigo=@codigo";
                command.Parameters.AddWithValue("@Estado", estadoPais);
                command.Parameters.AddWithValue("@codigo", pais.Codigo);
                command.ExecuteNonQuery();
            }
        }
    }
}