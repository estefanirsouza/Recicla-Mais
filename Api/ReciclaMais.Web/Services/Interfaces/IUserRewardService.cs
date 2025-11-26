using ReciclaMais.Web.Models;
using ReciclaMais.Web.Models.DTOs;

namespace ReciclaMais.Web.Services.Interfaces;

public interface IUserRewardService : IService<UserReward>
{
    Task<IEnumerable<UserReward>> GetByUserIdAsync(Guid userId);
    Task<IEnumerable<UserReward>> GetByStoreIdAsync(Guid storeId);
    Task<IEnumerable<UserReward>> GetByPartnerIdAsync(Guid partnerId);
    Task ValidateUserToken(ValidateTokenDto validateToken);
}
