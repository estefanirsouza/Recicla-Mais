using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ReciclaMais.Web.Models;

public class RecyclePointMaterial
{
    public int RecyclePointMaterialId { get; set; }
    public int RecyclePointId { get; set; }
    public int RecycleMaterialId { get; set; }
    public DateTime? DateInsert {get; set;}

    public string Validate()
    {
        string message = string.Empty;

        if (RecyclePointId <= 0)
        {
            message += $"{Environment.NewLine}- Obrigatório informar o ID do ponto de reciclagem.";
        }
        if (RecycleMaterialId <= 0)
        {
            message += $"{Environment.NewLine}- Obrigatório informar o ID do material de reciclagem.";
        }

        return message;
    }
}