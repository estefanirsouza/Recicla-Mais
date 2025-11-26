using ReciclaMais.Web.Models;
using ReciclaMais.Web.Models.DTOs;

namespace ReciclaMais.Web.Services.Interfaces;

public interface IUserService
{
    Task<UserDto?> GetByIdAsync(string userId); 
    Task<IEnumerable<UserDto>> GetAllAsync(); 
}
