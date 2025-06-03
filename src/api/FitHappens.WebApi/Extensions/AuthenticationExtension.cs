using FitHappens.Domain.Account.Abstractions;
using FitHappens.Domain.Account.Components;
using FitHappens.WebApi.Abstractions;
using FitHappens.WebApi.Auth;
using FitHappens.WebApi.Services;

namespace FitHappens.WebApi.Extensions
{
    public static class AuthenticationExtension
    {
        public static IServiceCollection AddApiKeyAuthentication(this IServiceCollection services)
        {
            services.AddSingleton<ApiKeyAuthorizationFilter>();
            services.AddSingleton<IApiKeyValidator, UserService>();

            services.AddTransient<IAccountStore, AccountStore>();
            services.AddTransient<IUserService, UserService>();

            return services;
        }
    }
}
