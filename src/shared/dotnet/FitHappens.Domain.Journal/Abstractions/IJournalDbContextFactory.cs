using FitHappens.Domain.Journal.Storage;

namespace FitHappens.Domain.Journal.Abstractions
{
    public interface IJournalDbContextFactory
    {
        JournalDbContext CreateForUser(Guid userId);

        void DestroyForUser(Guid userId);
    }
}
