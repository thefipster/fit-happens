namespace FitHappens.Domain.Account.Models
{
    public class User
    {
        public User()
        {
            Id = Guid.NewGuid();
            Keys = [];
        }

        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public ICollection<ApiKey> Keys { get; set; }
    }
}
