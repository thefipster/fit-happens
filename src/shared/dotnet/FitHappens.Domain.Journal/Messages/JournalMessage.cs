using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace FitHappens.Domain.Journal.Messages
{
    [JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
    [JsonDerivedType(typeof(CreateExerciseMsg), MessageTypes.CreateExercise)]
    [JsonDerivedType(typeof(CreateTagMsg), MessageTypes.CreateTag)]
    [JsonDerivedType(typeof(CreateBatchMsg), MessageTypes.CreateBatch)]
    [JsonDerivedType(typeof(DeleteBatchMsg), MessageTypes.DeleteBatch)]
    [JsonDerivedType(typeof(CreateBodyweightMsg), MessageTypes.CreateBodyweight)]
    [JsonDerivedType(typeof(DeleteBodyweightMsg), MessageTypes.DeleteBodyweight)]
    [JsonDerivedType(typeof(LinkExerciseTagsMsg), MessageTypes.LinkExerciseTags)]
    [JsonDerivedType(typeof(CreateUserMsg), MessageTypes.CreateUser)]
    public class JournalMessage
    {
        public JournalMessage()
        {
            JournalId = Guid.NewGuid();
            Timestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds();
        }

        public Guid JournalId { get; set; }
        public long Timestamp { get; set; }
    }
}
