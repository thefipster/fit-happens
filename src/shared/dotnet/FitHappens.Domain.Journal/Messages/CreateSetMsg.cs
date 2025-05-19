namespace FitHappens.Domain.Journal.Messages
{
    public partial class CreateSetMsg : JournalMessage
    {
        public CreateSetMsg()
        {
            TagIds = new List<string>();
        }

        public string SetId { get; set; }
        public long Timestamp { get; set; }
        public string ExerciseId { get; set; }
        public double? Weight { get; set; }
        public int Reps { get; set; }
        public ICollection<string> TagIds { get; set; }
    }
}
