using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;
using Logica;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using floridaimportdotnet.Models;


namespace floridaimportdotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaisController: ControllerBase
    {
        private readonly PaisService _paisService;
        public IConfiguration Configuration { get; }
        public PaisController(IConfiguration configuration)
        {
            Configuration = configuration;
            string connectionString = Configuration["ConnectionStrings:DefaultConnection"];
            _paisService = new PaisService(connectionString);
        }

        [HttpGet]
        public IEnumerable<PaisViewModel> Gets()
        {
            var paises = _paisService.ConsultarTodos().Select(p=> new PaisViewModel(p));
            return paises;
        }
        
        [HttpPost]
        public ActionResult<PaisViewModel> Post(PaisInputModel paisInput)
        {
            Pais pais = MapearPais(paisInput);
            var response = _paisService.Guardar(pais);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar Pais", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Pais);
        }

        private Pais MapearPais(PaisInputModel paisInput)
        {
            var pais = new Pais
            {
                Nombre = paisInput.Nombre,
                Ciudades = MapearCiudad(paisInput.Ciudades)
            };

            return pais;
        }

        private List<Ciudad> MapearCiudad(List<Ciudad> ciudades)
        {
            List<Ciudad> listaCiu = new List<Ciudad>();

            foreach (var item in ciudades)
            {
                listaCiu.Add(item);
            }  

            return listaCiu;
        }

        [HttpGet("{nombre}")]
        public ActionResult<PaisViewModel> GetNombre(string nombre)
        {
            var pais = _paisService.BuscarxNombre(nombre);
            if (pais == null) return NotFound();
            var paisViewModel = new PaisViewModel(pais);
            return paisViewModel;
        }

        [HttpPut("{nombre}")]
        public ActionResult<string> Put(string nombre, Pais pais)
        {
            var nom=_paisService.BuscarxNombre(pais.Nombre);
            if(nom==null){
                return BadRequest("No encontrado");
            }
            var mensaje=_paisService.Modificar(pais);
           return Ok(mensaje);

        }

        [HttpDelete("{nombre}")]
        public ActionResult<string> Delete(string nombre)
        {
            string mensaje = _paisService.Eliminar(nombre);
            return Ok(mensaje);
        }
    }
}