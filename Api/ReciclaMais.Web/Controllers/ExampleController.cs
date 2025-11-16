using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ReciclaMais.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // Requires authentication
public class ExampleController : ControllerBase
{
    [HttpGet("public")]
    [AllowAnonymous] // This endpoint doesn't require authentication
    public IActionResult PublicEndpoint()
    {
        return Ok(new { message = "This is a public endpoint" });
    }

    [HttpGet("authenticated")]
    // Requires any authenticated user
    public IActionResult AuthenticatedEndpoint()
    {
        return Ok(new { 
            message = "This endpoint requires authentication",
            user = User.Identity?.Name,
            email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value
        });
    }

    [HttpGet("admin-only")]
    [Authorize(Roles = "Admin")] // Only Admin role can access
    public IActionResult AdminOnlyEndpoint()
    {
        return Ok(new { message = "This endpoint is only accessible by Admin users" });
    }

    [HttpGet("partner-or-store")]
    [Authorize(Roles = "Partner,Store")] // Partner OR Store roles can access
    public IActionResult PartnerOrStoreEndpoint()
    {
        return Ok(new { message = "This endpoint is accessible by Partner or Store users" });
    }
}

