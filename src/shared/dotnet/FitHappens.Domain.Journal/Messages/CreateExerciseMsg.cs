namespace FitHappens.Domain.Journal.Messages
{
    public partial class CreateExerciseMsg : JournalMessage
    {
        public string ExerciseId { get; set; }
        public string Name { get; set; }
    }
}
