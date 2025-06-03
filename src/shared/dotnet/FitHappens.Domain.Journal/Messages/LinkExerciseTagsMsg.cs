namespace FitHappens.Domain.Journal.Messages
{
    public class LinkExerciseTagsMsg : JournalMessage
    {
        public LinkExerciseTagsMsg()
        {
            ExerciseIds = new List<string>();
            TagIds = new List<string>();
        }

        public IEnumerable<string> ExerciseIds { get; set; }
        public IEnumerable<string> TagIds { get; set; }
    }
}
