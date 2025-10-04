using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IEnumerable<Producto>> Get()
    {
        return await _context.Productos.ToListAsync();
    }

    [HttpPost]
    public async Task<IActionResult> Post(Producto producto)
    {
        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();
        return Ok(producto);
    }

    // Editar un producto
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Producto productoActualizado){
        var producto = await _context.Productos.FindAsync(id);
        if (producto == null) return NotFound();

        producto.Nombre = productoActualizado.Nombre;
        producto.Precio = productoActualizado.Precio;

        await _context.SaveChangesAsync();
        return Ok(producto);
    }

    // Eliminar producto
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id){
        var producto = await _context.Productos.FindAsync(id);
        if (producto == null) return NotFound();

        _context.Productos.Remove(producto);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
