using Microsoft.EntityFrameworkCore;
using ReciclaMais.Web.Data;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Models.DTOs;
using ReciclaMais.Web.Repositories.Interfaces;

namespace ReciclaMais.Web.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<UserDto>> GetAllAsync()
    {
        var users = await _context.Users
            .Select(u => new UserDto
            {
                Id = u.Id,
                Name = u.Name,
                Surname = u.Surname,
                UserName = u.UserName,
                Email = u.Email
            }).ToListAsync();

        return users;
    }

    public async Task<UserDto?> GetByIdAsync(string userId)
    {
        var user = await _context.Users.Where(u => u.Id == userId)
            .Select(u => new UserDto
            {
                Id = u.Id,
                Name = u.Name,
                Surname = u.Surname,
                UserName = u.UserName,
                Email = u.Email
            }).FirstOrDefaultAsync();

        return user;
    }
}
