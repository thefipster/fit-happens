using FitHappens.Domain.Account.Models;
using FitHappens.WebApi.Abstractions;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;

namespace FitHappens.WebApi.Services
{
    public class UserService : IUserService, IApiKeyValidator
    {
        private IEnumerable<User> users;

        public UserService(IOptions<List<User>> users)
        {
            this.users = users.Value;
            if (this.users == null || !this.users.Any())
                throw new InvalidOperationException("User data is not configured.");
        }

        public Guid GetIdForKey(StringValues header)
        {
            var key = header.ToString();
            var user = users.FirstOrDefault(x => x.Keys.Any(y => y.Key == header));

            if (user == null)
                throw new InvalidOperationException($"User with key {header} not found.");

            return user.Id;
        }

        public bool IsValid(string key)
        {
            return users.Any(x => x.Keys.Any(y => y.Key == key));
        }
    }
}
