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
    public class ProductoProveedorInputModel
    {   
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre {get;set;}
        [Required(ErrorMessage = "La descripcion es requerida")]
        public string Descripcion {get;set;}
        [Required(ErrorMessage = "El precio del producto es requerido")]
        public decimal Precio {get;set;}
        [Required(ErrorMessage = "La identificación del proveedor es requerido")]
        public string IdProveedor {get;set;}
        [Required(ErrorMessage = "El tipo de pruducto es requerido")]
        [TipoProductoProveedorValidacion(ErrorMessage= "El tipo de producto debe ser Fruta, Verdura u Hortalza")]
        public string Tipo {get;set;}
    }

    public class ProductoProveedorViewModel : ProductoProveedorInputModel
    {   
        public ProductoProveedorViewModel()
        {

        }
        public ProductoProveedorViewModel(ProductoProveedor producto)
        {
            Codigo = producto.Codigo;
            Nombre = producto.Nombre;
            Descripcion = producto.Descripcion;
            Precio = producto.Precio;
            IdProveedor = producto.IdProveedor;
            Tipo = producto.Tipo;
        }

        public decimal Codigo{get;set;}
    }

    public class TipoProductoProveedorValidacion : ValidationAttribute
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