namespace FitHappens.Domain.Journal.Abstractions
{
    public interface IJournalSqliteResolver
    {
        string GetForUser(Guid user);
    }
}
