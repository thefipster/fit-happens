namespace FitHappens.Domain.FitData.Models
{
    public class Batch
    {
        public Batch()
        {
            Id = Guid.NewGuid().ToString();
            Tags = [];
        }

        public string Id { get; set; }
        public long Timestamp { get; set; }
        public required Exercise Exercise { get; set; }
        public ICollection<Tag> Tags { get; set; }
        public int Reps { get; set; }
    }
}
