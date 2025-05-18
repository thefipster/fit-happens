using FitHappens.WebApi.Abstractions;

namespace FitHappens.WebApi.Auth
{
    public class ApiKeyValidator : IApiKeyValidator
    {
        private readonly IUserService userService;

        public ApiKeyValidator(IUserService userService)
        {
            this.userService = userService;
        }

        public bool IsValid(string apiKey)
        {
            return userService.IsValid(apiKey);
        }
    }
}
