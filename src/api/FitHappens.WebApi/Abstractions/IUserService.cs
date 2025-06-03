using Microsoft.Extensions.Primitives;

namespace FitHappens.WebApi.Abstractions
{
    public interface IUserService
    {
        Guid GetIdForKey(StringValues key);
        bool IsValid(string key);
    }
}
