using Microsoft.AspNetCore.Mvc;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Services.Interfaces;

namespace ReciclaMais.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecyclePointController : ControllerBase
{
    private readonly IRecyclePointService _recyclePointService;

    public RecyclePointController(IRecyclePointService recyclePointService)
    {
        _recyclePointService = recyclePointService;
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
}
