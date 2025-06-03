namespace FitHappens.Domain.Journal.Messages
{
    public class DeleteBodyweightMsg : JournalMessage
    {
        public long WeightTimestamp { get; set; }
    }
}
