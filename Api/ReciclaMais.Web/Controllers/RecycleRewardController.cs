using Microsoft.AspNetCore.Mvc;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Services.Interfaces;

namespace ReciclaMais.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecycleRewardController : ControllerBase
{
    private readonly IRecycleRewardService _recycleRewardService;

    public RecycleRewardController(IRecycleRewardService recycleRewardService)
    {
        _recycleRewardService = recycleRewardService;
    }

    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> CreateRecycleReward([FromBody] RecycleReward recycleReward)
    {
        try
        {
            if (recycleReward == null)
            {
                return BadRequest("Obrigatório informar os dados do prêmio.");
            }

            var errorMessage = recycleReward.Validate();
            if (!string.IsNullOrEmpty(errorMessage))
            {
                return BadRequest(errorMessage);
            }

            var createdPoint = await _recycleRewardService.CreateAsync(recycleReward);
            return CreatedAtAction(nameof(CreateRecycleReward), createdPoint);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao criar prêmio: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    [Route("update/{id}")]
    public async Task<IActionResult> UpdateRecycleReward(int id, [FromBody] RecycleReward recycleReward)
    {
        try
        {
            if (recycleReward == null)
            {
                return BadRequest("Obrigatório informar os dados do prêmio.");
            }

            var updatedPoint = await _recycleRewardService.UpdateAsync(id, recycleReward);
            if (updatedPoint == null)
            {
                return NotFound($"Prêmio com ID {id} não encontrado.");
            }

            return Ok(updatedPoint);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao atualizar prêmio: {ex.Message}");
        }
    }

    [HttpGet]
    [Route("getall")]
    public async Task<IActionResult> GetAllRecycleRewards()
    {
        try
        {
            var points = await _recycleRewardService.GetAllAsync();
            return Ok(points);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao buscar prêmios: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    [Route("get/{id}")]
    public async Task<IActionResult> GetRecycleRewardById(int id)
    {
        try
        {
            var point = await _recycleRewardService.GetByIdAsync(id);
            if (point == null)
            {
                return NotFound($"Prêmio com ID {id} não encontrado.");
            }

            return Ok(point);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao buscar prêmio: {ex.Message}");
        }
    }

    [HttpGet("store/{storeId}")]
    public async Task<IActionResult> GetRecycleRewardByStoreId(Guid storeId)
    {
        try
        {
            var rewards = await _recycleRewardService.GetByStoreIdAsync(storeId);
            return Ok(rewards);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao buscar prêmios por loja: {ex.Message}");
        }
    }

    [HttpGet("partner/{partnerId}")]
    public async Task<IActionResult> GetRecycleRewardByPartnerId(Guid partnerId)
    {
        try
        {
            var rewards = await _recycleRewardService.GetByPartnerIdAsync(partnerId);
            return Ok(rewards);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao buscar prêmios por parceiro: {ex.Message}");
        }
    }

    [HttpGet]
    [Route("getbyname")]
    public async Task<IActionResult> GetRecycleRewardByName(string? name, Guid? storeId, Guid? partnerId)
    {
        try
        {
            if(string.IsNullOrWhiteSpace(name))
            {
                return BadRequest("Nome do prêmio é obrigatório.");
            }
            if((storeId is null && partnerId is null)
                || (storeId == Guid.Empty && partnerId == Guid.Empty))
            {
                return BadRequest("É obrigatório informar o ID da loja ou do parceiro.");
            }

            var rewards = await _recycleRewardService.GetAllByNameAsync(name, storeId, partnerId);
            return Ok(rewards);
        }
        catch(Exception ex)
        {
            return StatusCode(500, $"Erro ao obter prêmios por nome: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    [Route("delete/{id}")]
    public async Task<IActionResult> DeleteRecycleReward(int id)
    {
        try
        {
            var result = await _recycleRewardService.DeleteAsync(id);
            if (!result)
            {
                return NotFound($"Prêmio com ID {id} não encontrado.");
            }

            return Ok($"Prêmio com ID {id} deletado com sucesso.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao deletar prêmio: {ex.Message}");
        }
    }
}
