using Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Datos
{
    public class PedidoRepository
    {
        private readonly SqlConnection _connection;
        private readonly List<Detalle> _detalles = new List<Detalle>();
        private readonly ProductoRepository _productoRepository;
        Producto producto = new Producto();
        public PedidoRepository(ConnectionManager connection)
        {
            _connection = connection._conexion;
            _productoRepository = new ProductoRepository(connection);
        }
        
        public void Guardar(Pedido pedido)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = @"Insert Into Pedido (CodigoPedido,FechaPedido,HoraPedido,TotalPedido,IdCliente,Estado) 
                values (NEXT VALUE FOR CodPedidoSequence,@FechaPedido,@HoraPedido,@TotalPedido,@IdCliente,@Estado)";
                command.Parameters.AddWithValue("@FechaPedido", pedido.FechaPedido);
                command.Parameters.AddWithValue("@HoraPedido", pedido.HoraPedido);
                command.Parameters.AddWithValue("@TotalPedido", pedido.TotalPedido);
                command.Parameters.AddWithValue("@IdCliente", pedido.IdCliente);
                command.Parameters.AddWithValue("@Estado", pedido.Estado);
                var filas = command.ExecuteNonQuery();
                GuardarDetalles(pedido.Detalles);
                
            }
        }

        public void GuardarDetalles(List<Detalle> detalles)
        {
            foreach (var item in detalles)
            {
                using (var command = _connection.CreateCommand())
                {
                    
                    command.CommandText = @"Insert Into Detalle (CodigoDetalle,CodigoProducto,CantidadProducto, TotalDetalle, CodigoPedido) values 
                    (NEXT VALUE FOR CodDetaSequence,@CodigoProducto,@CantidadProducto, @TotalDetalle, (SELECT CAST(current_value AS int) FROM sys.sequences 
                    WHERE name = 'CodPedidoSequence'))";
                    command.Parameters.AddWithValue("@CodigoProducto", item.CodigoProducto);
                    command.Parameters.AddWithValue("@CantidadProducto", item.CantidadProducto);
                    command.Parameters.AddWithValue("@TotalDetalle", item.TotalDetalle);
                    var filas = command.ExecuteNonQuery();
                    
                }
            }
        }
       
        public Pedido BuscarxCodigo(decimal codigo)
        {
            SqlDataReader dataReader;
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "select * from pedido where CodigoPedido=@Codigo";
                command.Parameters.AddWithValue("@Codigo", codigo);
                dataReader = command.ExecuteReader();
                dataReader.Read();
                return DataReaderMapToPedido(dataReader);
            }
        }

        public List<Pedido> ConsultarTodos()
        {
            SqlDataReader dataReader;
            List<Pedido> pedidos = new List<Pedido>();
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Select * from pedido";
                dataReader = command.ExecuteReader();
                if (dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        Pedido pedido = DataReaderMapToPedido(dataReader);
                        pedidos.Add(pedido);
                    }
                }
            }
            return pedidos;
        }

        private Pedido DataReaderMapToPedido(SqlDataReader dataReader)
        {
            if(!dataReader.HasRows) return null;
            Pedido pedido = new Pedido();
            pedido.CodigoPedido = Convert.ToDecimal(dataReader["CodigoPedido"]);
            pedido.FechaPedido = (string)dataReader["FechaPedido"];
            pedido.HoraPedido = (string)dataReader["HoraPedido"];
            pedido.TotalPedido = Convert.ToDecimal(dataReader["TotalPedido"]);
            pedido.IdCliente = (string)dataReader["IdCliente"];
            pedido.Estado = (string)dataReader["Estado"];
            pedido.Detalles = ConsultarDetalles(pedido.CodigoPedido);
            return pedido;
        }

        public List<Detalle> ConsultarDetalles(decimal codigoPedido)
        {
            SqlDataReader dataReader;
            List<Detalle> detalles = new List<Detalle>();
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "Select * from detalle where codigoPedido=@codigoPedido";
                command.Parameters.AddWithValue("@codigoPedido", codigoPedido);
                dataReader = command.ExecuteReader();
                if (dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        Detalle detalle = DataReaderMapToDeta(dataReader);
                        detalles.Add(detalle);
                    }
                }
            }
            return detalles;
        }

        private Detalle DataReaderMapToDeta(SqlDataReader dataReader)
        {
            if(!dataReader.HasRows) return null;
            Detalle detalle = new Detalle();
            detalle.CodigoDetalle = Convert.ToDecimal(dataReader["CodigoDetalle"]);
            detalle.CodigoProducto = Convert.ToDecimal(dataReader["CodigoProducto"]);
            detalle.CantidadProducto = Convert.ToInt32(dataReader["CantidadProducto"]);
            detalle.CodigoPedido = Convert.ToDecimal(dataReader["CodigoPedido"]);
            detalle.TotalDetalle = Convert.ToDecimal(dataReader["TotalDetalle"]);
            producto = _productoRepository.BuscarxCodigo(detalle.CodigoProducto);
            detalle.NombreProducto = producto.Nombre;
            detalle.PrecioProducto = producto.Precio;
            return detalle;
        }

        

        public void Modificar( Pedido pedido)
        {
            using (var command = _connection.CreateCommand())
            {
                command.CommandText = "update pedido set Estado=@Estado where CodigoPedido=@CodigoPedido";
                command.Parameters.AddWithValue("@CodigoPedido", pedido.CodigoPedido);
                command.Parameters.AddWithValue("@Estado", pedido.Estado);
                command.ExecuteNonQuery();
            }
        }

/*
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