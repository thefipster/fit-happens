using FitHappens.Domain.Journal.Abstractions;
using FitHappens.Domain.Journal.Models;
using Microsoft.Extensions.Options;

namespace FitHappens.Domain.Journal.Storage.PlainJson
{
    public class JournalPlainJsonResolver : IJournalPlainJsonResolver
    {
        private const string JournalDirectory = "journal";

        private readonly JournalConfig config;

        public JournalPlainJsonResolver(IOptions<JournalConfig> config)
        {
            this.config = config.Value;
        }

        public string GetUserPath(Guid user)
        {
            var userDir = Path.Combine(config.DataPath, user.ToString(), JournalDirectory);
            if (!Directory.Exists(userDir))
                Directory.CreateDirectory(userDir);

            return userDir;
        }
    }
}
