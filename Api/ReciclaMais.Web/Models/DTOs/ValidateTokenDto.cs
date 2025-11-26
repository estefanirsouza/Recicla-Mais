namespace ReciclaMais.Web.Models.DTOs;

public class ValidateTokenDto
{
    public string? Token { get; set; }
    public Guid? StoreId { get; set; }
    public Guid? PartnerId { get; set; }

    public string Validate()
    {
        string message = string.Empty;

        if (string.IsNullOrWhiteSpace(Token))
        {
            message += $"{Environment.NewLine}- Obrigatório informar o Token.";
        }
        if((StoreId is null || StoreId == Guid.Empty) && (PartnerId is null || PartnerId == Guid.Empty))
        {
            message += $"{Environment.NewLine}- Obrigatório informar o ID da loja ou do parceiro.";
        }

        return message;
    }
}

