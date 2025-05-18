using FitHappens.Domain.Account.Models;
using FitHappens.Repository.Account.Abstractions;
using FitHappens.Repository.Account.Components;
using FitHappens.WebApi.Abstractions;
using FitHappens.WebApi.Auth;
using FitHappens.WebApi.Services;

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
            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.Configure<List<User>>(builder.Configuration.GetSection("Users"));
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

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
