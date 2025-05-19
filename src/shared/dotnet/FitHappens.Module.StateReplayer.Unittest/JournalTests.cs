using FitHappens.Domain.Journal;
using FitHappens.Module.StateReplayer.Components;

namespace FitHappens.Module.StateReplayer.Unittest
{
    public class JournalTests
    {
        [Fact]
        public void CreateJournalTest()
        {
            // Arrange
            var createTagMsg = JournalBuilder.CreateTagMessage("assisted");
            var createExerciseMsg = JournalBuilder.CreateExerciseMessage("Push-Up");
            var createSetMsg = JournalBuilder.CreateSetMessage(
                ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds(),
                createExerciseMsg.ExerciseId,
                10,
                [createTagMsg.TagId]
            );
            var deleteSetMsg = JournalBuilder.DeleteSetMessage(createSetMsg.SetId);

            var journal = new object[]
            {
                createTagMsg,
                createExerciseMsg,
                createSetMsg,
                deleteSetMsg,
            };

            var runner = new JournalRunner();

            // Assert
            var state = runner.ReplayJournal(journal);
            Assert.NotEmpty(state.Tags);
            Assert.NotEmpty(state.Exercises);
            Assert.Empty(state.Sets);
        }

        [Fact]
        public void UpdateJournalTest()
        {
            // Arrange
            var createTagMsg = JournalBuilder.CreateTagMessage("assisted");
            var createExerciseMsg = JournalBuilder.CreateExerciseMessage("Push-Up");
            var createSetMsg = JournalBuilder.CreateSetMessage(
                ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds(),
                createExerciseMsg.ExerciseId,
                10,
                [createTagMsg.TagId]
            );
            var deleteSetMsg = JournalBuilder.DeleteSetMessage(createSetMsg.SetId);

            var initJournal = new object[] { createTagMsg, createExerciseMsg, createSetMsg };
            var updateJournal = new object[] { deleteSetMsg };
            var runner = new JournalRunner();

            // Assert Initial State
            var state = runner.ReplayJournal(initJournal);
            Assert.NotEmpty(state.Tags);
            Assert.NotEmpty(state.Exercises);
            Assert.NotEmpty(state.Sets);

            // Assert Updated State
            state = runner.ReplayJournal(state, updateJournal);
            Assert.Empty(state.Sets);
        }
    }
}
