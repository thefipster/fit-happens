using FitHappens.Domain.Journal.Abstractions;
using FitHappens.Domain.Journal.Messages;
using FitHappens.WebApi.Models;

namespace FitHappens.Domain.Journal.Components
{
    public class JournalStore : IJournalStore
    {
        private readonly IEnumerable<IJournalWriter> writers;
        private readonly IEnumerable<IJournalResetter> resetters;
        private readonly IEnumerable<IJournalUpdater> updaters;
        private readonly IJournalReader reader;

        public JournalStore(
            IEnumerable<IJournalWriter> writers,
            IEnumerable<IJournalResetter> resetters,
            IJournalReader reader,
            IEnumerable<IJournalUpdater> updaters
        )
        {
            this.writers = writers;
            this.resetters = resetters;
            this.reader = reader;
            this.updaters = updaters;
        }

        public void Append(Guid user, IEnumerable<JournalMessage> messages)
        {
            foreach (var provider in writers)
                provider.Append(user, messages);
        }

        public void Append(Guid user, JournalMessage message)
        {
            foreach (var provider in writers)
                provider.Append(user, message);
        }

        public void Update(Guid userId, JournalMessage message)
        {
            foreach (var provider in updaters)
                provider.Update(userId, message);
        }

        public async Task<IEnumerable<JournalMessage>> Load(Guid user)
        {
            return await reader.Load(user);
        }

        public async Task<IEnumerable<JournalMessage>> Load(Guid user, JournalQuery query)
        {
            return await reader.Load(user, query);
        }

        public async Task<string> LoadRaw(Guid user)
        {
            return await reader.LoadRaw(user);
        }

        public void Reset(Guid user)
        {
            foreach (var provider in resetters)
                provider.Reset(user);
        }
    }
}
