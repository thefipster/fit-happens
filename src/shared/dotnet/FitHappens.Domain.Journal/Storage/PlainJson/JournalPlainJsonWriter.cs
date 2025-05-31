using System.Text.Json;
using FitHappens.Domain.Journal.Abstractions;
using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.Journal.Storage.PlainJson
{
    public class JournalPlainJsonWriter : IJournalWriter
    {
        private readonly IJournalPlainJsonResolver resolver;
        private readonly JsonSerializerOptions jsonOptions;

        public JournalPlainJsonWriter(
            IJournalPlainJsonResolver resolver,
            JsonSerializerOptions jsonOptions
        )
        {
            this.resolver = resolver;
            this.jsonOptions = jsonOptions;
        }

        public void Append(Guid user, IEnumerable<JournalMessage> messages)
        {
            foreach (var message in messages)
                Append(user, message);
        }

        public void Append(Guid user, JournalMessage message)
        {
            var userPath = resolver.GetUserPath(user);
            var filename = $"{message.Timestamp}.json";
            var filepath = Path.Combine(userPath, filename);

            if (File.Exists(filepath))
                throw new Exception($"File {filename} already exists");

            var json = JsonSerializer.Serialize(message, jsonOptions);
            File.WriteAllText(filepath, json);
        }
    }
}
