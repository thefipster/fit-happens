namespace FitHappens.Domain.Journal.Messages
{
    public partial class CreateSetMsg : JournalMessage
    {
        public CreateSetMsg()
        {
            SetId = Guid.NewGuid().ToString();
            SetTimestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            TagIds = [];
        }

        public string SetId { get; set; }
        public long SetTimestamp { get; set; }
        public required string ExerciseId { get; set; }
        public double? Weight { get; set; }
        public int Reps { get; set; }
        public ICollection<string> TagIds { get; set; }
    }
}
