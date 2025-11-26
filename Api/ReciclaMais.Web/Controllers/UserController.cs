using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Models.DTOs;
using ReciclaMais.Web.Services;
using ReciclaMais.Web.Services.Interfaces;

namespace ReciclaMais.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public UserController(IUserService userService, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userService = userService;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    [HttpGet("getall")]
    public async Task<IActionResult> GetAllRecycleRewards()
    {
        try
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao buscar usuários: {ex.Message}");
        }
    }

    [HttpGet("get/{id}")]
    public async Task<IActionResult> GetRecycleRewardById(string id)
    {
        try
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound($"Usuário com ID {id} não encontrado.");
            }

            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao buscar usuário: {ex.Message}");
        }
    }

    [HttpPost("addrole/{id}")]
    public async Task<IActionResult> AssignRoleToUser(string id, string role)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "Usuário não encontrado" });
        }

        var roleExists = await _roleManager.RoleExistsAsync(role);
        if (!roleExists)
        {
            return NotFound(new { message = "Perfil não encontrado" });
        }

        var result = await _userManager.AddToRoleAsync(user, role);
        if (!result.Succeeded)
        {
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
        }

        return Ok(new { message = "Perfil adicionado com sucesso ao usuário" });
    }

    [HttpPost("removerole/{id}")]
    public async Task<IActionResult> RemoveRoleFromUser(string id, string role)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "Usuário não encontrado" });
        }
        var roleExists = await _roleManager.RoleExistsAsync(role);
        if (!roleExists)
        {
            return NotFound(new { message = "Perfil não encontrado" });
        }
        var result = await _userManager.RemoveFromRoleAsync(user, role);
        if (!result.Succeeded)
        {
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
        }
        return Ok(new { message = "Perfil removido com sucesso do usuário" });
    }

    [HttpPost("delete/{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound($"Usuário com ID {id} não encontrado.");
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
            }

            return Ok(new { message = "Usuário excluído com sucesso" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao excluir usuário: {ex.Message}");
        }
    }
}