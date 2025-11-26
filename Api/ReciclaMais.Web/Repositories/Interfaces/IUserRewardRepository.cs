using ReciclaMais.Web.Models;
using ReciclaMais.Web.Models.DTOs;

namespace ReciclaMais.Web.Repositories.Interfaces;

public interface IUserRewardRepository : IRepository<UserReward>
{
    Task<IEnumerable<UserReward>> GetByUserIdAsync(Guid userId);
    Task<IEnumerable<UserReward>> GetByStoreIdAsync(Guid storeId);
    Task<IEnumerable<UserReward>> GetByPartnerIdAsync(Guid partnerId);
    Task<UserReward?> GetByValidateTokenAsync(ValidateTokenDto validateToken);
}
