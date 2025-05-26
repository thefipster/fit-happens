namespace FitHappens.Domain.Journal.Messages
{
    public class CreateBatchMsg : JournalMessage
    {
        public CreateBatchMsg()
            : base(MessageTypes.CreateBatchMessage)
        {
            BatchId = Guid.NewGuid().ToString();
            BatchTimestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            TagIds = [];
        }

        public string BatchId { get; set; }
        public long BatchTimestamp { get; set; }
        public required string ExerciseId { get; set; }
        public double? Weight { get; set; }
        public int Reps { get; set; }
        public ICollection<string> TagIds { get; set; }
    }
}
