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
    
    public class ProveedorInputModel
    {
        [Required(ErrorMessage = "La identificacion es requerida")]
        public string Identificacion{get;set;}
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre {get;set;}
        [EmailAddress(ErrorMessage = "Ingrese un correo electronico valido.")]
        public string Correo {get;set;}
        [Required(ErrorMessage = "La contraseña es requerida")]
        [MaxLength(20, ErrorMessage = "La contraseña no puede ser mayor a 20 caracteres.")]
        [MinLength(8, ErrorMessage = "La contraseña no puede ser menor a 8 caracteres.")]
        public string Contrasena {get;set;}
        [Required(ErrorMessage = "La descripcion es requerida")]
        public string Descripcion {get;set;}
    }

    public class ProveedorViewModel : ProveedorInputModel
    {
        public ProveedorViewModel()
        {

        }
        public ProveedorViewModel(Proveedor proveedor)
        {
            Identificacion = proveedor.Identificacion;
            Nombre = proveedor.Nombre;
            Correo = proveedor.Correo;
            Contrasena = proveedor.Contrasena;
            Descripcion = proveedor.Descripcion;
        }
    }


}