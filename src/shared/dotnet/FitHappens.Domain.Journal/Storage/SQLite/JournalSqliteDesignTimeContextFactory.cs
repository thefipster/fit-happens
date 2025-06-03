using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace FitHappens.Domain.Journal.Storage.SQLite
{
    internal class JournalSqliteDesignTimeContextFactory
        : IDesignTimeDbContextFactory<JournalDbContext>
    {
        public JournalDbContext CreateDbContext(string[] args)
        {
            var options = new DbContextOptionsBuilder<JournalDbContext>()
                .UseSqlite("Data Source=journal_design_time.db")
                .Options;

            return new JournalDbContext(options);
        }
    }
}
