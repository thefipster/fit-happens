using FitHappens.Domain.FitData;

namespace FitHappens.Module.StateReplayer.Abstractions
{
    public interface IMessageHandler
    {
        bool CanHandle(object message);

        FitState Apply(FitState state, object message);
    }
}
