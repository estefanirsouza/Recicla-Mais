using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ReciclaMais.Web.Models;

public class RecyclePoint
{
    public int RecyclePointId { get; set; }
    public Guid? UserId { get; set; }
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Neighborhood { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? ZipCode { get; set; }
    public string? PhoneNumber {get; set;}
    public string? WorkingHours {get; set;}
    public DateTime? DateInsert {get; set;}
    public DateTime? DateUpdate {get; set;}
    [NotMapped]
    public List<int>? RecycleMaterialIds {get; set;}

    internal string? Validate()
    {
        string message = string.Empty;

        if (UserId is null || UserId == Guid.Empty)
        {
            message += $"{Environment.NewLine}- Obrigatório informar o ID do usuário associado ao ponto de reciclagem.";
        }
        if (string.IsNullOrWhiteSpace(Name))
        {
            message += $"{Environment.NewLine}- Obrigatório informar o nome do ponto de reciclagem.";
        }
        if (string.IsNullOrWhiteSpace(City))
        {
            message += $"{Environment.NewLine}- Obrigatório informar a cidade do ponto de reciclagem.";
        }
        if (string.IsNullOrWhiteSpace(State))
        {
            message += $"{Environment.NewLine}- Obrigatório informar o estado do ponto de reciclagem.";
        }

        return message;
    }
}