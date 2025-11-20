using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ReciclaMais.Web.Models;

public class RecycleMaterial
{
    public int RecycleMaterialId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public byte[]? IconImage { get; set; }
    [NotMapped]
    public string? IconImageBase64 { get; set; }
    public DateTime? DateInsert {get; set;}
    public DateTime? DateUpdate {get; set;}
}