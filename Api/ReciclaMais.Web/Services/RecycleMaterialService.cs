using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Repositories.Interfaces;
using ReciclaMais.Web.Services.Interfaces;

namespace ReciclaMais.Web.Services;

public class RecycleMaterialService : IRecycleMaterialService
{
    private readonly IRecycleMaterialRepository _recycleMaterialRepository;

    public RecycleMaterialService(IRecycleMaterialRepository recycleMaterialRepository)
    {
        _recycleMaterialRepository = recycleMaterialRepository;
    }

    public async Task<RecycleMaterial> CreateAsync(RecycleMaterial entity)
    {
        entity.DateInsert = DateTime.UtcNow.AddHours(-3);
        if (!string.IsNullOrEmpty(entity.IconImageBase64))
        {
            entity.IconImage = Convert.FromBase64String(entity.IconImageBase64);
        }

        return await _recycleMaterialRepository.CreateAsync(entity);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _recycleMaterialRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<RecycleMaterial>> GetAllAsync()
    {
        return await _recycleMaterialRepository.GetAllAsync();
    }

    public async Task<RecycleMaterial?> GetByIdAsync(int id)
    {
        return await _recycleMaterialRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<RecycleMaterial>> GetAllByNameAsync(string name)
    {
        return await _recycleMaterialRepository.GetAllByNameAsync(name);
    }

    public async Task<RecycleMaterial?> UpdateAsync(int id, RecycleMaterial entity)
    {
        entity.DateUpdate = DateTime.UtcNow.AddHours(-3);

        return await _recycleMaterialRepository.UpdateAsync(id, entity);
    }
}

