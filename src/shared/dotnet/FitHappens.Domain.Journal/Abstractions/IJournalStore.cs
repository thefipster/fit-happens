namespace FitHappens.Domain.Journal.Abstractions
{
    public interface IJournalStore
        : IJournalReader,
            IJournalWriter,
            IJournalResetter,
            IJournalUpdater { }
}
