using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.Journal.Abstractions
{
    public interface IJournalUpdater
    {
        void Update(Guid userId, JournalMessage message);
    }
}
