using ReciclaMais.Web.Models;

namespace ReciclaMais.Web.Repositories.Interfaces;

public interface IRecyclePointMaterialRepository : IRepository<RecyclePointMaterial>
{
    Task<List<RecyclePointMaterial>> GetByRecyclePointIdAsync(int recyclePointId);
}
