using System.Reflection;
using FitHappens.Domain.Account.Models;
using FitHappens.Repository.Account.Abstractions;
using FitHappens.Repository.Account.Components;
using FitHappens.Repository.Journal.Abstractions;
using FitHappens.Repository.Journal.Components;
using FitHappens.Repository.Journal.Models;
using FitHappens.WebApi.Abstractions;
using FitHappens.WebApi.Auth;
using FitHappens.WebApi.Services;
using Microsoft.OpenApi.Models;

namespace FitHappens.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSingleton<ApiKeyAuthorizationFilter>();
            builder.Services.AddSingleton<IApiKeyValidator, UserService>();

            builder.Services.AddTransient<IAccountStore, AccountStore>();
            builder.Services.AddTransient<IJournalStore, JournalStore>();
            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.Configure<List<User>>(builder.Configuration.GetSection("Users"));
            builder.Services.Configure<JournalConfig>(builder.Configuration.GetSection("Journal"));
            builder
                .Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JournalMessageConverter());
                });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(config =>
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

                config.GeneratePolymorphicSchemas();

                config.IncludeXmlComments(xmlPath);
                config.SwaggerDoc(
                    "v1",
                    new OpenApiInfo() { Version = "v1", Title = "fit-happens api" }
                );
            });
            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
