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
    public class ProveedorController : ControllerBase
    {
        private readonly ProveedorService _proveedorService;
        public IConfiguration Configuration { get; }
        public ProveedorController(IConfiguration configuration)
        {
            Configuration = configuration;
            string connectionString = Configuration["ConnectionStrings:DefaultConnection"];
            _proveedorService = new ProveedorService(connectionString);
        }
        
        [HttpGet]
        public IEnumerable<ProveedorViewModel> Gets()
        {
            var proveedores = _proveedorService.ConsultarTodos().Select(c=> new ProveedorViewModel(c));
            return proveedores;
        }

       /*[HttpGet("{identificacion}")]
        public ActionResult<ProveedorViewModel> GetId(string identificacion)
        {
            var proveedor = _proveedorService.BuscarxIdentificacion(identificacion);
            if (proveedor == null) return NotFound();
            var proveedorViewModel = new ProveedorViewModel(proveedor);
            return proveedorViewModel;
        }*/
        
        [HttpPost]
        public ActionResult<ProveedorViewModel> Post(ProveedorInputModel proveedorInput)
        {
            Proveedor proveedor = MapearProveedor(proveedorInput);
            var response = _proveedorService.Guardar(proveedor);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar Proveedor", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Proveedor);
        }

        [HttpDelete("{identificacion}")]
        public ActionResult<string> Delete(string identificacion)
        {
            string mensaje = _proveedorService.Eliminar(identificacion);
            return Ok(mensaje);
        }

        [HttpPut("{identificacion}")]
        public ActionResult<string> Put(string identificacion, Proveedor proveedor)
        {
            var id=_proveedorService.BuscarxIdentificacion(proveedor.Identificacion);
            if(id==null){
                return BadRequest("No encontrado");
            }
            var mensaje=_proveedorService.Modificar(proveedor);
           return Ok(mensaje);

        }
        
        private Proveedor MapearProveedor(ProveedorInputModel proveedorInput)
        {
            var proveedor = new Proveedor
            {
                Identificacion = proveedorInput.Identificacion,
                Nombre = proveedorInput.Nombre,
                Correo = proveedorInput.Correo,
                Contrasena = proveedorInput.Contrasena,
                Descripcion = proveedorInput.Descripcion
                
            };

            return proveedor;
        }

        [HttpGet("{correo}")]
        public ActionResult<ProveedorViewModel> GetCorreo(string correo)
        {
            var proveedor = _proveedorService.BuscarxCorreo(correo);
            if (proveedor == null) return NotFound();
            var proveedorViewModel = new ProveedorViewModel(proveedor);
            return proveedorViewModel;
        }
        
    }
}