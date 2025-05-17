using FitHappens.Domain.FitData;
using FitHappens.Module.StateReplayer.Abstractions;
using FitHappens.Module.StateReplayer.Handlers;

namespace FitHappens.Module.StateReplayer.Components
{
    public class JournalRunner : IJournalRunner
    {
        private readonly IEnumerable<IMessageHandler> handlers;

        public JournalRunner()
        {
            handlers = new List<IMessageHandler>
            {
                new CreateExerciseHandler(),
                new CreateTagHandler(),
                new CreateSetHandler(),
            };
        }

        public FitState ReplayJournal(IEnumerable<object> journal)
        {
            var state = new FitState();

            foreach (var entry in journal)
            {
                var handler = ensureHandler(entry);

                state = handler.Do(state, entry);
            }

            return state;
        }

        private IMessageHandler ensureHandler(object entry)
        {
            try
            {
                return handlers.First(handler => handler.CanHandle(entry));
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(
                    $"No handler found for entry of type {entry.GetType().Name}",
                    ex
                );
            }
        }
    }
}
