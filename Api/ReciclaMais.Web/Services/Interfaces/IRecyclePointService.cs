using ReciclaMais.Web.Models;

namespace ReciclaMais.Web.Services.Interfaces;

public interface IRecyclePointService : IService<RecyclePoint>
{
    Task<IEnumerable<RecyclePoint>> GetByDetail(RecyclePointGetDetailDto dto);
    Task<IEnumerable<RecyclePoint>> GetByUserIdAsync(Guid userId);
}
