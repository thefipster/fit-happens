using FitHappens.Domain.Journal.Abstractions;
using FitHappens.Domain.Journal.Components;
using FitHappens.Domain.Journal.Storage.PlainJson;
using FitHappens.Domain.Journal.Storage.SQLite;
using Microsoft.Extensions.DependencyInjection;

namespace FitHappens.Domain.Journal.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddJournalServices(this IServiceCollection services)
        {
            // VERY IMPORTANT: THERE SHOULD ONLY BE ONE READER!
            // If there is more than one reader it depends on the internals of the aspnet di container implementation which one is chosen.
            // My guess: 99% the latest one wins, 1% the first one wins. If it's any other my mind would be blown.
            // As you might have guesses this is untested territory...

            // SQLite Journal Storage
            services.AddScoped<IJournalDbContextFactory, JournalSqliteContextFactory>();
            services.AddScoped<IJournalSqliteResolver, JournalSqliteResolver>();
            services.AddScoped<IJournalReader, JournalSqliteReader>();
            services.AddScoped<IJournalWriter, JournalSqliteWriter>();
            services.AddScoped<IJournalResetter, JournalSqliteResetter>();

            // Plain JSON File Journal Storage
            services.AddScoped<IJournalPlainJsonResolver, JournalPlainJsonResolver>();
            //services.AddScoped<IJournalReader, JournalPlainJsonReader>();
            services.AddScoped<IJournalWriter, JournalPlainJsonWriter>();
            services.AddScoped<IJournalResetter, JournalPlainJsonResetter>();

            // Actual entry point for the journal storage
            services.AddScoped<IJournalStore, JournalStore>();

            return services;
        }
    }
}
