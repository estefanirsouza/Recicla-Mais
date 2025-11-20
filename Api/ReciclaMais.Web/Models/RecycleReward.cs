using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ReciclaMais.Web.Models;

public class RecycleReward
{
    public int RecycleRewardId { get; set; }
    public Guid? UserStoreId { get; set; }
    public Guid? UserPartnerId { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Address { get; set; }
    public string? Neighborhood { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? ZipCode { get; set; }
    public string? PhoneNumber {get; set;}
    public int? DefaultValidDays { get; set; }
    public DateTime? DateInsert {get; set;}
    public DateTime? DateUpdate {get; set;}

    internal string? Validate()
    {
        string message = string.Empty;

        if (UserStoreId is null || UserStoreId == Guid.Empty)
        {
            message += $"{Environment.NewLine}- Obrigatório informar o ID da loja associada ao prêmio.";
        }
        if (UserPartnerId is null || UserPartnerId == Guid.Empty)
        {
            message += $"{Environment.NewLine}- Obrigatório informar o ID do parceiro associado ao prêmio.";
        }
        if (string.IsNullOrWhiteSpace(Name))
        {
            message += $"{Environment.NewLine}- Obrigatório informar o nome do prêmio.";
        }
        if (string.IsNullOrWhiteSpace(City))
        {
            message += $"{Environment.NewLine}- Obrigatório informar a cidade do prêmio.";
        }
        if (string.IsNullOrWhiteSpace(State))
        {
            message += $"{Environment.NewLine}- Obrigatório informar o estado do prêmio.";
        }
        if (DefaultValidDays is null || DefaultValidDays <= 0)
        {
            message += $"{Environment.NewLine}- Obrigatório informar o número de dias válidos padrão do prêmio.";
        }

        return message;
    }
}