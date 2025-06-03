using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.Journal.Abstractions
{
    public interface IJournalWriter
    {
        void Append(Guid user, IEnumerable<JournalMessage> messages);
        void Append(Guid user, JournalMessage message);
    }
}
