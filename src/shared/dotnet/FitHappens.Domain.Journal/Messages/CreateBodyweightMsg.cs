namespace FitHappens.Domain.Journal.Messages
{
    public class CreateBodyweightMsg : JournalMessage
    {
        public long WeightTimestamp { get; set; }
        public double Weight { get; set; }
    }
}
