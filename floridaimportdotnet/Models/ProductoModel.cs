using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
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
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre {get;set;}
        [Required(ErrorMessage = "La descripcion es requerida")]
        public string Descripcion {get;set;}
        [Required(ErrorMessage = "La cantidad del producto es requerida")]
        public int Cantidad {get;set;}
        [Required(ErrorMessage = "El precio del producto es requerido")]
        public decimal Precio {get;set;}
        [Required(ErrorMessage = "El proveedor es requerido")]
        public string Proveedor {get;set;}
        [Required(ErrorMessage = "El tipo de prudcto es requerido")]
        [TipoProductoValidacion(ErrorMessage= "El tipo de producto debe ser Fruta, Verdura u Hortalza")]
        public string Tipo {get;set;}
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
            Tipo = producto.Tipo;
        }
    }

    public class TipoProductoValidacion : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if ((value.ToString() == "Fruta") || (value.ToString() == "Verdura") || (value.ToString() == "Hortaliza"))
            {
                return ValidationResult.Success;
            }
            else
            {
                return new ValidationResult(ErrorMessage);
            }
        }
    }
}