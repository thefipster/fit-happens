using FitHappens.WebApi.Models;

namespace FitHappens.Domain.Journal.Abstractions
{
    public interface IJournalStore : IJournalReader, IJournalWriter, IJournalResetter { }
}
