using System.Runtime.Serialization;
using System.Text.Json;
using System.Text.Json.Serialization;
using FitHappens.Domain.Journal.Converter;

namespace FitHappens.Domain.Journal.Messages
{
    [KnownType(typeof(CreateExerciseMsg))]
    [KnownType(typeof(CreateTagMsg))]
    [KnownType(typeof(CreateBatchMsg))]
    [KnownType(typeof(DeleteBatchMsg))]
    [KnownType(typeof(CreateBodyweightMsg))]
    [KnownType(typeof(LinkExerciseTagsMsg))]
    public class JournalMessage
    {
        public JournalMessage(string type)
        {
            JournalId = Guid.NewGuid().ToString();
            Timestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds();
            Type = type;
        }

        public string JournalId { get; set; }
        public long Timestamp { get; set; }

        [JsonIgnore]
        public string Type { get; set; }

        public string ToJson()
        {
            return JsonSerializer.Serialize(this, jsonOptions);
        }

        public static JournalMessage? FromJson(string json)
        {
            return JsonSerializer.Deserialize<JournalMessage>(json, jsonOptions);
        }

        private static JsonSerializerOptions jsonOptions
        {
            get
            {
                var options = new JsonSerializerOptions
                {
                    WriteIndented = true,
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                };
                options.Converters.Add(new JournalMessageConverter());
                return options;
            }
        }
    }
}
