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
    public class PedidoController: ControllerBase
    {
        private readonly PedidoService _pedidoService;
        public IConfiguration Configuration { get; }
        public PedidoController(IConfiguration configuration)
        {
            Configuration = configuration;
            string connectionString = Configuration["ConnectionStrings:DefaultConnection"];
            _pedidoService = new PedidoService(connectionString);
        }

        [HttpGet]
        public IEnumerable<PedidoViewModel> Gets()
        {
            var pedidos = _pedidoService.ConsultarTodos().Select(p=> new PedidoViewModel(p));
            return pedidos;
        }
        
        [HttpPost]
        public ActionResult<PedidoViewModel> Post(PedidoInputModel pedidoInput)
        {
            Pedido pedido = MapearPedido(pedidoInput);
            var response = _pedidoService.Guardar(pedido);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar Pedido", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Pedido);
        }

        private Pedido MapearPedido(PedidoInputModel pedidoInput)
        {
            var pedido = new Pedido
            {
                FechaPedido = pedidoInput.FechaPedido,
                HoraPedido = pedidoInput.HoraPedido,
                IdCliente = pedidoInput.IdCliente,
                Detalles = MapearDeta(pedidoInput.Detalles)
            };

            return pedido;
        }

        private List<Detalle> MapearDeta(List<Detalle> detalles)
        {
            List<Detalle> Listdetalles = new List<Detalle>();

            foreach (var item in detalles)
            {
                Listdetalles.Add(item);
            }  

            return Listdetalles;
        }

        [HttpGet("{codigo}")]
        public ActionResult<PedidoViewModel> GetCorreo(decimal codigo)
        {
            var pedido = _pedidoService.BuscarxCodigo(codigo);
            if (pedido == null) return NotFound();
            var pedidoViewModel = new PedidoViewModel(pedido);
            return pedidoViewModel;
        }

        [HttpPut("{codigo}")]
        public ActionResult<string> Put(decimal codigo, Pedido pedido)
        {
            var ped=_pedidoService.BuscarxCodigo(pedido.CodigoPedido);
            if(ped==null){
                return BadRequest("No encontrado");
            }
            var mensaje=_pedidoService.Modificar(pedido);
            return Ok(mensaje);

        }

        [HttpGet]
        [Route("totalVendido")]
        public ActionResult<decimal> GetTotal()
        {
            var total = _pedidoService.SumarTotal();
            if (total == 0) return NotFound();
            return total;
        }
    }
}