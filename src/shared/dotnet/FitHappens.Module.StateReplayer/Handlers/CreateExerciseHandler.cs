using FitHappens.Domain.FitData;
using FitHappens.Domain.FitData.Models;
using FitHappens.Domain.Journal.Messages;
using FitHappens.Module.StateReplayer.Abstractions;

namespace FitHappens.Module.StateReplayer.Handlers
{
    public class CreateExerciseHandler : IMessageHandler
    {
        public const string MsgType = "CreateExerciseMsg";

        public bool CanHandle(object message)
        {
            return message.GetType().Name == MsgType;
        }

        public FitState Apply(FitState state, object entry)
        {
            var message = (entry as CreateExerciseMsg)!;

            var exercise = new Exercise { Id = message.Id, Name = message.Name };
            state.Exercises.Add(exercise);

            return state;
        }
    }
}
