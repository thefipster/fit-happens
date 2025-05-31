using System.Text;
using System.Text.Json;
using FitHappens.Domain.Journal.Abstractions;
using FitHappens.Domain.Journal.Messages;
using FitHappens.WebApi.Models;

namespace FitHappens.Domain.Journal.Storage.PlainJson
{
    public class JournalPlainJsonReader : IJournalReader
    {
        private readonly IJournalPlainJsonResolver resolver;
        private readonly JsonSerializerOptions jsonOptions;

        public JournalPlainJsonReader(
            IJournalPlainJsonResolver resolver,
            JsonSerializerOptions jsonOptions
        )
        {
            this.resolver = resolver;
            this.jsonOptions = jsonOptions;
        }

        public Task<IEnumerable<JournalMessage>> Load(Guid user)
        {
            var userPath = resolver.GetUserPath(user);

            var files = Directory.GetFiles(userPath, "*.json");
            if (files.Length == 0)
                return Task.FromResult(Enumerable.Empty<JournalMessage>());

            var messages = new List<JournalMessage>();
            foreach (var file in files.OrderBy(x => x))
            {
                var json = File.ReadAllText(file);
                var message =
                    JsonSerializer.Deserialize<JournalMessage>(json, jsonOptions)
                    ?? throw new Exception($"Failed to deserialize {file}");

                messages.Add(message);
            }
            return Task.FromResult(messages.AsEnumerable());
        }

        public Task<IEnumerable<JournalMessage>> Load(Guid user, JournalQuery query)
        {
            throw new NotImplementedException(
                "Na mate, not going to happen for the plain json reader in the near future."
            );
        }

        public Task<string> LoadRaw(Guid user)
        {
            var userPath = resolver.GetUserPath(user);

            var files = Directory.GetFiles(userPath, "*.json");
            if (files.Length == 0)
                return Task.FromResult("[]");

            var sb = new StringBuilder("[");
            foreach (var file in files.OrderBy(x => x))
            {
                var json = File.ReadAllText(file);
                sb.Append(json);
                sb.Append(",");
            }
            sb.Append("]");

            return Task.FromResult(sb.ToString());
        }
    }
}
