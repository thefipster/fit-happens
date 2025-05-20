using Serilog;

namespace FitHappens.WebApi.Extensions
{
    public static class LoggingExtension
    {
        public static ConfigureHostBuilder UseSerilogFromConfig(this ConfigureHostBuilder host)
        {
            host.UseSerilog(
                (context, services, configuration) =>
                {
                    configuration
                        .ReadFrom.Configuration(context.Configuration)
                        .ReadFrom.Services(services)
                        .Enrich.FromLogContext();
                }
            );

            return host;
        }
    }
}
