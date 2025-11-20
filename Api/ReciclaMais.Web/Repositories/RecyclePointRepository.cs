using Microsoft.EntityFrameworkCore;
using ReciclaMais.Web.Data;
using ReciclaMais.Web.Models;
using ReciclaMais.Web.Repositories.Interfaces;

namespace ReciclaMais.Web.Repositories;

public class RecyclePointRepository : IRecyclePointRepository
{
    private readonly ApplicationDbContext _context;

    public RecyclePointRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<RecyclePoint> CreateAsync(RecyclePoint entity)
    {
        await _context.RecyclePoints.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var recyclePoint = await _context.RecyclePoints.FindAsync(id);
        if (recyclePoint == null)
        {
            return false;
        }

        _context.RecyclePoints.Remove(recyclePoint);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<RecyclePoint>> GetAllAsync()
    {
        return await _context.RecyclePoints.ToListAsync();
    }

    public async Task<IEnumerable<RecyclePoint>> GetByDetail(RecyclePointGetDetailDto dto)
    {
        return await _context.RecyclePoints
            .Where(rp => (string.IsNullOrWhiteSpace(dto.Name) || (rp.Name != null && EF.Functions.Like(rp.Name, $"%{dto.Name}%"))) &&
                         (string.IsNullOrWhiteSpace(dto.Address) || (rp.Address != null && EF.Functions.Like(rp.Address, $"%{dto.Address}%"))) &&
                         (string.IsNullOrWhiteSpace(dto.Neighborhood) || (rp.Neighborhood != null && EF.Functions.Like(rp.Neighborhood, $"%{dto.Neighborhood}%"))) &&
                         (string.IsNullOrWhiteSpace(dto.City) || (rp.City != null && EF.Functions.Like(rp.City, $"%{dto.City}%"))) &&
                         (string.IsNullOrWhiteSpace(dto.State) || (rp.State != null && EF.Functions.Like(rp.State, $"%{dto.State}%"))) &&
                         (string.IsNullOrWhiteSpace(dto.ZipCode) || (rp.ZipCode != null && EF.Functions.Like(rp.ZipCode, $"%{dto.ZipCode}%")))
                  )
            .ToListAsync();
    }

    public async Task<RecyclePoint?> GetByIdAsync(int id)
    {
        return await _context.RecyclePoints.FindAsync(id);
    }

    public async Task<IEnumerable<RecyclePoint>> GetByUserIdAsync(Guid userId)
    {
        return await _context.RecyclePoints
            .Where(rp => rp.UserId == userId)
            .ToListAsync();
    }

    public async Task<RecyclePoint?> UpdateAsync(int id, RecyclePoint entity)
    {
        var recyclePoint = await _context.RecyclePoints.FindAsync(id);
        if (recyclePoint == null)
        {
            return null;
        }

        if (!string.IsNullOrWhiteSpace(entity.Name))
            recyclePoint.Name = entity.Name;

        if (!string.IsNullOrWhiteSpace(entity.Address))
            recyclePoint.Address = entity.Address;

        if (!string.IsNullOrWhiteSpace(entity.Neighborhood))
            recyclePoint.Neighborhood = entity.Neighborhood;

        if (!string.IsNullOrWhiteSpace(entity.City))
            recyclePoint.City = entity.City;

        if (!string.IsNullOrWhiteSpace(entity.State))
            recyclePoint.State = entity.State;

        if (!string.IsNullOrWhiteSpace(entity.ZipCode))
            recyclePoint.ZipCode = entity.ZipCode;

        if (!string.IsNullOrWhiteSpace(entity.PhoneNumber))
            recyclePoint.PhoneNumber = entity.PhoneNumber;

        if (!string.IsNullOrWhiteSpace(entity.WorkingHours))
            recyclePoint.WorkingHours = entity.WorkingHours;

        recyclePoint.DateUpdate = entity.DateUpdate;

        await _context.SaveChangesAsync();
        return recyclePoint;
    }
}
