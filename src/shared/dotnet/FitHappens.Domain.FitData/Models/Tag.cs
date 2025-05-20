namespace FitHappens.Domain.FitData.Models
{
    public class Tag
    {
        public Tag()
        {
            Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }
        public required string Name { get; set; }
        public string? ParentId { get; set; }
    }
}
