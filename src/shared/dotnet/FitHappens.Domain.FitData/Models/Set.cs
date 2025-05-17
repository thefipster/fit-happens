namespace FitHappens.Domain.FitData.Models
{
    public class Set
    {
        public string Id { get; set; }
        public long Timestamp { get; set; }
        public Exercise Exercise { get; set; }
        public ICollection<Tag> Tags { get; set; }
        public int Reps { get; set; }
    }
}
