using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.Journal.Abstractions
{
    public interface IJournalEmitter
    {
        void Append(JournalMessage message);
        void Append(IEnumerable<JournalMessage> messages);
    }
}
