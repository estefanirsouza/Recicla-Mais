using Microsoft.AspNetCore.Mvc;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Models.DTOs;
using ReciclaMais.Web.Services.Interfaces;

namespace ReciclaMais.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserRewardController : ControllerBase
{
    private readonly IUserRewardService _userRewardService;

    public UserRewardController(IUserRewardService userRewardService)
    {
        _userRewardService = userRewardService;
    }

    [HttpPost]
    [Route("generate")]
    public async Task<IActionResult> GenerateUserReward([FromBody] UserReward userReward)
    {
        try
        {
            if (userReward == null)
            {
                return BadRequest("Obrigatório informar os dados do prêmio do usuário.");
            }

            var errorMessage = userReward.Validate();
            if (!string.IsNullOrEmpty(errorMessage))
            {
                return BadRequest(errorMessage);
            }

            var createdUserReward = await _userRewardService.CreateAsync(userReward);
            return CreatedAtAction(nameof(GenerateUserReward), createdUserReward);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao criar prêmio de usuário: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    [Route("update/{id}")]
    public async Task<IActionResult> UpdateUserReward(int id, [FromBody] UserReward userReward)
    {
        try
        {
            if (userReward == null)
            {
                return BadRequest("Obrigatório informar os dados do prêmio.");
            }

            var updatedPoint = await _userRewardService.UpdateAsync(id, userReward);
            if (updatedPoint == null)
            {
                return NotFound($"Prêmio de Usuário com ID {id} não encontrado.");
            }

            return Ok(updatedPoint);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao atualizar prêmio de usuário: {ex.Message}");
        }
    }

    [HttpGet]
    [Route("getall")]
    public async Task<IActionResult> GetAllUserRewards()
    {
        try
        {
            var points = await _userRewardService.GetAllAsync();
            return Ok(points);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao buscar prêmios de usuário: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    [Route("get/{id}")]
    public async Task<IActionResult> GetUserRewardById(int id)
    {
        try
        {
            var point = await _userRewardService.GetByIdAsync(id);
            if (point == null)
            {
                return NotFound($"Prêmio de Usuário com ID {id} não encontrado.");
            }

            return Ok(point);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao buscar prêmio de usuário: {ex.Message}");
        }
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetUserRewardByUserId(Guid userId)
    {
        try
        {
            var rewards = await _userRewardService.GetByUserIdAsync(userId);
            return Ok(rewards);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao buscar prêmios de usuário por usuário: {ex.Message}");
        }
    }

    [HttpGet("store/{storeId}")]
    public async Task<IActionResult> GetUserRewardByStoreId(Guid storeId)
    {
        try
        {
            var rewards = await _userRewardService.GetByStoreIdAsync(storeId);
            return Ok(rewards);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao buscar prêmios de usuário por loja: {ex.Message}");
        }
    }

    [HttpGet("partner/{partnerId}")]
    public async Task<IActionResult> GetUserRewardByPartnerId(Guid partnerId)
    {
        try
        {
            var rewards = await _userRewardService.GetByPartnerIdAsync(partnerId);
            return Ok(rewards);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao buscar prêmios de usuário por parceiro: {ex.Message}");
        }
    }

    [HttpPost("validatetoken")]
    public async Task<IActionResult> ValidateUserToken([FromBody] ValidateTokenDto validateToken)
    {
        try
        {
            if (validateToken == null)
            {
                return BadRequest("Obrigatório informar os dados do token.");
            }

            var errorMessage = validateToken.Validate();
            if (!string.IsNullOrEmpty(errorMessage))
            {
                return BadRequest(errorMessage);
            }

            await _userRewardService.ValidateUserToken(validateToken);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao validar token de usuário: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    [Route("delete/{id}")]
    public async Task<IActionResult> DeleteUserReward(int id)
    {
        try
        {
            var result = await _userRewardService.DeleteAsync(id);
            if (!result)
            {
                return NotFound($"Prêmio de Usuário com ID {id} não encontrado.");
            }

            return Ok($"Prêmio de Usuário com ID {id} deletado com sucesso.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao deletar prêmio de usuário: {ex.Message}");
        }
    }
}
