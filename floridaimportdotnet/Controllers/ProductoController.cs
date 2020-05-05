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
    public class ProductoController : ControllerBase
    {
        private readonly ProductoService _productoService;
        public IConfiguration Configuration { get; }
        public ProductoController(IConfiguration configuration)
        {
            Configuration = configuration;
            string connectionString = Configuration["ConnectionStrings:DefaultConnection"];
            _productoService = new ProductoService(connectionString);
        }
        
        [HttpGet]
        public IEnumerable<ProductoViewModel> Gets()
        {
            var productos = _productoService.ConsultarTodos().Select(p=> new ProductoViewModel(p));
            return productos;
        }

        
        [HttpPost]
        public ActionResult<ProductoViewModel> Post(ProductoInputModel productoInput)
        {
            Producto producto = MapearProducto(productoInput);
            var response = _productoService.Guardar(producto);
            if (response.Error) 
            {
                return BadRequest(response.Mensaje);
            }
            return Ok(response.Producto);
        }
        
        private Producto MapearProducto(ProductoInputModel productoInput)
        {
            var producto = new Producto
            {
                Nombre = productoInput.Nombre,
                Descripcion = productoInput.Descripcion,
                Cantidad = productoInput.Cantidad,
                Precio = productoInput.Precio,
                Proveedor = productoInput.Proveedor
                
            };

            return producto;
        }

        /*[HttpGet("{correo}")]
        public ActionResult<ClienteViewModel> Get(string correo)
        {
            var cliente = _clienteService.BuscarxCorreo(correo);
            if (cliente == null) return NotFound();
            var clienteViewModel = new ClienteViewModel(cliente);
            return clienteViewModel;
        }
        */
    }
}