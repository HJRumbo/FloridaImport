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
    public class ClienteController : ControllerBase
    {
        private readonly ClienteService _clienteService;
        public IConfiguration Configuration { get; }
        public ClienteController(IConfiguration configuration)
        {
            Configuration = configuration;
            string connectionString = Configuration["ConnectionStrings:DefaultConnection"];
            _clienteService = new ClienteService(connectionString);
        }
        
        [HttpGet]
        public IEnumerable<ClienteViewModel> Gets()
        {
            var clientes = _clienteService.ConsultarTodos().Select(c=> new ClienteViewModel(c));
            return clientes;
        }

       /* [HttpGet("{identificacion}")]
        public ActionResult<ClienteViewModel> Get(string identificacion)
        {
            var cliente = _clienteService.BuscarxIdentificacion(identificacion);
            if (cliente == null) return NotFound();
            var clienteViewModel = new ClienteViewModel(cliente);
            return clienteViewModel;
        }*/
        
        [HttpPost]
        public ActionResult<ClienteViewModel> Post(ClienteInputModel clienteInput)
        {
            Cliente cliente = MapearCliente(clienteInput);
            var response = _clienteService.Guardar(cliente);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar Cliente", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Cliente);
        }

        [HttpDelete("{identificacion}")]
        public ActionResult<string> Delete(string identificacion)
        {
            string mensaje = _clienteService.Eliminar(identificacion);
            return Ok(mensaje);
        }

        [HttpPut("{identificacion}")]
        public ActionResult<string> Put(string identificacion, Cliente cliente)
        {
            var id=_clienteService.BuscarxIdentificacion(cliente.identificacion);
            if(id==null){
                return BadRequest("No encontrado");
            }
            var mensaje=_clienteService.Modificar(cliente);
           return Ok(mensaje);

        }
        
        private Cliente MapearCliente(ClienteInputModel clienteInput)
        {
            var cliente = new Cliente
            {
                Identificacion = clienteInput.Identificacion,
                Nombre = clienteInput.Nombre,
                Apellido = clienteInput.Apellido,
                TipoPersona = clienteInput.TipoPersona,
                Correo = clienteInput.Correo,
                Contrasena = clienteInput.Contrasena
                
            };

            return cliente;
        }

        [HttpGet("{correo}")]
        public ActionResult<ClienteViewModel> GetCorreo(string correo)
        {
            var cliente = _clienteService.BuscarxCorreo(correo);
            if (cliente == null) return NotFound();
            var clienteViewModel = new ClienteViewModel(cliente);
            return clienteViewModel;
        }
        
    }
}