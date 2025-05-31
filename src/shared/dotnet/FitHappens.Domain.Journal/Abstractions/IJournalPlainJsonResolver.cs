namespace FitHappens.Domain.Journal.Abstractions
{
    public interface IJournalPlainJsonResolver
    {
        string GetUserPath(Guid user);
    }
}
