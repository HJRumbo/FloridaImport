using System;
using System.Collections.Generic;

namespace Entity
{
    public class Pais
    {
        public decimal Codigo {get;set;}
        public string Nombre {get;set;}
        public List<Ciudad> Ciudades {get;set;}
    }
}