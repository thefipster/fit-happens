using System;
using FitHappens.Domain.Journal;
using FitHappens.Repository.Journal.Abstractions;
using FitHappens.Repository.Journal.Models;
using Microsoft.Extensions.Options;

namespace FitHappens.Repository.Journal.Components
{
    public class JournalStore : IJournalStore
    {
        private JournalConfig config;

        public JournalStore(IOptions<JournalConfig> config)
        {
            this.config = config.Value;

            if (!Directory.Exists(this.config.DataPath))
                Directory.CreateDirectory(this.config.DataPath);
        }

        public TheTruth Load()
        {
            throw new NotImplementedException();
        }

        public void Save(TheTruth journal)
        {
            throw new NotImplementedException();
        }
    }
}
