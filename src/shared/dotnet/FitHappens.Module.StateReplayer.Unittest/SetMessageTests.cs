using FitHappens.Domain.Journal;
using FitHappens.Module.StateReplayer.Components;

namespace FitHappens.Module.StateReplayer.Unittest
{
    public class SetMessageTests
    {
        [Fact]
        public void StatisticsGetUpdatedOnCreateTest()
        {
            // Arrange
            var reps = 10;

            var createTagMsg = JournalBuilder.CreateTagMessage("assisted");
            var createExerciseMsg = JournalBuilder.CreateExerciseMessage("Push-Up");
            var createSetMsg = JournalBuilder.CreateSetMessage(
                ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds(),
                createExerciseMsg.ExerciseId,
                reps,
                [createTagMsg.TagId]
            );

            var journal = new object[] { createTagMsg, createExerciseMsg, createSetMsg };
            var runner = new JournalRunner();

            // Assert
            var state = runner.ReplayJournal(journal);
            Assert.Equal(reps, state.AllTimeForeverAndEverStatistics.TotalRepCount);
        }

        [Fact]
        public void StatisticsGetUpdatedTwiceOnCreateTest()
        {
            // Arrange
            var reps = 10;

            var createExerciseMsg = JournalBuilder.CreateExerciseMessage("Push-Up");
            var createSetMsg = JournalBuilder.CreateSetMessage(
                ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds(),
                createExerciseMsg.ExerciseId,
                reps,
                []
            );

            var journal = new object[] { createExerciseMsg, createSetMsg, createSetMsg };
            var runner = new JournalRunner();

            // Assert
            var state = runner.ReplayJournal(journal);
            Assert.Equal(reps * 2, state.AllTimeForeverAndEverStatistics.TotalRepCount);
        }

        [Fact]
        public void StatisticsGetUpdatedOnDeleteTest()
        {
            // Arrange
            var reps = 10;

            var createExerciseMsg = JournalBuilder.CreateExerciseMessage("Push-Up");
            var createSetMsg = JournalBuilder.CreateSetMessage(
                ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds(),
                createExerciseMsg.ExerciseId,
                reps,
                []
            );
            var deleteSetMsg = JournalBuilder.DeleteSetMessage(createSetMsg.SetId);

            var initJournal = new object[] { createExerciseMsg, createSetMsg };
            var updateJournal = new object[] { deleteSetMsg };
            var runner = new JournalRunner();

            // Assert Initial State
            var state = runner.ReplayJournal(initJournal);
            Assert.Equal(reps, state.AllTimeForeverAndEverStatistics.TotalRepCount);

            // Assert Updated State
            state = runner.ReplayJournal(state, updateJournal);
            Assert.Equal(0, state.AllTimeForeverAndEverStatistics.TotalRepCount);
        }
    }
}
