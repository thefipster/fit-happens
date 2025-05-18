using FitHappens.Domain.Journal;

namespace FitHappens.Repository.Journal.Unittest
{
    public class TheTruthTests
    {
        [Fact]
        public void SerializationTest()
        {
            var truth = new TheTruth();

            var tag = JournalBuilder.CreateTagMessage("assisted");
            var exercise = JournalBuilder.CreateExerciseMessage("squat");
            var set = JournalBuilder.CreateSetMessage(
                ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds(),
                exercise.Id,
                10,
                [tag.Id]
            );

            truth.Append(tag);
            truth.Append(exercise);
            truth.Append(set);

            var json = truth.Serialize();
            var newTruth = TheTruth.Deserialize(json);
            var newJson = newTruth.Serialize();

            Assert.Equal(json, newJson);
            Assert.Equal(truth.GetMessages().Count(), newTruth.GetMessages().Count());
        }
    }
}
