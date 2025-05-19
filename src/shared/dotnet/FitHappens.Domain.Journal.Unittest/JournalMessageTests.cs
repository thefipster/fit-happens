using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.Journal.Unittest
{
    public class JournalMessageTests
    {
        [Fact]
        public void JournalMessageSerializationTest()
        {
            JournalMessage msg = JournalBuilder.CreateTagMessage("assisted");
            var json = msg.ToJson();
            var newMsg = JournalMessage.FromJson(json);

            var tagMsg = msg as CreateTagMsg;
            var newTagMsg = newMsg as CreateTagMsg;

            Assert.NotNull(tagMsg);
            Assert.NotNull(newTagMsg);
            Assert.Equal(tagMsg.JournalId, newTagMsg.JournalId);
            Assert.Equal(tagMsg.Timestamp, newTagMsg.Timestamp);
            Assert.Equal(tagMsg.TagId, newTagMsg.TagId);
            Assert.Equal(tagMsg.Name, newTagMsg.Name);
        }
    }
}
