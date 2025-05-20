namespace FitHappens.Domain.Journal.Messages
{
    public partial class DeleteSetMsg : JournalMessage
    {
        public required string SetId { get; set; }
    }
}
