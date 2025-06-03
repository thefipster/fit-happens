using System.IO.Compression;
using Microsoft.AspNetCore.ResponseCompression;

namespace FitHappens.WebApi.Extensions
{
    public static class CompressionExtension
    {
        public static IServiceCollection AddBrotliCompression(this IServiceCollection services)
        {
            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                options.Providers.Add<BrotliCompressionProvider>();
            });

            services.Configure<BrotliCompressionProviderOptions>(opts =>
            {
                opts.Level = CompressionLevel.Fastest;
            });

            return services;
        }

        public static IApplicationBuilder UseBrotliCompression(this IApplicationBuilder app)
        {
            app.UseResponseCompression();
            return app;
        }
    }
}
