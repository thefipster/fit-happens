namespace FitHappens.Domain.Journal.Messages
{
    public class CreateExerciseMsg : JournalMessage
    {
        public CreateExerciseMsg()
        {
            ExerciseId = Guid.NewGuid().ToString();
        }

        public string ExerciseId { get; set; }
        public required string ExerciseType { get; set; }
        public required string Name { get; set; }
    }
}
