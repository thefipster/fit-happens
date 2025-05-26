namespace FitHappens.Domain.Journal.Messages
{
    public partial class CreateExerciseMsg : JournalMessage
    {
        public CreateExerciseMsg()
        {
            ExerciseId = Guid.NewGuid().ToString();
        }

        public string ExerciseId { get; set; }
        public required string Name { get; set; }
        public required string Type { get; set; }
    }
}
