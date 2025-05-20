using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.Journal.Abstractions
{
    public interface IJournalStore
    {
        IEnumerable<JournalMessage> Load(string user);
        void Append(string user, IEnumerable<JournalMessage> messages);
        void Append(string user, JournalMessage message);
    }
}
