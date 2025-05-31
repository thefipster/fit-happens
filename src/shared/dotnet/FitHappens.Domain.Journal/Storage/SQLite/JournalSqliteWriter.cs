using System.Text.Json;
using FitHappens.Domain.Journal.Abstractions;
using FitHappens.Domain.Journal.Messages;
using FitHappens.Domain.Journal.Models;

namespace FitHappens.Domain.Journal.Storage.SQLite
{
    internal class JournalSqliteWriter : IJournalWriter
    {
        private readonly IJournalDbContextFactory contextFactory;
        private readonly JsonSerializerOptions jsonOptions;

        public JournalSqliteWriter(
            IJournalDbContextFactory contextFactory,
            JsonSerializerOptions jsonOptions
        )
        {
            this.contextFactory = contextFactory;
            this.jsonOptions = jsonOptions;
        }

        public void Append(Guid user, IEnumerable<JournalMessage> messages)
        {
            using var context = contextFactory.CreateForUser(user);

            foreach (var message in messages)
                append(message, context);

            context.SaveChanges();
        }

        public void Append(Guid user, JournalMessage message)
        {
            using var context = contextFactory.CreateForUser(user);

            append(message, context);

            context.SaveChanges();
        }

        private void append(JournalMessage msg, JournalDbContext context)
        {
            var record = new JournalRecord(msg, jsonOptions);
            context.Messages.Add(record);
        }
    }
}
