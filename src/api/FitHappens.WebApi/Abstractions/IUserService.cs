using Microsoft.Extensions.Primitives;

namespace FitHappens.WebApi.Abstractions
{
    public interface IUserService
    {
        Guid GetId(HttpRequest request);
        Guid GetId(StringValues key);
        bool IsValid(string key);
    }
}
