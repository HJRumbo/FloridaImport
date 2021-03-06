using Datos;
using Entity;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using floridaimportdotnet.Config;
using floridaimportdotnet.Models;
using floridaimportdotnet.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using floridaimportdotnet.Hubs;

namespace floridaimportdotnet.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly IHubContext<SignalHub> _hubContext;
        private JwtService _jwtService;
        private readonly ClienteService _clienteService;
        public IConfiguration Configuration { get; }
        public ClienteController(IConfiguration configuration, IOptions<AppSetting> appSettings, IHubContext<SignalHub> hubContext)
        {
            _hubContext = hubContext;
            Configuration = configuration;
            string connectionString = Configuration["ConnectionStrings:DefaultConnection"];
            _clienteService = new ClienteService(connectionString);
            _jwtService = new JwtService(appSettings);
        }

        [HttpGet]
        public IEnumerable<ClienteViewModel> Gets()
        {
            var clientes = _clienteService.ConsultarTodos().Select(c=> new ClienteViewModel(c));
            return clientes;
        }

        [HttpGet]
        [Route("Identificacion/{identificacion}")]
        public ActionResult<ClienteViewModel> GetId(string identificacion)
        {
            var cliente = _clienteService.BuscarxIdentificacion(identificacion);
            if (cliente == null) return NotFound();
            var clienteViewModel = new ClienteViewModel(cliente);
            return clienteViewModel;
        }
        
        [HttpPost]
        public async Task<ActionResult<ClienteViewModel>> Post(ClienteInputModel clienteInput)
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
            var clienteViewModel = new ClienteViewModel(response.Cliente);
            await _hubContext.Clients.All.SendAsync("ClienteRegistrado", clienteViewModel);
            return Ok(clienteViewModel);
        }

        [HttpDelete("{correo}")]
        public ActionResult<string> Delete(string correo)
        {
            string mensaje = _clienteService.Eliminar(correo);
            return Ok(mensaje);
        }

        [HttpPut("{identificacion}")]
        public ActionResult<string> Put(string identificacion, Cliente cliente){
            var id=_clienteService.BuscarxIdentificacion(cliente.Identificacion);
            if(id==null){
                return BadRequest("No encontrado");
            }
            var mensaje=_clienteService.Modificar(cliente);
            return Ok(mensaje);}
        
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

        [HttpGet]
        [Route("numeroClientes")]
        public ActionResult<decimal> GetCount()
        {
            var contador = _clienteService.CountClientes();
            if (contador == 0) return NotFound();
            return contador;
        }
        
    }
}