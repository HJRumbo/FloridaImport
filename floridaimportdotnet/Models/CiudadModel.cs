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
    public class CiudadInputModel
    {   
        public decimal Codigo{get;set;}
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre {get;set;}
    }

    public class CiudadViewModel : CiudadInputModel
    {   
        public CiudadViewModel()
        {

        }
        public CiudadViewModel(Ciudad ciudad)
        {
            Codigo = ciudad.Codigo;
            Nombre = ciudad.Nombre;
        }
    }
}