namespace FitHappens.Domain.Journal.Messages
{
    public class DeleteBatchMsg : JournalMessage
    {
        public DeleteBatchMsg(string batchId)
            : base(MessageTypes.DeleteBatch)
        {
            BatchId = batchId;
        }

        public string BatchId { get; set; }
    }
}
