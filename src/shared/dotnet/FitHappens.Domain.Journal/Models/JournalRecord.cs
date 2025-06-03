using System.Text.Json;
using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.Journal.Models
{
    public class JournalRecord
    {
        public JournalRecord() { }

        public JournalRecord(JournalMessage message, JsonSerializerOptions jsonOptions)
        {
            JournalId = message.JournalId;
            Type = message.GetType().Name;
            Timestamp = message.Timestamp;
            Payload = JsonSerializer.Serialize(message, jsonOptions);
        }

        public long Timestamp { get; set; }
        public Guid JournalId { get; set; }
        public string Type { get; set; }
        public string Payload { get; set; }

        public void SetPayload(JournalMessage msg, JsonSerializerOptions jsonOptions)
        {
            Payload = JsonSerializer.Serialize(msg, jsonOptions);
        }

        public JournalMessage GetPayload(JsonSerializerOptions jsonOptions)
        {
            return JsonSerializer.Deserialize<JournalMessage>(Payload, jsonOptions)
                ?? throw new Exception(
                    $"Failed to deserialize JournalMessage from JournalRecord with timestamp: {Timestamp}."
                );
        }
    }
}
