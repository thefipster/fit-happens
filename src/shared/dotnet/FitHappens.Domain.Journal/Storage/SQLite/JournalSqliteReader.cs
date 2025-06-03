using System.Text;
using System.Text.Json;
using FitHappens.Domain.Journal.Abstractions;
using FitHappens.Domain.Journal.Messages;
using FitHappens.Domain.Journal.Models;
using FitHappens.WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FitHappens.Domain.Journal.Storage.SQLite
{
    internal class JournalSqliteReader : IJournalReader
    {
        private readonly IJournalDbContextFactory contextFactory;
        private readonly JsonSerializerOptions jsonOptions;

        public JournalSqliteReader(
            IJournalDbContextFactory contextFactory,
            JsonSerializerOptions jsonOptions
        )
        {
            this.contextFactory = contextFactory;
            this.jsonOptions = jsonOptions;
        }

        public async Task<string> LoadRaw(Guid user)
        {
            using var context = contextFactory.CreateForUser(user);

            var records = await context.Messages.OrderBy(r => r.Timestamp).ToListAsync();
            var sb = new StringBuilder("[");

            foreach (var record in records)
            {
                sb.Append(record.Payload);
                sb.Append(",");
            }

            sb.Append("]");
            return sb.ToString();
        }

        public async Task<IEnumerable<JournalMessage>> Load(Guid user)
        {
            using var context = contextFactory.CreateForUser(user);

            var messages = await context
                .Messages.OrderBy(r => r.Timestamp)
                .Select(x => x.GetPayload(jsonOptions))
                .ToListAsync();
            return messages;
        }

        public async Task<IEnumerable<JournalMessage>> Load(Guid user, JournalQuery query)
        {
            using var context = contextFactory.CreateForUser(user);

            if (query.After.HasValue)
            {
                return await context
                    .Messages.Where(x => x.Timestamp > query.After.Value)
                    .OrderBy(x => x.Timestamp)
                    .Take(query.Limit)
                    .Select(x => x.GetPayload(jsonOptions))
                    .ToListAsync();
            }

            if (query.Before.HasValue)
            {
                return await context
                    .Messages.Where(x => x.Timestamp < query.Before.Value)
                    .OrderByDescending(x => x.Timestamp)
                    .Take(query.Limit)
                    .Select(x => x.GetPayload(jsonOptions))
                    .ToListAsync();
            }

            return await context
                .Messages.OrderBy(x => x.Timestamp)
                .Take(query.Limit)
                .Select(x => x.GetPayload(jsonOptions))
                .ToListAsync();
        }
    }
}
