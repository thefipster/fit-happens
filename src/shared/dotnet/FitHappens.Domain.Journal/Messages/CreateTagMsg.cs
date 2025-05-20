namespace FitHappens.Domain.Journal.Messages
{
    public class CreateTagMsg : JournalMessage
    {
        public CreateTagMsg()
        {
            TagId = Guid.NewGuid().ToString();
        }

        public string TagId { get; set; }
        public required string Name { get; set; }
        public string? ParentId { get; set; }
    }
}
