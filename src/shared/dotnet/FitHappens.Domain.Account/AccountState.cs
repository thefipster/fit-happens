using FitHappens.Domain.Account.Models;

namespace FitHappens.Domain.Account
{
    public class AccountState
    {
        public AccountState()
        {
            Users = [];
        }

        public ICollection<User> Users { get; set; }
    }
}
