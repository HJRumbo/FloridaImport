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
    public class CiudadController: ControllerBase
    {
        private readonly CiudadService _ciudadService;
        public IConfiguration Configuration { get; }
        public CiudadController(IConfiguration configuration)
        {
            Configuration = configuration;
            string connectionString = Configuration["ConnectionStrings:DefaultConnection"];
            _ciudadService = new CiudadService(connectionString);
        }
        
        [HttpPost("{nombrePais}")]
        public ActionResult<PaisViewModel> PostCiudad(string nombrePais, CiudadInputModel ciudadInput)
        {
            Ciudad ciudad = MapearUnaCiudad(ciudadInput);
            var response = _ciudadService.GuardarCiudad(ciudad, nombrePais);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar Ciudad", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Ciudad);
        }

        private Ciudad MapearUnaCiudad(CiudadInputModel ciudadInput)
        {
            var ciudad = new Ciudad
            {
                Nombre = ciudadInput.Nombre,
                
            };

            return ciudad;
        }
        /*private List<Ciudad> MapearCiudad(List<Ciudad> ciudades)
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
        }*/

        [HttpPut("{codigo}")]
        public ActionResult<string> Put(decimal codigo, Ciudad ciudad)
        {
            var nom=_ciudadService.BuscarxCodigo(codigo);
            if(nom==null){
                return BadRequest("No encontrado");
            }
            var mensaje=_ciudadService.Modificar(ciudad, codigo);
           return Ok(mensaje);

        }

        [HttpDelete("{codigo}")]
        public ActionResult<string> Delete(decimal codigo)
        {
            string mensaje = _ciudadService.Eliminar(codigo);
            return Ok(mensaje);
        }
    }
}