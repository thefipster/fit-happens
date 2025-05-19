namespace FitHappens.Domain.Journal.Messages
{
    public class CreateTagMsg : JournalMessage
    {
        public string TagId { get; set; }
        public string Name { get; set; }
        public string? ParentId { get; set; }
    }
}
