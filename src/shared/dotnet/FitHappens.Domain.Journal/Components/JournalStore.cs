using System.Text.Json;
using FitHappens.Domain.Journal.Abstractions;
using FitHappens.Domain.Journal.Converter;
using FitHappens.Domain.Journal.Messages;
using FitHappens.Domain.Journal.Models;
using Microsoft.Extensions.Options;

namespace FitHappens.Domain.Journal.Components
{
    public class JournalStore : IJournalStore
    {
        private readonly JournalConfig config;
        private readonly JsonSerializerOptions options;

        public JournalStore(IOptions<JournalConfig> config, JsonSerializerOptions options)
        {
            this.config = config.Value;
            this.options = options;

            if (!Directory.Exists(this.config.DataPath))
                Directory.CreateDirectory(this.config.DataPath);
        }

        public IEnumerable<JournalMessage> Load(string user)
        {
            var userPath = ensureUserPath(user);

            var files = Directory.GetFiles(userPath, "*.json");
            if (files.Length == 0)
                return [];

            var messages = new List<JournalMessage>();
            foreach (var file in files.OrderBy(x => x))
            {
                var json = File.ReadAllText(file);
                var message =
                    JsonSerializer.Deserialize<JournalMessage>(json, options)
                    ?? throw new Exception($"Failed to deserialize {file}");
                messages.Add(message);
            }
            return messages;
        }

        public void Append(string user, IEnumerable<JournalMessage> messages)
        {
            foreach (var message in messages)
                Append(user, message);
        }

        public void Append(string user, JournalMessage message)
        {
            var json = JsonSerializer.Serialize(message, options);
            var userPath = ensureUserPath(user);

            var filename = $"{message.Timestamp}.json";
            var filepath = Path.Combine(userPath, filename);

            if (File.Exists(filepath))
                throw new Exception($"File {filename} already exists");

            File.WriteAllText(filepath, json);
        }

        public void Reset(string user)
        {
            var userPath = ensureUserPath(user);
            Directory.Delete(userPath, true);
        }

        private string ensureUserPath(string user)
        {
            var userDir = Path.Combine(config.DataPath, user);
            if (!Directory.Exists(userDir))
                Directory.CreateDirectory(userDir);

            return userDir;
        }
    }
}
