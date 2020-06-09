using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json.Serialization;
using Entity;

namespace floridaimportdotnet.Models
{
    public class LoginInputModel
    {
        [EmailAddress(ErrorMessage = "Ingrese un correo electronico valido.")]
        public string Correo {get;set;}
        [Required(ErrorMessage = "La contraseña es requerida")]
        [MaxLength(20, ErrorMessage = "La contraseña no puede ser mayor a 20 caracteres.")]
        [MinLength(8, ErrorMessage = "La contraseña no puede ser menor a 8 caracteres.")]
        public string Contraseña {get;set;}
    }
    public class LoginViewModel
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Correo { get; set; }
     [JsonIgnore] //no se para que
        public string Contraseña { get; set; }
        public string Token { get; set; }
    }
}