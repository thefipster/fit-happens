using System.ComponentModel.DataAnnotations;

namespace FitHappens.WebApi.Models
{
    public class JournalQuery : IValidatableObject
    {
        [Range(1, 1000)]
        public int Limit { get; set; } = 1000;
        public long? After { get; set; }
        public long? Before { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Before.HasValue && After.HasValue)
            {
                yield return new ValidationResult(
                    "Only one of 'before' or 'after' can be set.",
                    new[] { nameof(Before), nameof(After) }
                );
            }

            long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

            if (Before < 0 || Before > now)
            {
                yield return new ValidationResult(
                    "'before' must be a valid Unix timestamp and can't be in the future.",
                    new[] { nameof(Before) }
                );
            }

            if (After < 0 || After > now)
            {
                yield return new ValidationResult(
                    "'after' must be a valid Unix timestamp.",
                    new[] { nameof(After) }
                );
            }
        }
    }
}
