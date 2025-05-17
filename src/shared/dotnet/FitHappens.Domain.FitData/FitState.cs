using FitHappens.Domain.FitData.Models;

namespace FitHappens.Domain.FitData
{
    public class FitState
    {
        public FitState()
        {
            Tags = new List<Tag>();
            Exercises = new List<Exercise>();
            Sets = new List<Set>();
        }

        public ICollection<Tag> Tags { get; set; }
        public ICollection<Exercise> Exercises { get; set; }
        public ICollection<Set> Sets { get; set; }
    }
}
