using FitHappens.Domain.Account.Models;
using FitHappens.Domain.Journal.Models;

namespace FitHappens.WebApi.Extensions
{
    public static class InjectionExtension
    {
        public static IServiceCollection AddConfiguration(
            this IServiceCollection services,
            IConfiguration config
        )
        {
            services.Configure<List<User>>(config.GetSection("Users"));
            services.Configure<JournalConfig>(config.GetSection("Journal"));

            return services;
        }
    }
}
