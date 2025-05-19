using Microsoft.Extensions.Configuration;

namespace FitHappens.Module.StateReplayer.Components
{
    public class JournalService
    {
        private string dataPath;

        public JournalService(IConfiguration config) { }
    }
}
