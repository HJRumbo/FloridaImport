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
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Insert Into Pais (Codigo,Nombre) 
                values (NEXT VALUE FOR CodPaisSequence,@Nombre)";
                command.Parameters.AddWithValue("@Nombre", pais.Nombre);
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
                command.CommandText = "Select * from pais";
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
                command.CommandText = "Select * from ciudad where codPais=@codPais";
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

        /*

        public void Modificar( Producto producto)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "update producto set nombre=@Nombre, Descripcion=@Descripcion, Cantidad=@Cantidad, Precio=@Precio, Proveedor=@Proveedor where codigo=@codigo";
                command.Parameters.AddWithValue("@Codigo", producto.Codigo);
                command.Parameters.AddWithValue("@Nombre", producto.Nombre);
                command.Parameters.AddWithValue("@Descripcion", producto.Descripcion);
                command.Parameters.AddWithValue("@Cantidad", producto.Cantidad);
                command.Parameters.AddWithValue("@Precio", producto.Precio);
                command.Parameters.AddWithValue("@Proveedor", producto.Proveedor);
                command.ExecuteNonQuery();
            }
        }

        public void Eliminar(Producto producto)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Delete from producto where codigo=@codigo";
                command.Parameters.AddWithValue("@codigo", producto.Codigo);
                command.ExecuteNonQuery();
            }
        }*/
    }
}