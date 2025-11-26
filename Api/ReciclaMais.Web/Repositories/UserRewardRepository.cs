using Microsoft.EntityFrameworkCore;
using ReciclaMais.Web.Data;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Models.DTOs;
using ReciclaMais.Web.Repositories.Interfaces;

namespace ReciclaMais.Web.Repositories;

public class UserRewardRepository : IUserRewardRepository
{
    private readonly ApplicationDbContext _context;

    public UserRewardRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<UserReward> CreateAsync(UserReward entity)
    {
        await _context.UserRewards.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var userReward = await _context.UserRewards.FindAsync(id);
        if (userReward == null)
        {
            return false;
        }

        _context.UserRewards.Remove(userReward);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<UserReward>> GetAllAsync()
    {
        return await _context.UserRewards.ToListAsync();
    }

    public async Task<UserReward?> GetByIdAsync(int id)
    {
        return await _context.UserRewards.FindAsync(id);
    }

    public async Task<IEnumerable<UserReward>> GetByUserIdAsync(Guid userId)
    {
        return await _context.UserRewards
            .Where(rp => rp.UserId == userId)
            .ToListAsync();
    }

    public async Task<IEnumerable<UserReward>> GetByStoreIdAsync(Guid storeId)
    {
        return await _context.UserRewards
            .Join(
                _context.RecycleRewards,
                userReward => userReward.RecycleRewardId,
                recycleReward => recycleReward.RecycleRewardId,
                (userReward, recycleReward) => new { userReward, recycleReward }
            )
            .Where(x => x.recycleReward.UserStoreId == storeId)
            .Select(x => x.userReward)
            .ToListAsync();
    }

    public async Task<IEnumerable<UserReward>> GetByPartnerIdAsync(Guid partnerId)
    {
        return await _context.UserRewards
            .Join(
                _context.RecycleRewards,
                userReward => userReward.RecycleRewardId,
                recycleReward => recycleReward.RecycleRewardId,
                (userReward, recycleReward) => new { userReward, recycleReward }
            )
            .Where(x => x.recycleReward.UserPartnerId == partnerId)
            .Select(x => x.userReward)
            .ToListAsync();
    }

    public async Task<UserReward?> UpdateAsync(int id, UserReward entity)
    {
        var userReward = await _context.UserRewards.FindAsync(id);
        if (userReward == null)
        {
            return null;
        }

        if (!string.IsNullOrWhiteSpace(entity.Token))
            userReward.Token = entity.Token;

        if (entity.DateValid != null)
            userReward.DateValid = entity.DateValid;

        if (entity.TokenUsed != null)
            userReward.TokenUsed = entity.TokenUsed;

        userReward.DateUpdate = entity.DateUpdate;

        await _context.SaveChangesAsync();
        return userReward;
    }

    public async Task<UserReward?> GetByValidateTokenAsync(ValidateTokenDto validateToken)
    {
        return await _context.UserRewards
            .Join(
                _context.RecycleRewards,
                userReward => userReward.RecycleRewardId,
                recycleReward => recycleReward.RecycleRewardId,
                (userReward, recycleReward) => new { userReward, recycleReward }
            )
            .Where(ur =>
                (validateToken.StoreId == null || validateToken.StoreId == Guid.Empty || ur.recycleReward.UserStoreId == validateToken.StoreId) &&
                (validateToken.PartnerId == null || validateToken.PartnerId == Guid.Empty || ur.recycleReward.UserPartnerId == validateToken.PartnerId) &&
                (ur.userReward.TokenUsed == null || ur.userReward.TokenUsed == false) &&
                (ur.userReward.Token!.Trim().ToUpper() == validateToken.Token!.Trim().ToUpper()))
            .Select(ur => ur.userReward)
            .FirstOrDefaultAsync();
    }
}
