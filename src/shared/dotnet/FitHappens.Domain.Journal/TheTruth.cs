using System.Runtime.CompilerServices;
using System.Text.Json;
using FitHappens.Domain.Journal.Abstractions;
using FitHappens.Domain.Journal.Models;
using Google.Protobuf;

namespace FitHappens.Domain.Journal
{
    public class TheTruth
    {
        private ICollection<IJournalMessage> messages { get; set; }
        private long lastMessage;

        public TheTruth()
        {
            messages = new List<IJournalMessage>();
        }

        public void Append(IJournalMessage message)
        {
            // one could do some validation here
            if (message.Timestamp < lastMessage)
                throw new InvalidOperationException("Messages must be in order.");

            messages.Add(message);
        }

        public IEnumerable<IJournalMessage> GetMessages()
        {
            return messages.Select(x => x.Clone());
        }

        public IEnumerable<IJournalMessage> GetMessages(long since)
        {
            return messages.Where(x => x.Timestamp >= since).Select(x => x.Clone());
        }

        public string Serialize()
        {
            var envelopes = messages
                .Select(msg => new Envelope
                {
                    Type = msg.GetType().AssemblyQualifiedName,
                    PayloadJson = JsonFormatter.Default.Format((IMessage)msg),
                })
                .ToList();

            var json = JsonSerializer.Serialize(
                envelopes,
                new JsonSerializerOptions { WriteIndented = true }
            );

            return json;
        }

        public static TheTruth Deserialize(string json)
        {
            var envelopes = JsonSerializer.Deserialize<List<Envelope>>(json);
            if (envelopes == null)
                throw new InvalidOperationException("Failed to deserialize envelopes.");

            var truth = new TheTruth();
            foreach (var envelope in envelopes)
            {
                var type = Type.GetType(envelope.Type);
                if (type == null || !typeof(IMessage).IsAssignableFrom(type))
                    throw new InvalidOperationException($"Type {envelope.Type} not found.");

                var parserProp = type.GetProperty(
                    "Parser",
                    System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.Public
                );
                var parser = (MessageParser)parserProp?.GetValue(null);

                var message = parser?.ParseJson(envelope.PayloadJson);
                if (message != null)
                    truth.Append((IJournalMessage)message);
            }

            return truth;
        }
    }
}
