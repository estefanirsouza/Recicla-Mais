using ReciclaMais.Web.Models;
using ReciclaMais.Web.Repositories.Interfaces;
using ReciclaMais.Web.Services.Interfaces;

namespace ReciclaMais.Web.Services;

public class RecyclePointService : IRecyclePointService
{
    private readonly IRecyclePointRepository _recyclePointRepository;

    public RecyclePointService(IRecyclePointRepository recyclePointRepository)
    {
        _recyclePointRepository = recyclePointRepository;
    }

    public async Task<RecyclePoint> CreateAsync(RecyclePoint entity)
    {
        entity.DateInsert = DateTime.UtcNow;
        return await _recyclePointRepository.CreateAsync(entity);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _recyclePointRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<RecyclePoint>> GetAllAsync()
    {
        return await _recyclePointRepository.GetAllAsync();
    }

    public async Task<IEnumerable<RecyclePoint>> GetByDetail(RecyclePointGetDetailDto dto)
    {
        return await _recyclePointRepository.GetByDetail(dto);
    }

    public async Task<RecyclePoint?> GetByIdAsync(int id)
    {
        return await _recyclePointRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<RecyclePoint>> GetByUserIdAsync(Guid userId)
    {
        return await _recyclePointRepository.GetByUserIdAsync(userId);
    }

    public async Task<RecyclePoint?> UpdateAsync(int id, RecyclePoint entity)
    {
        entity.DateUpdate = DateTime.UtcNow;
        return await _recyclePointRepository.UpdateAsync(id, entity);
    }
}
