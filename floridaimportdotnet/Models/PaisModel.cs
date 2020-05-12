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
    public class PaisInputModel
    {   
        public decimal Codigo{get;set;}
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre {get;set;}
        [Required(ErrorMessage = "Al menos una ciudad es requerida")]
        public List<Ciudad> Ciudades {get;set;}
    }

    public class PaisViewModel : PaisInputModel
    {   
        public PaisViewModel()
        {

        }
        public PaisViewModel(Pais pais)
        {
            Codigo = pais.Codigo;
            Nombre = pais.Nombre;
            Ciudades = pais.Ciudades;
        }
    }

}