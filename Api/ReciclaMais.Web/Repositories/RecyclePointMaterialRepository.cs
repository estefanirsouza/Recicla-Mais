using Microsoft.EntityFrameworkCore;
using ReciclaMais.Web.Data;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Repositories.Interfaces;

namespace ReciclaMais.Web.Repositories;

public class RecyclePointMaterialRepository : IRecyclePointMaterialRepository
{
    private readonly ApplicationDbContext _context;

    public RecyclePointMaterialRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<RecyclePointMaterial> CreateAsync(RecyclePointMaterial entity)
    {
        await _context.RecyclePointMaterials.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var recyclePointMaterial = await _context.RecyclePointMaterials.FindAsync(id);
        if (recyclePointMaterial == null)
        {
            return false;
        }

        _context.RecyclePointMaterials.Remove(recyclePointMaterial);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<RecyclePointMaterial>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<RecyclePointMaterial?> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<List<RecyclePointMaterial>> GetByRecyclePointIdAsync(int recyclePointId)
    {
        return await _context.RecyclePointMaterials
            .Where(rpm => rpm.RecyclePointId == recyclePointId)
            .ToListAsync();
    }

    public Task<RecyclePointMaterial?> UpdateAsync(int id, RecyclePointMaterial entity)
    {
        throw new NotImplementedException();
    }
}
