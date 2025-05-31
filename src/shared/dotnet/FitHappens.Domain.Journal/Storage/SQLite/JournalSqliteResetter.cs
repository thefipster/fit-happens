using System.Text.Json;
using FitHappens.Domain.Journal.Abstractions;

namespace FitHappens.Domain.Journal.Storage.SQLite
{
    internal class JournalSqliteResetter : IJournalResetter
    {
        private readonly IJournalDbContextFactory contextFactory;
        private readonly JsonSerializerOptions jsonOptions;

        public JournalSqliteResetter(
            IJournalDbContextFactory contextFactory,
            JsonSerializerOptions jsonOptions
        )
        {
            this.contextFactory = contextFactory;
            this.jsonOptions = jsonOptions;
        }

        public void Reset(Guid user)
        {
            contextFactory.DestroyForUser(user);
        }
    }
}
