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

        [Fact]
        public void GenerateSimpleJournal()
        {
            var tagMsg = JournalBuilder.CreateTagMessage("assisted");
            var exerciseMsg = JournalBuilder.CreateExerciseMessage(
                "Push-Ups",
                ExerciseTypes.Repeated
            );
            var setMsg = JournalBuilder.CreateBatchMessage(
                exerciseMsg.ExerciseId,
                10,
                [tagMsg.TagId]
            );

            var tagJson = tagMsg.ToJson();
            var exerciseJson = exerciseMsg.ToJson();
            var setJson = setMsg.ToJson();
        }
    }
}
