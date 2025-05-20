using System.Runtime.Serialization;
using System.Text.Json;
using FitHappens.Domain.Journal.Converter;

namespace FitHappens.Domain.Journal.Messages
{
    [KnownType(typeof(CreateExerciseMsg))]
    [KnownType(typeof(CreateSetMsg))]
    [KnownType(typeof(CreateTagMsg))]
    [KnownType(typeof(DeleteSetMsg))]
    public class JournalMessage
    {
        public JournalMessage()
        {
            JournalId = Guid.NewGuid().ToString();
            Timestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds();
        }

        public string JournalId { get; set; }
        public long Timestamp { get; set; }

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
