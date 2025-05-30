namespace FitHappens.Domain.Journal.Messages
{
    public class DeleteBodyweightMsg : JournalMessage
    {
        public DeleteBodyweightMsg()
            : base(MessageTypes.DeleteBodyweight) { }

        public long WeightTimestamp { get; set; }
    }
}
