using FitHappens.Domain.FitData;
using FitHappens.Domain.FitData.Models;
using FitHappens.Domain.Journal.Messages;
using FitHappens.Module.StateReplayer.Abstractions;

namespace FitHappens.Module.StateReplayer.Handlers
{
    public class CreateTagHandler : IMessageHandler
    {
        public string MsgType => "CreateTagMsg";

        public bool CanHandle(object message)
        {
            return message.GetType().Name == MsgType;
        }

        public FitState Do(FitState state, object entry)
        {
            var message = (entry as CreateTagMsg)!;

            var tag = new Tag { Id = message.Id, Name = message.Name };
            state.Tags.Add(tag);

            return state;
        }

        public FitState Undo(FitState state, object entry)
        {
            var message = (entry as CreateTagMsg)!;

            var tag = state.Tags.FirstOrDefault(t => t.Id == message.Id);
            if (tag == null)
                throw new InvalidOperationException(
                    $"Tag with ID {message.Id} not found in state."
                );

            state.Tags.Remove(tag);

            return state;
        }
    }
}
