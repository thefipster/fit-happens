using FitHappens.WebApi.Extensions;

namespace FitHappens.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Host.UseSerilogFromConfig();

            var config = builder.Configuration;

            builder.Services.InjectCustomServices(config);
            builder.Services.AddCors();
            builder.Services.AddControllersWithCustomJson();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerCustomGen();

            var app = builder.Build();
            app.AddCorsAllowingAll();
            app.UseStaticFiles();
            app.UseCustomSwagger();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
