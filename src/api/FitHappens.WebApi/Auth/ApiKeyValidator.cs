using FitHappens.WebApi.Abstractions;

namespace FitHappens.WebApi.Auth
{
    public class ApiKeyValidator : IApiKeyValidator
    {
        public bool IsValid(string apiKey)
        {
            if (apiKey.FirstOrDefault() == 'a')
            {
                return true;
            }

            return false;
        }
    }
}
