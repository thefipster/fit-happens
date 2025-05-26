namespace FitHappens.WebApi.Extensions
{
    public static class CorsExtension
    {
        public static WebApplication AddCorsAllowingAll(this WebApplication app)
        {
            app.UseCors(x =>
                x.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true)
            );

            return app;
        }
    }
}
