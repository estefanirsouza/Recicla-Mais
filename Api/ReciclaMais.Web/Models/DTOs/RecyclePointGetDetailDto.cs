using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ReciclaMais.Web.Models;

public class RecyclePointGetDetailDto
{
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Neighborhood { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? ZipCode { get; set; }
    public List<int>? RecycleMaterialIds { get; set; }
}