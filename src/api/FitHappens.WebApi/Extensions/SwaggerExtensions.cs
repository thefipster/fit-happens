using System.Reflection;
using Microsoft.OpenApi.Models;

namespace FitHappens.WebApi.Extensions
{
    public static class SwaggerExtensions
    {
        public static IServiceCollection AddSwaggerCustomGen(this IServiceCollection services)
        {
            services.AddSwaggerGen(config =>
            {
                config.AddSecurityDefinition(
                    "ApiKey",
                    new OpenApiSecurityScheme()
                    {
                        Name = "x-api-key",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.ApiKey,
                        Description = "Authorization by x-api-key inside request's header",
                        Scheme = "ApiKeyScheme",
                    }
                );

                var key = new OpenApiSecurityScheme()
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "ApiKey",
                    },
                    In = ParameterLocation.Header,
                };
                var requirement = new OpenApiSecurityRequirement { { key, new List<string>() } };
                config.AddSecurityRequirement(requirement);

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

                config.UseOneOfForPolymorphism();
                config.IncludeXmlComments(xmlPath);
            });

            return services;
        }

        public static WebApplication UseCustomSwagger(this WebApplication app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.InjectStylesheet("/swagger-ui/custom.css");
                options.DocumentTitle = "fit-happens api";
            });

            return app;
        }
    }
}
