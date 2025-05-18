using FitHappens.Domain.Account;
using FitHappens.Repository.Account.Abstractions;

namespace FitHappens.Repository.Account.Components
{
    public class AccountStore : IAccountStore
    {
        public AccountState Load(string path)
        {
            var json = File.ReadAllText(path);
            var state = System.Text.Json.JsonSerializer.Deserialize<AccountState>(json);
            if (state == null)
                throw new InvalidOperationException("Failed to load account state.");

            return state;
        }

        public void Save(AccountState state, string path)
        {
            var json = System.Text.Json.JsonSerializer.Serialize(state);
            using (var stream = new FileStream(path, FileMode.Create))
            using (var writer = new StreamWriter(stream))
                writer.Write(json);
        }
    }
}
