using FitHappens.Domain.Journal.Messages;
using FitHappens.Domain.Journal.Util;

namespace FitHappens.Domain.Journal.Unittest
{
    public class JournalBuilderTests
    {
        [Fact]
        public void TestBaseContructorJournalIdGeneration()
        {
            var msg = JournalBuilder.CreateTagMessage("unlevel");

            Assert.True(msg.Timestamp > 0);
            Assert.NotEmpty(msg.JournalId);
        }
    }
}
