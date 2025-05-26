namespace FitHappens.Domain.Journal.Messages
{
    public class DeleteBatchMsg : JournalMessage
    {
        public DeleteBatchMsg(string setId)
            : base(MessageTypes.DeleteBatchMessage)
        {
            SetId = setId;
        }

        public string SetId { get; set; }
    }
}
