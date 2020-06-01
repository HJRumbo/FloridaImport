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
    public class ClienteInputModel
    {
        [Required(ErrorMessage = "La identificacion es requerida")]
        public string Identificacion{get;set;}
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre {get;set;}
        [Required(ErrorMessage = "El apellido es requerido")]
        public string Apellido {get;set;}
        [Required(ErrorMessage = "El tipo de cliente es requerido (Natural o Juridica)")]
        [TipoPersonaValidacion(ErrorMessage= "El tipo de cliente debe ser Juridica o Natural")]
        public string TipoPersona {get;set;}
        [EmailAddress(ErrorMessage = "Ingrese un correo electronico valido.")]
        public string Correo {get;set;}
        [Required(ErrorMessage = "La contraseña es requerida")]
        [MaxLength(20, ErrorMessage = "La contraseña no puede ser mayor a 20 caracteres.")]
        [MinLength(8, ErrorMessage = "La contraseña no puede ser menor a 8 caracteres.")]
        public string Contrasena {get;set;}
    }

    public class ClienteViewModel : ClienteInputModel
    {
        public ClienteViewModel()
        {

        }
        public ClienteViewModel(Cliente cliente)
        {
            Identificacion = cliente.Identificacion;
            Nombre = cliente.Nombre;
            Apellido = cliente.Apellido;
            TipoPersona = cliente.TipoPersona;
            Correo = cliente.Correo;
            Contrasena = cliente.Contrasena;
            Pais = cliente.Pais;
            Ciudad = cliente.Ciudad;
            Direccion = cliente.Direccion;
            Barrio = cliente.Barrio;
            CodigoPostal = cliente.CodigoPostal;
            Telefono = cliente.Telefono;

        }

        public string Pais{get;set;}
        public string Ciudad {get;set;}
        public string Direccion {get;set;}
        public string Barrio {get;set;}
        public string CodigoPostal {get;set;}
        public string Telefono {get;set;}
    }

    public class TipoPersonaValidacion : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if ((value.ToString() == "Natural") || (value.ToString() == "Juridica"))
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