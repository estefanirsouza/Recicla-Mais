using ReciclaMais.Web.Models;

namespace ReciclaMais.Web.Repositories.Interfaces;

public interface IRecycleMaterialRepository : IRepository<RecycleMaterial>
{
    Task<IEnumerable<RecycleMaterial>> GetAllByNameAsync(string name);
}