using Microsoft.AspNetCore.Mvc;

namespace FitHappens.WebApi.Auth
{
    public class ApiKeyAttribute : ServiceFilterAttribute
    {
        public ApiKeyAttribute()
            : base(typeof(ApiKeyAuthorizationFilter)) { }
    }
}
