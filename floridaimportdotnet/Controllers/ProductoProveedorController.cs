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
    public class ProductoProveedorController : ControllerBase
    {
        private readonly ProductoProveedorService _productoService;
        public IConfiguration Configuration { get; }
        public ProductoProveedorController(IConfiguration configuration)
        {
            Configuration = configuration;
            string connectionString = Configuration["ConnectionStrings:DefaultConnection"];
            _productoService = new ProductoProveedorService(connectionString);
        }
        
        [HttpGet]
        public IEnumerable<ProductoProveedorViewModel> Gets()
        {
            var productos = _productoService.ConsultarTodos().Select(p=> new ProductoProveedorViewModel(p));
            return productos;
        }

        [HttpGet("{idProveedor}")]
        public IEnumerable<ProductoProveedorViewModel> Gets(string idProveedor)
        {
            var productos = _productoService.ConsultarXProv(idProveedor).Select(p=> new ProductoProveedorViewModel(p));
            return productos;
        }
        
        [HttpPost]
        public ActionResult<ProductoProveedorViewModel> Post(ProductoProveedorInputModel productoInput)
        {
            ProductoProveedor producto = MapearProducto(productoInput);
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
        
        private ProductoProveedor MapearProducto(ProductoProveedorInputModel productoInput)
        {
            var producto = new ProductoProveedor
            {
                Nombre = productoInput.Nombre,
                Descripcion = productoInput.Descripcion,
                Precio = productoInput.Precio,
                IdProveedor = productoInput.IdProveedor,
                Tipo = productoInput.Tipo
            };

            return producto;
        }

        /*[HttpGet("{codigo}")]
        public ActionResult<ProductoViewModel> Get(decimal codigo)
        {
            var producto = _productoService.BuscarxCodigo(codigo);
            if (producto == null) return NotFound();
            var productoViewModel = new ProductoViewModel(producto);
            return productoViewModel;
        }*/

        [HttpDelete("{codigo}")]
        public ActionResult<string> Delete(decimal codigo)
        {
            string mensaje = _productoService.Eliminar(codigo);
            return Ok(mensaje);
        }

        [HttpPut("{codigo}")]
        public ActionResult<string> Put(decimal codigo, ProductoProveedor producto)
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