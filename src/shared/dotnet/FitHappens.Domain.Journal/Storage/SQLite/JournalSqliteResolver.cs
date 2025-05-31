using FitHappens.Domain.Journal.Abstractions;
using FitHappens.Domain.Journal.Models;
using Microsoft.Extensions.Options;

namespace FitHappens.Domain.Journal.Storage.SQLite
{
    public class JournalSqliteResolver : IJournalSqliteResolver
    {
        private const string FileSuffix = "journal.sqlite";

        private readonly JournalConfig config;

        public JournalSqliteResolver(IOptions<JournalConfig> config)
        {
            this.config = config.Value;
        }

        public string GetForUser(Guid user)
        {
            var userDir = Path.Combine(config.DataPath, user.ToString());
            if (!Directory.Exists(userDir))
                Directory.CreateDirectory(userDir);

            var existing = Directory.GetFiles(userDir, $"*_{FileSuffix}");
            if (existing == null || existing.Count() == 0)
            {
                var antiCacheId = Guid.NewGuid().ToString();
                var dbPath = Path.Combine(userDir, $"{user}_{antiCacheId}_{FileSuffix}");
                return dbPath;
            }

            if (existing.Count() == 1)
            {
                return existing.First();
            }

            throw new Exception(
                $"Multiple journal files found for user {user}. "
                    + $"Can't decide between: {string.Join(", ", existing)}"
            );
        }
    }
}
