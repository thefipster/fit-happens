using FitHappens.Domain.Journal.Models;
using Microsoft.EntityFrameworkCore;

namespace FitHappens.Domain.Journal.Storage
{
    public class JournalDbContext : DbContext
    {
        public DbSet<JournalRecord> Messages { get; set; }

        public JournalDbContext(DbContextOptions<JournalDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<JournalRecord>(entity =>
            {
                entity.HasKey(x => x.JournalId);

                entity.Property(x => x.Timestamp);
                entity.HasIndex(x => x.Timestamp);

                entity.Property(x => x.Type).IsRequired();
                entity.HasIndex(x => x.Type);

                entity.Property(x => x.Payload).IsRequired();
            });
        }
    }
}
