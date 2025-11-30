using ReciclaMais.Web.Models;
using ReciclaMais.Web.Repositories.Interfaces;
using ReciclaMais.Web.Services.Interfaces;

namespace ReciclaMais.Web.Services;

public class RecyclePointMaterialService : IRecyclePointMaterialService
{
    private readonly IRecyclePointMaterialRepository _recyclePointMaterialRepository;

    public RecyclePointMaterialService(IRecyclePointMaterialRepository recyclePointMaterialRepository)
    {
        _recyclePointMaterialRepository = recyclePointMaterialRepository;
    }

    public async Task<RecyclePointMaterial> CreateAsync(RecyclePointMaterial entity)
    {
        entity.DateInsert = DateTime.UtcNow.AddHours(-3);
        return await _recyclePointMaterialRepository.CreateAsync(entity);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _recyclePointMaterialRepository.DeleteAsync(id);
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
        return await _recyclePointMaterialRepository.GetByRecyclePointIdAsync(recyclePointId);
    }

    public Task<RecyclePointMaterial?> UpdateAsync(int id, RecyclePointMaterial entity)
    {
        throw new NotImplementedException();
    }
}
