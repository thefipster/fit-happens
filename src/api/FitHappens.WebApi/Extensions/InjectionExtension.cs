using FitHappens.Domain.Account.Abstractions;
using FitHappens.Domain.Account.Components;
using FitHappens.Domain.Account.Models;
using FitHappens.Domain.Journal.Abstractions;
using FitHappens.Domain.Journal.Components;
using FitHappens.Domain.Journal.Models;
using FitHappens.WebApi.Abstractions;
using FitHappens.WebApi.Auth;
using FitHappens.WebApi.Services;

namespace FitHappens.WebApi.Extensions
{
    public static class InjectionExtension
    {
        public static IServiceCollection InjectCustomServices(
            this IServiceCollection services,
            IConfiguration config
        )
        {
            services.AddSingleton<ApiKeyAuthorizationFilter>();
            services.AddSingleton<IApiKeyValidator, UserService>();

            services.AddTransient<IAccountStore, AccountStore>();
            services.AddTransient<IJournalStore, JournalStore>();
            services.AddTransient<IUserService, UserService>();
            services.Configure<List<User>>(config.GetSection("Users"));
            services.Configure<JournalConfig>(config.GetSection("Journal"));

            return services;
        }
    }
}
