namespace FitHappens.Domain.FitData.Models
{
    public class Exercise
    {
        public Exercise()
        {
            Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }
        public required string Name { get; set; }
    }
}
