namespace FitHappens.Domain.Journal.Abstractions
{
    public interface IJournalResetter
    {
        void Reset(Guid user);
    }
}
