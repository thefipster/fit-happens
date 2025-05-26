using FitHappens.Domain.FitData;
using FitHappens.Domain.FitData.Abstractions;
using FitHappens.Domain.FitData.Models;
using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.FitData.Handlers
{
    public class CreateBatchHandler : IMessageHandler
    {
        public const string MsgType = "CreateSetMsg";

        public bool CanHandle(object message)
        {
            return message.GetType().Name == MsgType;
        }

        public bool CanHandle(string type)
        {
            return type == MsgType;
        }

        public FitState Apply(FitState state, object entry)
        {
            var message = (entry as CreateBatchMsg)!;

            var exercise = ensureExercise(state, message);
            var tags = ensureTags(state, message);
            var set = new Batch
            {
                Id = message.BatchId,
                Exercise = exercise,
                Reps = message.Reps,
                Timestamp = message.Timestamp,
                Tags = tags,
            };

            state.Sets.Add(set);
            state.AllTimeForeverAndEverStatistics.TotalRepCount += message.Reps;

            return state;
        }

        private static Exercise ensureExercise(FitState state, CreateBatchMsg message)
        {
            try
            {
                return state.Exercises.First(x => x.Id == message.ExerciseId);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Exercise is missing.", ex);
            }
        }

        private static List<Tag> ensureTags(FitState state, CreateBatchMsg message)
        {
            try
            {
                return message.TagIds.Select(x => state.Tags.First(y => y.Id == x)).ToList();
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("At least one tag is missing.", ex);
            }
        }
    }
}
