namespace FitHappens.WebApi.Abstractions
{
    public interface IApiKeyValidator
    {
        bool IsValid(string apiKey);
    }
}
