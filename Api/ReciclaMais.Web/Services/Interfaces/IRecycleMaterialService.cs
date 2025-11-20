using ReciclaMais.Web.Models;

namespace ReciclaMais.Web.Services.Interfaces;

public interface IRecycleMaterialService : IService<RecycleMaterial>
{
    Task<IEnumerable<RecycleMaterial>> GetAllByNameAsync(string name);
}

