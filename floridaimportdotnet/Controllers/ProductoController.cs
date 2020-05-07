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
                ModelState.AddModelError("Guardar Producto", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
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
                Proveedor = productoInput.Proveedor,
                Tipo = productoInput.Tipo
            };

            return producto;
        }

        [HttpGet("{codigo}")]
        public ActionResult<ProductoViewModel> Get(decimal codigo)
        {
            var producto = _productoService.BuscarxCodigo(codigo);
            if (producto == null) return NotFound();
            var productoViewModel = new ProductoViewModel(producto);
            return productoViewModel;
        }

        [HttpDelete("{codigo}")]
        public ActionResult<string> Delete(decimal codigo)
        {
            string mensaje = _productoService.Eliminar(codigo);
            return Ok(mensaje);
        }

        [HttpPut("{codigo}")]
        public ActionResult<string> Put(decimal codigo, Producto producto)
        {
            var id=_productoService.BuscarxCodigo(producto.Codigo);
            if(id==null){
                return BadRequest("No encontrado");
            }
            var mensaje=_productoService.Modificar(producto);
           return Ok(mensaje);

        }
    }
}