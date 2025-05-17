using FitHappens.Domain.FitData;
using FitHappens.Domain.FitData.Models;
using FitHappens.Domain.Journal.Messages;
using FitHappens.Module.StateReplayer.Abstractions;

namespace FitHappens.Module.StateReplayer.Handlers
{
    public class CreateExerciseHandler : IMessageHandler
    {
        public string MsgType => "CreateExerciseMsg";

        public bool CanHandle(object message)
        {
            return message.GetType().Name == MsgType;
        }

        public FitState Do(FitState state, object entry)
        {
            var message = (entry as CreateExerciseMsg)!;

            var exercise = new Exercise { Id = message.Id, Name = message.Name };
            state.Exercises.Add(exercise);

            return state;
        }

        public FitState Undo(FitState state, object entry)
        {
            var message = (entry as CreateExerciseMsg)!;

            var exercise = state.Exercises.FirstOrDefault(e => e.Id == message.Id);
            if (exercise == null)
                throwExerciseNotFoundException(message);

            state.Exercises.Remove(exercise);

            return state;
        }

        private void throwExerciseNotFoundException(CreateExerciseMsg? message)
        {
            throw new InvalidOperationException(
                $"Exercise with ID {message.Id} not found in state."
            );
        }
    }
}
