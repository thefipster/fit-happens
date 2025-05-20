using FitHappens.Domain.Account;

namespace FitHappens.Domain.Account.Abstractions
{
    public interface IAccountStore
    {
        AccountState Load(string path);
        void Save(AccountState state, string path);
    }
}
