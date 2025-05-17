namespace FitHappens.WebApi.Abstraction
{
    public interface IApiKeyValidator
    {
        bool IsValid(string apiKey);
    }
}
