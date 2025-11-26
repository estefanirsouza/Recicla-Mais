using ReciclaMais.Web.Models;
using ReciclaMais.Web.Models.DTOs;

namespace ReciclaMais.Web.Repositories.Interfaces;

public interface IUserRepository
{
    Task<UserDto?> GetByIdAsync(string userId); 
    Task<IEnumerable<UserDto>> GetAllAsync(); 
}
