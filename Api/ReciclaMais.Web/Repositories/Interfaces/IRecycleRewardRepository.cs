using ReciclaMais.Web.Models;

namespace ReciclaMais.Web.Repositories.Interfaces;

public interface IRecycleRewardRepository : IRepository<RecycleReward>
{
    Task<IEnumerable<RecycleReward>> GetByStoreIdAsync(Guid storeId);
    Task<IEnumerable<RecycleReward>> GetByPartnerIdAsync(Guid partnerId);
    Task<IEnumerable<RecycleReward>> GetAllByNameAsync(string name, Guid? storeId, Guid? partnerId);
}
