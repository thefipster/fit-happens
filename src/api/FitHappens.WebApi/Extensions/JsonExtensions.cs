using System.Text.Json;
using FitHappens.Domain.Journal.Converter;

namespace FitHappens.WebApi.Extensions
{
    public static class JsonExtensions
    {
        private static JsonNamingPolicy NamingPolicy = JsonNamingPolicy.CamelCase;
        private static bool CaseInsensitive = true;

        public static IServiceCollection AddControllersWithCustomJson(
            this IServiceCollection services
        )
        {
            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = CaseInsensitive,
                PropertyNamingPolicy = NamingPolicy,
            };
            jsonOptions.Converters.Add(new JournalMessageConverter());
            services.AddSingleton(jsonOptions);

            services
                .AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy = NamingPolicy;
                    options.JsonSerializerOptions.PropertyNameCaseInsensitive = CaseInsensitive;
                    options.JsonSerializerOptions.Converters.Add(new JournalMessageConverter());
                });

            return services;
        }
    }
}
