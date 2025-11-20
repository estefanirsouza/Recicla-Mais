using ReciclaMais.Web.Models;

namespace ReciclaMais.Web.Repositories.Interfaces;

public interface IRecyclePointRepository : IRepository<RecyclePoint>
{
    Task<IEnumerable<RecyclePoint>> GetByDetail(RecyclePointGetDetailDto dto);
    Task<IEnumerable<RecyclePoint>> GetByUserIdAsync(Guid userId);
}
