using Microsoft.AspNetCore.Identity;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Models.DTOs;
using ReciclaMais.Web.Repositories.Interfaces;
using ReciclaMais.Web.Services.Interfaces;

namespace ReciclaMais.Web.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly UserManager<ApplicationUser> _userManager;

    public UserService(IUserRepository userRepository, UserManager<ApplicationUser> userManager)
    {
        _userRepository = userRepository;
        _userManager = userManager;
    }

    public async Task<IEnumerable<UserDto>> GetAllAsync()
    {
        var users = await _userRepository.GetAllAsync();
        foreach (var user in users)
        {
            var roles = await _userManager.GetRolesAsync(new ApplicationUser { Id = user.Id!});
            user.Roles = roles;
        }

        return users;
    }

    public async Task<UserDto?> GetByIdAsync(string userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user != null)
        {
            var roles = await _userManager.GetRolesAsync(new ApplicationUser { Id = user.Id!});
            user.Roles = roles;
        }

        return user;
    }
}
