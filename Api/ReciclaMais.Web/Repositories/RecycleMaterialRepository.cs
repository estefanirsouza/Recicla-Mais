using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ReciclaMais.Web.Data;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Repositories.Interfaces;

namespace ReciclaMais.Web.Repositories;

public class RecycleMaterialRepository : IRecycleMaterialRepository
{
    private readonly ApplicationDbContext _context;

    public RecycleMaterialRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<RecycleMaterial> CreateAsync(RecycleMaterial entity)
    {
        await _context.RecycleMaterials.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var recycleMaterial = await _context.RecycleMaterials.FindAsync(id);
        if (recycleMaterial == null)
        {
            return false;
        }

        _context.RecycleMaterials.Remove(recycleMaterial);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<RecycleMaterial>> GetAllAsync()
    {
        return await _context.RecycleMaterials.ToListAsync();
    }

    public async Task<RecycleMaterial?> GetByIdAsync(int id)
    {
        return await _context.RecycleMaterials.FindAsync(id);
    }

    public async Task<IEnumerable<RecycleMaterial>> GetAllByNameAsync(string name)
    {
        return await _context.RecycleMaterials
            .Where(rm => rm.Name != null && EF.Functions.Like(rm.Name, $"%{name}%"))
            .ToListAsync();
    }

    public async Task<RecycleMaterial?> UpdateAsync(int id, RecycleMaterial entity)
    {
        var recycleMaterial = await _context.RecycleMaterials.FindAsync(id);
        if (recycleMaterial == null)
        {
            return null;
        }

        if(!string.IsNullOrWhiteSpace(entity.Name))
            recycleMaterial.Name = entity.Name;

        if(!string.IsNullOrWhiteSpace(entity.Description))
            recycleMaterial.Description = entity.Description;

        if(!string.IsNullOrWhiteSpace(entity.IconImageBase64))
            recycleMaterial.IconImage = Convert.FromBase64String(entity.IconImageBase64);

        _context.RecycleMaterials.Update(recycleMaterial);
        await _context.SaveChangesAsync();
        return recycleMaterial;
    }
}