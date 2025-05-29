namespace FitHappens.Domain.Journal.Messages
{
    public class CreateExerciseMsg : JournalMessage
    {
        public CreateExerciseMsg()
            : base(MessageTypes.CreateExercise)
        {
            ExerciseId = Guid.NewGuid().ToString();
            TagIds = new List<string>();
        }

        public string ExerciseId { get; set; }
        public required string ExerciseType { get; set; }
        public required string Name { get; set; }
        public IEnumerable<string> TagIds { get; set; }
    }
}
