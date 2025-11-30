using ReciclaMais.Web.Models;

namespace ReciclaMais.Web.Services.Interfaces;

public interface IRecyclePointMaterialService : IService<RecyclePointMaterial>
{
    Task<List<RecyclePointMaterial>> GetByRecyclePointIdAsync(int recyclePointId);
}
