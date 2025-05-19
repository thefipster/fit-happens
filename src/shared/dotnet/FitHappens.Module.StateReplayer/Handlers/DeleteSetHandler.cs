using FitHappens.Domain.FitData;
using FitHappens.Domain.Journal.Messages;
using FitHappens.Module.StateReplayer.Abstractions;

namespace FitHappens.Module.StateReplayer.Handlers
{
    public class DeleteSetHandler : IMessageHandler
    {
        public const string MsgType = "DeleteSetMsg";

        public bool CanHandle(object message)
        {
            return message.GetType().Name == MsgType;
        }

        public FitState Apply(FitState state, object entry)
        {
            var message = (entry as DeleteSetMsg)!;

            var set = state.Sets.FirstOrDefault(x => x.Id == message.SetId);
            if (set == null)
                throwMissingSetException();

            state.AllTimeForeverAndEverStatistics.TotalRepCount -= set!.Reps;
            state.Sets.Remove(set!);

            return state;
        }

        private static void throwMissingSetException()
        {
            throw new InvalidOperationException("Set is missing.");
        }
    }
}
