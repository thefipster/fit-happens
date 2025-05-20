using FitHappens.Domain.FitData;

namespace FitHappens.Domain.FitData.Abstractions
{
    public interface IMessageHandler
    {
        bool CanHandle(object message);
        bool CanHandle(string type);

        FitState Apply(FitState state, object message);
    }
}
