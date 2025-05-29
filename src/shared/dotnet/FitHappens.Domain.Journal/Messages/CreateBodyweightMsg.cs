namespace FitHappens.Domain.Journal.Messages
{
    public class CreateBodyweightMsg : JournalMessage
    {
        public CreateBodyweightMsg()
            : base(MessageTypes.CreateBodyweight) { }

        public long WeightTimestamp { get; set; }
        public double Weight { get; set; }
    }
}
