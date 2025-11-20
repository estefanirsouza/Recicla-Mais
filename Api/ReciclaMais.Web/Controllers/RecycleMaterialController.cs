using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Models.DTOs;
using ReciclaMais.Web.Services;
using ReciclaMais.Web.Services.Interfaces;

namespace ReciclaMais.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecycleMaterialController : ControllerBase
{
    private readonly IRecycleMaterialService _recycleMaterialService;

    public RecycleMaterialController(IRecycleMaterialService recycleMaterialService)
    {
        _recycleMaterialService = recycleMaterialService;
    }

    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> CreateRecycleMaterial([FromBody] RecycleMaterial recycleMaterial)
    {
        try
        {
            if(recycleMaterial == null || string.IsNullOrWhiteSpace(recycleMaterial.Name))
            {
                return BadRequest("Obrigatório informar ao menos o nome do material reciclável.");
            }

            var createdMaterial = await _recycleMaterialService.CreateAsync(recycleMaterial);
            return CreatedAtAction(nameof(CreateRecycleMaterial),createdMaterial);
        }
        catch(Exception ex)
        {
            return StatusCode(500, $"Erro ao criar material reciclável: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    [Route("update/{id}")]
    public async Task<IActionResult> UpdateRecycleMaterial(int id, [FromBody] RecycleMaterial recycleMaterial)
    {
        try
        {   
            var updatedMaterial = await _recycleMaterialService.UpdateAsync(id, recycleMaterial);
            if (updatedMaterial == null)
            {
                return NotFound();
            }

            return Ok(updatedMaterial);
        }
        catch(Exception ex)
        {
            return StatusCode(500, $"Erro ao atualizar material reciclável: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    [Route("delete/{id}")]
    public async Task<IActionResult> DeleteRecycleMaterial(int id)
    {
        try
        {
            var result = await _recycleMaterialService.DeleteAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
        catch(Exception ex)
        {
            return StatusCode(500, $"Erro ao deletar material reciclável: {ex.Message}");
        }
    }

    [HttpGet]
    [Route("getall")]
    public async Task<IActionResult> GetAllRecycleMaterials()
    {
        try
        {
            var materials = await _recycleMaterialService.GetAllAsync();
            return Ok(materials);
        }
        catch(Exception ex)
        {
            return StatusCode(500, $"Erro ao obter todos os materiais recicláveis: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    [Route("get/{id}")]
    public async Task<IActionResult> GetRecycleMaterialById(int id)
    {
        try
        {
            var material = await _recycleMaterialService.GetByIdAsync(id);
            if (material == null)
            {
                return NotFound();
            }
            
            return Ok(material);
        }
        catch(Exception ex)
        {
            return StatusCode(500, $"Erro ao obter material reciclável: {ex.Message}");
        }
    }

    [HttpGet]
    [Route("getbyname")]
    public async Task<IActionResult> GetRecycleMaterialByName(string? name)
    {
        try
        {
            if(string.IsNullOrWhiteSpace(name))
            {
                return BadRequest("Nome do material reciclável é obrigatório.");
            }

            var materials = await _recycleMaterialService.GetAllByNameAsync(name);
            return Ok(materials);
        }
        catch(Exception ex)
        {
            return StatusCode(500, $"Erro ao obter materiais recicláveis por nome: {ex.Message}");
        }
    }
}