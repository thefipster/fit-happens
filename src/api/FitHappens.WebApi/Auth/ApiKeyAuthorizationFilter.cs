using FitHappens.WebApi.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FitHappens.WebApi.Auth
{
    public class ApiKeyAuthorizationFilter(IApiKeyValidator validator) : IAuthorizationFilter
    {
        private const string ApiKeyHeaderName = "X-API-Key";

        private readonly IApiKeyValidator validator = validator;

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            string? apiKey = context.HttpContext.Request.Headers[ApiKeyHeaderName];

            if (string.IsNullOrWhiteSpace(apiKey) || !validator.IsValid(apiKey))
                context.Result = new UnauthorizedResult();
        }
    }
}
