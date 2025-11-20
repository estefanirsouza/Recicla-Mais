using Microsoft.EntityFrameworkCore;
using ReciclaMais.Web.Data;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Repositories.Interfaces;

namespace ReciclaMais.Web.Repositories;

public class RecycleRewardRepository : IRecycleRewardRepository
{
    private readonly ApplicationDbContext _context;

    public RecycleRewardRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<RecycleReward> CreateAsync(RecycleReward entity)
    {
        await _context.RecycleRewards.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var recycleReward = await _context.RecycleRewards.FindAsync(id);
        if (recycleReward == null)
        {
            return false;
        }

        _context.RecycleRewards.Remove(recycleReward);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<RecycleReward>> GetAllAsync()
    {
        return await _context.RecycleRewards.ToListAsync();
    }

    public async Task<RecycleReward?> GetByIdAsync(int id)
    {
        return await _context.RecycleRewards.FindAsync(id);
    }

    public async Task<IEnumerable<RecycleReward>> GetByStoreIdAsync(Guid storeId)
    {
        return await _context.RecycleRewards
            .Where(rp => rp.UserStoreId == storeId)
            .ToListAsync();
    }

    public async Task<IEnumerable<RecycleReward>> GetByPartnerIdAsync(Guid partnerId)
    {
        return await _context.RecycleRewards
            .Where(rp => rp.UserPartnerId == partnerId)
            .ToListAsync();
    }

    public async Task<RecycleReward?> UpdateAsync(int id, RecycleReward entity)
    {
        var recycleReward = await _context.RecycleRewards.FindAsync(id);
        if (recycleReward == null)
        {
            return null;
        }

        if (!string.IsNullOrWhiteSpace(entity.Name))
            recycleReward.Name = entity.Name;

        if (!string.IsNullOrWhiteSpace(entity.Description))
            recycleReward.Description = entity.Description;

        if (!string.IsNullOrWhiteSpace(entity.Address))
            recycleReward.Address = entity.Address;

        if (!string.IsNullOrWhiteSpace(entity.Neighborhood))
            recycleReward.Neighborhood = entity.Neighborhood;

        if (!string.IsNullOrWhiteSpace(entity.City))
            recycleReward.City = entity.City;

        if (!string.IsNullOrWhiteSpace(entity.State))
            recycleReward.State = entity.State;

        if (!string.IsNullOrWhiteSpace(entity.ZipCode))
            recycleReward.ZipCode = entity.ZipCode;

        if (!string.IsNullOrWhiteSpace(entity.PhoneNumber))
            recycleReward.PhoneNumber = entity.PhoneNumber;

        if (entity.DefaultValidDays > 0)
            recycleReward.DefaultValidDays = entity.DefaultValidDays;

        recycleReward.DateUpdate = entity.DateUpdate;

        await _context.SaveChangesAsync();
        return recycleReward;
    }

    public async Task<IEnumerable<RecycleReward>> GetAllByNameAsync(string name, Guid? storeId, Guid? partnerId)
    {
        return await _context.RecycleRewards
            .Where(rr => (rr.Name != null && EF.Functions.Like(rr.Name, $"%{name}%")) &&
                         (!storeId.HasValue || rr.UserStoreId == storeId.Value) &&
                         (!partnerId.HasValue || rr.UserPartnerId == partnerId.Value)
                  )
            .ToListAsync();        
    }
}
