using FitHappens.Domain.FitData;
using FitHappens.Domain.FitData.Abstractions;
using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.FitData.Handlers
{
    public class DeleteBatchHandler : IMessageHandler
    {
        public const string MsgType = "DeleteSetMsg";

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
            var message = (entry as DeleteBatchMsg)!;

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
