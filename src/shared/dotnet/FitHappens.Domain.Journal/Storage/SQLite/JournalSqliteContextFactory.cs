using FitHappens.Domain.Journal.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace FitHappens.Domain.Journal.Storage.SQLite
{
    public class JournalSqliteContextFactory : IJournalDbContextFactory
    {
        private readonly IJournalSqliteResolver resolver;

        public JournalSqliteContextFactory(IJournalSqliteResolver resolver)
        {
            this.resolver = resolver;
        }

        public JournalDbContext CreateForUser(Guid user)
        {
            var dbPath = resolver.GetForUser(user);

            var options = new DbContextOptionsBuilder<JournalDbContext>()
                .UseSqlite($"Data Source={dbPath}")
                .Options;

            var context = new JournalDbContext(options);

            if (!File.Exists(dbPath))
                context.Database.Migrate();

            return context;
        }

        public void DestroyForUser(Guid user)
        {
            var dbPath = resolver.GetForUser(user);

            if (!File.Exists(dbPath))
                return;

            var file = new FileInfo(dbPath);
            var sgliteFiles = file.Directory.GetFiles("*sqlite*");
            foreach (var sqliteFile in sgliteFiles)
                sqliteFile.Delete();
        }
    }
}
