using ReciclaMais.Web.Models;
using ReciclaMais.Web.Models.DTOs;
using ReciclaMais.Web.Repositories.Interfaces;
using ReciclaMais.Web.Services.Interfaces;

namespace ReciclaMais.Web.Services;

public class UserRewardService : IUserRewardService
{
    private readonly IUserRewardRepository _userRewardRepository;
    private readonly IRecycleRewardRepository _recycleRewardRepository;

    public UserRewardService(IUserRewardRepository userRewardRepository, IRecycleRewardRepository recycleRewardRepository)
    {
        _userRewardRepository = userRewardRepository;
        _recycleRewardRepository = recycleRewardRepository;
    }

    public async Task<UserReward> CreateAsync(UserReward entity)
    {
        var recycleReward = await _recycleRewardRepository.GetByIdAsync(entity.RecycleRewardId);
        if(recycleReward == null)
        {
            throw new Exception("Prêmio não encontrado.");
        }

        // Generate a random token always with 5 characters including letters and numbers
        var token = GenerateRandomToken(5);
        entity.Token = token;
        entity.DateValid = DateTime.UtcNow.AddHours(-3).AddDays(recycleReward.DefaultValidDays ?? 0);
        entity.DateInsert = DateTime.UtcNow.AddHours(-3);

        return await _userRewardRepository.CreateAsync(entity);
    }
    
    private string GenerateRandomToken(int length)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var random = new Random();
        return new string(Enumerable.Repeat(chars, length)
          .Select(s => s[random.Next(s.Length)]).ToArray());
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _userRewardRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<UserReward>> GetAllAsync()
    {
        return await _userRewardRepository.GetAllAsync();
    }

    public async Task<UserReward?> GetByIdAsync(int id)
    {
        return await _userRewardRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<UserReward>> GetByUserIdAsync(Guid userId)
    {
        return await _userRewardRepository.GetByUserIdAsync(userId);
    }

    public async Task<IEnumerable<UserReward>> GetByStoreIdAsync(Guid storeId)
    {
        return await _userRewardRepository.GetByStoreIdAsync(storeId);
    }

    public async Task<IEnumerable<UserReward>> GetByPartnerIdAsync(Guid partnerId)
    {
        return await _userRewardRepository.GetByPartnerIdAsync(partnerId);
    }

    public async Task<UserReward?> UpdateAsync(int id, UserReward entity)
    {
        entity.DateUpdate = DateTime.UtcNow.AddHours(-3);
        return await _userRewardRepository.UpdateAsync(id, entity);
    }

    public async Task ValidateUserToken(ValidateTokenDto validateToken)
    {
        var userReward = await _userRewardRepository.GetByValidateTokenAsync(validateToken);
        if(userReward == null)
        {
            throw new Exception("Não foi possível localizar um Token válido.");
        }
        if(userReward.DateValid != null && userReward.DateValid < DateTime.UtcNow.AddHours(-3))
        {
            throw new Exception("Token expirado.");
        }

        userReward.TokenUsed = true;
        await UpdateAsync(userReward.UserRewardId, userReward);
    }
}
