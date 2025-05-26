namespace FitHappens.Domain.Journal.Messages
{
    public partial class DeleteBatchMsg : JournalMessage
    {
        public required string SetId { get; set; }
    }
}
