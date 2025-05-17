using FitHappens.Domain.Journal.Messages;
using FitHappens.Module.StateReplayer.Components;

namespace FitHappens.Module.StateReplayer.Unittest
{
    public class JournalTests
    {
        [Fact]
        public void CreateJournalTest()
        {
            // Arrange
            var createTagMsg = new CreateTagMsg()
            {
                Stamp = new MessageStamp
                {
                    Id = Guid.NewGuid().ToString(),
                    Timestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds(),
                },
                Id = Guid.NewGuid().ToString(),
                Name = "assisted",
            };

            var createExerciseMsg = new CreateExerciseMsg()
            {
                Stamp = new MessageStamp
                {
                    Id = Guid.NewGuid().ToString(),
                    Timestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds(),
                },
                Id = Guid.NewGuid().ToString(),
                Name = "Push-Up",
            };

            var createSetMsg = new CreateSetMsg()
            {
                Stamp = new MessageStamp
                {
                    Id = Guid.NewGuid().ToString(),
                    Timestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds(),
                },
                Id = Guid.NewGuid().ToString(),
                ExerciseId = createExerciseMsg.Id,
                Reps = 10,
            };

            createSetMsg.TagIds.Add(createTagMsg.Id);

            var collection = new object[] { createTagMsg, createExerciseMsg, createSetMsg };

            var runner = new JournalRunner();

            // Act
            var state = runner.ReplayJournal(collection);

            // Assert
            Assert.NotEmpty(state.Tags);
            Assert.NotEmpty(state.Exercises);
            Assert.NotEmpty(state.Sets);
        }
    }
}
