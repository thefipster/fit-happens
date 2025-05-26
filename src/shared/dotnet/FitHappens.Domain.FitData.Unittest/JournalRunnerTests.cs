using FitHappens.Domain.FitData.Components;
using FitHappens.Domain.Journal.Components;
using FitHappens.Domain.Journal.Messages;
using FitHappens.Domain.Journal.Util;

namespace FitHappens.Domain.FitData.Unittest
{
    public class JournalRunnerTests
    {
        [Fact]
        public void CreateFitStateFromJournal()
        {
            // Arrange
            var createTagMsg = JournalBuilder.CreateTagMessage("assisted");
            var createExerciseMsg = JournalBuilder.CreateExerciseMessage(
                "Push-Up",
                ExerciseTypes.Repeated
            );
            var createSetMsg = JournalBuilder.CreateSetMessage(
                ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds(),
                createExerciseMsg.ExerciseId,
                10,
                [createTagMsg.TagId]
            );
            var deleteSetMsg = JournalBuilder.DeleteSetMessage(createSetMsg.SetId);

            var state = new FitState();
            var runner = new JournalRunner();
            var emitter = new JournalEmitter();
            emitter.Next += (sender, args) =>
            {
                runner.Next(state, args);
            };
            emitter.Append(createTagMsg);
            emitter.Append(createExerciseMsg);
            emitter.Append(createSetMsg);
            emitter.Append(deleteSetMsg);

            // Assert
            Assert.NotEmpty(state.Tags);
            Assert.NotEmpty(state.Exercises);
            Assert.Empty(state.Sets);
        }

        [Fact]
        public void UpdateJournalTest()
        {
            // Arrange
            var createTagMsg = JournalBuilder.CreateTagMessage("assisted");
            var createExerciseMsg = JournalBuilder.CreateExerciseMessage(
                "Push-Up",
                ExerciseTypes.Repeated
            );
            var createSetMsg = JournalBuilder.CreateSetMessage(
                ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds(),
                createExerciseMsg.ExerciseId,
                10,
                [createTagMsg.TagId]
            );
            var deleteSetMsg = JournalBuilder.DeleteSetMessage(createSetMsg.SetId);

            var initJournal = new object[] { createTagMsg, createExerciseMsg, createSetMsg };
            var updateJournal = new object[] { deleteSetMsg };

            var state = new FitState();
            var runner = new JournalRunner();
            var emitter = new JournalEmitter();
            emitter.Next += (sender, args) =>
            {
                state = runner.Next(state, args);
            };

            // Assert Initial State
            emitter.Append(createTagMsg);
            emitter.Append(createExerciseMsg);
            emitter.Append(createSetMsg);
            Assert.NotEmpty(state.Tags);
            Assert.NotEmpty(state.Exercises);
            Assert.NotEmpty(state.Sets);

            // Assert Updated State
            emitter.Append(deleteSetMsg);
            Assert.Empty(state.Sets);
        }
    }
}
