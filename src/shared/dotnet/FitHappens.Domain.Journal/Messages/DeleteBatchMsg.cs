namespace FitHappens.Domain.Journal.Messages
{
    public class DeleteBatchMsg : JournalMessage
    {
        public required string BatchId { get; set; }
    }
}
