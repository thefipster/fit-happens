using FitHappens.Domain.Journal.Messages;
using FitHappens.WebApi.Models;

namespace FitHappens.Domain.Journal.Abstractions
{
    public interface IJournalReader
    {
        Task<IEnumerable<JournalMessage>> Load(Guid user);
        Task<IEnumerable<JournalMessage>> Load(Guid user, JournalQuery query);
        Task<string> LoadRaw(Guid user);
    }
}
