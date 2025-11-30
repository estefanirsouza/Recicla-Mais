using Microsoft.AspNetCore.Mvc;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Services.Interfaces;

namespace ReciclaMais.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecyclePointController : ControllerBase
{
    private readonly IRecyclePointService _recyclePointService;
    private readonly IRecyclePointMaterialService _recyclePointMaterialService;

    public RecyclePointController(IRecyclePointService recyclePointService, IRecyclePointMaterialService recyclePointMaterialService)
    {
        _recyclePointService = recyclePointService;
        _recyclePointMaterialService = recyclePointMaterialService;
    }

    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> CreateRecyclePoint([FromBody] RecyclePoint recyclePoint)
    {
        try
        {
            if (recyclePoint == null)
            {
                return BadRequest("Obrigatório informar os dados do ponto de reciclagem.");
            }

            var errorMessage = recyclePoint.Validate();
            if (!string.IsNullOrEmpty(errorMessage))
            {
                return BadRequest(errorMessage);
            }

            var createdPoint = await _recyclePointService.CreateAsync(recyclePoint);
            return CreatedAtAction(nameof(CreateRecyclePoint), createdPoint);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao criar ponto de reciclagem: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    [Route("update/{id}")]
    public async Task<IActionResult> UpdateRecyclePoint(int id, [FromBody] RecyclePoint recyclePoint)
    {
        try
        {
            if (recyclePoint == null)
            {
                return BadRequest("Obrigatório informar os dados do ponto de reciclagem.");
            }

            var updatedPoint = await _recyclePointService.UpdateAsync(id, recyclePoint);
            if (updatedPoint == null)
            {
                return NotFound($"Ponto de reciclagem com ID {id} não encontrado.");
            }

            return Ok(updatedPoint);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao atualizar ponto de reciclagem: {ex.Message}");
        }
    }

    [HttpGet]
    [Route("getall")]
    public async Task<IActionResult> GetAllRecyclePoints()
    {
        try
        {
            var points = await _recyclePointService.GetAllAsync();
            return Ok(points);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao buscar pontos de reciclagem: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    [Route("get/{id}")]
    public async Task<IActionResult> GetRecyclePointById(int id)
    {
        try
        {
            var point = await _recyclePointService.GetByIdAsync(id);
            if (point == null)
            {
                return NotFound($"Ponto de reciclagem com ID {id} não encontrado.");
            }

            return Ok(point);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao buscar ponto de reciclagem: {ex.Message}");
        }
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetRecyclePointByUserId(Guid userId)
    {
        try
        {
            var points = await _recyclePointService.GetByUserIdAsync(userId);
            return Ok(points);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao buscar pontos de reciclagem por usuário: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    [Route("delete/{id}")]
    public async Task<IActionResult> DeleteRecyclePoint(int id)
    {
        try
        {
            var result = await _recyclePointService.DeleteAsync(id);
            if (!result)
            {
                return NotFound($"Ponto de reciclagem com ID {id} não encontrado.");
            }

            return Ok($"Ponto de reciclagem com ID {id} deletado com sucesso.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao deletar ponto de reciclagem: {ex.Message}");
        }
    }

    [HttpGet]
    [Route("getbydetails")]
    public async Task<IActionResult> GetRecyclePointByDetails([FromBody] RecyclePointGetDetailDto dto)
    {
        try
        {
            if(string.IsNullOrWhiteSpace(dto.Name)
               && string.IsNullOrWhiteSpace(dto.City)
               && string.IsNullOrWhiteSpace(dto.State)
               && string.IsNullOrWhiteSpace(dto.Address)
               && string.IsNullOrWhiteSpace(dto.Neighborhood)
               && string.IsNullOrWhiteSpace(dto.ZipCode)
               && (dto.RecycleMaterialIds == null || dto.RecycleMaterialIds.Count == 0)
               )
            {
                return BadRequest("Obrigatório informar ao menos um detalhe para busca do ponto de reciclagem.");
            }

            var recyclePoints = await _recyclePointService.GetByDetail(dto);
            return Ok(recyclePoints);
        }
        catch(Exception ex)
        {
            return StatusCode(500, $"Erro ao obter pontos de reciclagem por detalhes: {ex.Message}");
        }
    }

    [HttpPost]
    [Route("addmaterial")]
    public async Task<IActionResult> AddMaterialToRecyclePoint([FromBody] RecyclePointMaterial recyclePointMaterial)
    {
        try
        {
            if (recyclePointMaterial == null)
            {
                return BadRequest("Obrigatório informar os dados para vínculo do ponto de reciclagem ao material.");
            }

            var errorMessage = recyclePointMaterial.Validate();
            if (!string.IsNullOrEmpty(errorMessage))
            {
                return BadRequest(errorMessage);
            }

            var createdPointMaterial = await _recyclePointMaterialService.CreateAsync(recyclePointMaterial);
            return CreatedAtAction(nameof(AddMaterialToRecyclePoint), createdPointMaterial);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao criar vínculo de ponto de reciclagem ao material: {ex.Message}");
        }
    }

    [HttpDelete("deletematerial/{id}")]
    public async Task<IActionResult> DeleteMaterialFromRecyclePoint(int id)
    {
        try
        {
            var result = await _recyclePointMaterialService.DeleteAsync(id);
            if (!result)
            {
                return NotFound($"Vínculo de ponto de reciclagem ao material com ID {id} não encontrado.");
            }

            return Ok($"Vínculo de ponto de reciclagem ao material com ID {id} deletado com sucesso.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao deletar vínculo de ponto de reciclagem ao material: {ex.Message}");
        }
    }

    [HttpGet("getmaterial/{recyclePointId}")]
    public async Task<IActionResult> GetMaterialsByRecyclePointId(int recyclePointId)
    {
        try
        {
            if(recyclePointId <= 0)
            {
                return BadRequest("Obrigatório informar um ID válido.");
            }

            var materials = await _recyclePointMaterialService.GetByRecyclePointIdAsync(recyclePointId);
            return Ok(materials);
        }
        catch(Exception ex)
        {
            return StatusCode(500, $"Erro ao obter materiais a partir de ponto de reciclagem: {ex.Message}");
        }
    }
}
