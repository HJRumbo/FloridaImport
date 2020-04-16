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
        public string Identificacion{get;set;}
        public string Nombre {get;set;}
        public string Apellido {get;set;}
        public string TipoPersona {get;set;}
        public string Correo {get;set;}
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
        }
    }

}