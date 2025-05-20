using System.Text.Json;
using FitHappens.Domain.Journal.Converter;

namespace FitHappens.WebApi.Extensions
{
    public static class JsonExtensions
    {
        public static IServiceCollection AddControllersWithCustomJson(
            this IServiceCollection services
        )
        {
            services
                .AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                    options.JsonSerializerOptions.Converters.Add(new JournalMessageConverter());
                });

            return services;
        }
    }
}
