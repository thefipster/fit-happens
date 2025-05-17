using FitHappens.WebApi.Abstraction;

namespace FitHappens.WebApi.Auth
{
    public class ApiKeyValidator : IApiKeyValidator
    {
        public bool IsValid(string apiKey)
        {
            var rnd = Random.Shared.Next(0, 10);

            if (rnd < 5)
                return false;

            return true;
        }
    }
}
