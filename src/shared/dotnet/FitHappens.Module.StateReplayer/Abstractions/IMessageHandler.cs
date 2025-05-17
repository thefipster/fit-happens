using FitHappens.Domain.FitData;

namespace FitHappens.Module.StateReplayer.Abstractions
{
    public interface IMessageHandler
    {
        string MsgType { get; }

        bool CanHandle(object message);

        FitState Do(FitState state, object message);

        FitState Undo(FitState state, object message);
    }
}
