using System;
using System.Collections.Generic;

namespace Entity
{
    public class Proveedor
    {
        public string Identificacion{get;set;}
        public string Nombre {get;set;}
        public string Correo {get;set;}
        public string Contrasena {get;set;}
        public string Descripcion {get;set;}
        public List<Producto> Productos {get;set;}
        public string Pais{get;set;}
        public string Ciudad {get;set;}
        public string Direccion {get;set;}
        public string Barrio {get;set;}
        public string Telefono {get;set;}
    }
}