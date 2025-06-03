using System.Text.Json;
using System.Text.Json.Serialization;

namespace FitHappens.WebApi.Extensions
{
    public static class JsonExtensions
    {
        private static JsonNamingPolicy NamingPolicy = JsonNamingPolicy.CamelCase;
        private static bool CaseInsensitive = true;
        private static JsonIgnoreCondition IgnoreCondition = JsonIgnoreCondition.WhenWritingDefault;

        public static IServiceCollection AddControllersWithCustomJson(
            this IServiceCollection services
        )
        {
            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = NamingPolicy,
                PropertyNameCaseInsensitive = CaseInsensitive,
                DefaultIgnoreCondition = IgnoreCondition,
            };
            services.AddSingleton(jsonOptions);

            services
                .AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy = NamingPolicy;
                    options.JsonSerializerOptions.PropertyNameCaseInsensitive = CaseInsensitive;
                    options.JsonSerializerOptions.DefaultIgnoreCondition = IgnoreCondition;
                });

            return services;
        }
    }
}
