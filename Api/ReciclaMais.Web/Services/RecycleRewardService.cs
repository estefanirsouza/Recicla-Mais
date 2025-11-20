using ReciclaMais.Web.Models;
using ReciclaMais.Web.Repositories.Interfaces;
using ReciclaMais.Web.Services.Interfaces;

namespace ReciclaMais.Web.Services;

public class RecycleRewardService : IRecycleRewardService
{
    private readonly IRecycleRewardRepository _recycleRewardRepository;

    public RecycleRewardService(IRecycleRewardRepository recycleRewardRepository)
    {
        _recycleRewardRepository = recycleRewardRepository;
    }

    public async Task<RecycleReward> CreateAsync(RecycleReward entity)
    {
        entity.DateInsert = DateTime.UtcNow;
        return await _recycleRewardRepository.CreateAsync(entity);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _recycleRewardRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<RecycleReward>> GetAllAsync()
    {
        return await _recycleRewardRepository.GetAllAsync();
    }

    public async Task<RecycleReward?> GetByIdAsync(int id)
    {
        return await _recycleRewardRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<RecycleReward>> GetByStoreIdAsync(Guid storeId)
    {
        return await _recycleRewardRepository.GetByStoreIdAsync(storeId);
    }

    public async Task<IEnumerable<RecycleReward>> GetByPartnerIdAsync(Guid partnerId)
    {
        return await _recycleRewardRepository.GetByPartnerIdAsync(partnerId);
    }

    public async Task<RecycleReward?> UpdateAsync(int id, RecycleReward entity)
    {
        entity.DateUpdate = DateTime.UtcNow;
        return await _recycleRewardRepository.UpdateAsync(id, entity);
    }

    public async Task<IEnumerable<RecycleReward>> GetAllByNameAsync(string name, Guid? storeId, Guid? partnerId)
    {
        return await _recycleRewardRepository.GetAllByNameAsync(name, storeId, partnerId);
    }
}
