using FitHappens.Domain.FitData;
using FitHappens.Domain.FitData.Models;
using FitHappens.Domain.Journal.Messages;
using FitHappens.Module.StateReplayer.Abstractions;

namespace FitHappens.Module.StateReplayer.Handlers
{
    public class CreateTagHandler : IMessageHandler
    {
        public const string MsgType = "CreateTagMsg";

        public bool CanHandle(object message)
        {
            return message.GetType().Name == MsgType;
        }

        public FitState Apply(FitState state, object entry)
        {
            var message = (entry as CreateTagMsg)!;

            var tag = new Tag { Id = message.TagId, Name = message.Name };
            state.Tags.Add(tag);

            return state;
        }
    }
}
