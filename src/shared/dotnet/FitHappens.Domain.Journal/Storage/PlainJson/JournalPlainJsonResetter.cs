using System.Text.Json;
using FitHappens.Domain.Journal.Abstractions;

namespace FitHappens.Domain.Journal.Storage.PlainJson
{
    public class JournalPlainJsonResetter : IJournalResetter
    {
        private readonly IJournalPlainJsonResolver resolver;
        private readonly JsonSerializerOptions jsonOptions;

        public JournalPlainJsonResetter(
            IJournalPlainJsonResolver resolver,
            JsonSerializerOptions jsonOptions
        )
        {
            this.resolver = resolver;
            this.jsonOptions = jsonOptions;
        }

        public void Reset(Guid user)
        {
            var userPath = resolver.GetUserPath(user);
            Directory.Delete(userPath, true);
        }
    }
}
