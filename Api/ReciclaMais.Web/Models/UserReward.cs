using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ReciclaMais.Web.Models;

public class UserReward
{
    public int UserRewardId { get; set; }
    public int RecycleRewardId { get; set; }
    public Guid? UserId { get; set; }
    public string? Token {get; set;}
    public DateTime? DateValid { get; set; }
    public bool? TokenUsed { get; set; }
    public DateTime? DateInsert {get; set;}
    public DateTime? DateUpdate {get; set;}

    public string Validate()
    {
        string message = string.Empty;

        if (RecycleRewardId <= 0)
        {
            message += $"{Environment.NewLine}- Obrigatório informar o ID do prêmio.";
        }
        if(UserId is null || UserId == Guid.Empty)
        {
            message += $"{Environment.NewLine}- Obrigatório informar o ID do usuário.";
        }

        return message;
    }
}