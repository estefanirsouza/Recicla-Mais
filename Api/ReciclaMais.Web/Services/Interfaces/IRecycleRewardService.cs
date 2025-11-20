using ReciclaMais.Web.Models;

namespace ReciclaMais.Web.Services.Interfaces;

public interface IRecycleRewardService : IService<RecycleReward>
{
    Task<IEnumerable<RecycleReward>> GetByStoreIdAsync(Guid storeId);
    Task<IEnumerable<RecycleReward>> GetByPartnerIdAsync(Guid partnerId);
    Task<IEnumerable<RecycleReward>> GetAllByNameAsync(string name, Guid? storeId, Guid? partnerId);
}
