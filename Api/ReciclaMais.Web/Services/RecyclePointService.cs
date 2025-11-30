using Microsoft.AspNetCore.Http.HttpResults;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Repositories.Interfaces;
using ReciclaMais.Web.Services.Interfaces;

namespace ReciclaMais.Web.Services;

public class RecyclePointService : IRecyclePointService
{
    private readonly IRecyclePointRepository _recyclePointRepository;
    private readonly IRecyclePointMaterialService _recyclePointMaterialService;

    public RecyclePointService(IRecyclePointRepository recyclePointRepository, IRecyclePointMaterialService recyclePointMaterialService)
    {
        _recyclePointRepository = recyclePointRepository;
        _recyclePointMaterialService = recyclePointMaterialService;
    }

    public async Task<RecyclePoint> CreateAsync(RecyclePoint entity)
    {
        entity.DateInsert = DateTime.UtcNow.AddHours(-3);
        var createdEntity = await _recyclePointRepository.CreateAsync(entity);

        if(entity.RecycleMaterialIds != null && entity.RecycleMaterialIds.Count > 0)
        {
            foreach(var materialId in entity.RecycleMaterialIds)
            {
                var recyclePointMaterial = new RecyclePointMaterial
                {
                    RecyclePointId = createdEntity.RecyclePointId,
                    RecycleMaterialId = materialId,
                    DateInsert = DateTime.UtcNow.AddHours(-3)
                };
                
                await _recyclePointMaterialService.CreateAsync(recyclePointMaterial);
            }
        }

        return createdEntity;
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
        entity.DateUpdate = DateTime.UtcNow.AddHours(-3);
        return await _recyclePointRepository.UpdateAsync(id, entity);
    }
}
