namespace FitHappens.Domain.Journal.Messages
{
    public class CreateExerciseMsg : JournalMessage
    {
        public CreateExerciseMsg()
            : base(MessageTypes.CreateExerciseMessage)
        {
            ExerciseId = Guid.NewGuid().ToString();
        }

        public string ExerciseId { get; set; }
        public required string Name { get; set; }
        public required string ExerciseType { get; set; }
    }
}
