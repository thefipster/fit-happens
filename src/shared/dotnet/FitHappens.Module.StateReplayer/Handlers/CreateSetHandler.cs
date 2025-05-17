using FitHappens.Domain.FitData;
using FitHappens.Domain.FitData.Models;
using FitHappens.Domain.Journal.Messages;
using FitHappens.Module.StateReplayer.Abstractions;

namespace FitHappens.Module.StateReplayer.Handlers
{
    public class CreateSetHandler : IMessageHandler
    {
        public string MsgType => "CreateSetMsg";

        public bool CanHandle(object message)
        {
            return message.GetType().Name == MsgType;
        }

        public FitState Do(FitState state, object entry)
        {
            var message = (entry as CreateSetMsg)!;

            var exercise = ensureExercise(state, message);
            var tags = ensureTags(state, message);
            var set = new Set
            {
                Id = message.Id,
                Exercise = exercise,
                Reps = message.Reps,
                Timestamp = message.Timestamp,
                Tags = tags,
            };

            state.Sets.Add(set);

            return state;
        }

        public FitState Undo(FitState state, object entry)
        {
            var message = (entry as CreateSetMsg)!;

            var set = state.Sets.FirstOrDefault(s => s.Id == message.Id);
            if (set == null)
                throwMissingSetException(message);

            state.Sets.Remove(set);

            return state;
        }

        private static Exercise ensureExercise(FitState state, CreateSetMsg message)
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

        private static List<Tag> ensureTags(FitState state, CreateSetMsg message)
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

        private static void throwMissingSetException(CreateSetMsg? message)
        {
            throw new InvalidOperationException($"Set with ID {message.Id} not found in state.");
        }
    }
}
