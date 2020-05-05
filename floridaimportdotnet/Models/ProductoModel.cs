using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Entity;

namespace floridaimportdotnet.Models
{
    public class ProductoInputModel
    {
        public decimal Codigo{get;set;}
        public string Nombre {get;set;}
        public string Descripcion {get;set;}
        public int Cantidad {get;set;}
        public decimal Precio {get;set;}
        public string Proveedor {get;set;}
    }

    public class ProductoViewModel : ProductoInputModel
    {
        public ProductoViewModel()
        {

        }
        public ProductoViewModel(Producto producto)
        {
            Codigo = producto.Codigo;
            Nombre = producto.Nombre;
            Descripcion = producto.Descripcion;
            Cantidad = producto.Cantidad;
            Precio = producto.Precio;
            Proveedor = producto.Proveedor;
        }
    }
}