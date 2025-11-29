using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Models.DTOs;
using ReciclaMais.Web.Services;

namespace ReciclaMais.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly JwtTokenService _jwtTokenService;
    private readonly RoleManager<IdentityRole> _roleManager;

    public LoginController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        JwtTokenService jwtTokenService,
        RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtTokenService = jwtTokenService;
        _roleManager = roleManager;
    }

    [HttpPost("RegisterUser")]
    public async Task<IActionResult> RegisterUser([FromBody] RegisterRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = new ApplicationUser
        {
            UserName = request.UserName,
            Email = request.Email,
            Name = request.FirstName,
            Surname = request.LastName
        };

        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
        }

        // Validate role exists before assigning
        if (!string.IsNullOrWhiteSpace(request.Role))
        {
            var roleExists = await _roleManager.RoleExistsAsync(request.Role);
            if (!roleExists)
            {
                // If role doesn't exist, assign default "User" role
                await _userManager.AddToRoleAsync(user, "User");
            }
            else
            {
                await _userManager.AddToRoleAsync(user, request.Role);
            }
        }
        else
        {
            // Default role if no role specified
            await _userManager.AddToRoleAsync(user, "User");
        }

        var roles = await _userManager.GetRolesAsync(user);
        var token = _jwtTokenService.GenerateToken(user, roles);

        return Ok(new AuthResponse
        {
            Token = token,
            Expiration = _jwtTokenService.GetTokenExpiration(),
            Email = user.Email ?? string.Empty,
            Name = user.Name,
            Surname = user.Surname,
            Id = user.Id,
            UserName = user.UserName,
            Roles = roles
        });
    }

    [HttpPost("SignIn")]
    public async Task<IActionResult> SignIn([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Try to find user by email first, then by username
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            // If not found by email, try to find by username
            user = await _userManager.FindByNameAsync(request.Email);
        }

        if (user == null)
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: false);

        if (!result.Succeeded)
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }

        var roles = await _userManager.GetRolesAsync(user);
        var token = _jwtTokenService.GenerateToken(user, roles);

        return Ok(new AuthResponse
        {
            Token = token,
            Expiration = _jwtTokenService.GetTokenExpiration(),
            Email = user.Email ?? string.Empty,
            Name = user.Name,
            Surname = user.Surname,
            Id = user.Id,
            UserName = user.UserName,
            Roles = roles
        });
    }

    [HttpGet("role/getall")]
    public async Task<IActionResult> GetAllRoles()
    {
        var roles = await _roleManager.Roles.Select(r => r.Name).ToListAsync();
        return Ok(roles);
    }
}

