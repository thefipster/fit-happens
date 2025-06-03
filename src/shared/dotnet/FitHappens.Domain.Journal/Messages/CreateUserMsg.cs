namespace FitHappens.Domain.Journal.Messages
{
    public class CreateUserMsg : JournalMessage
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
    }
}
